import { createHmac } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type EngagementAction = "visit" | "like";
type EngagementStats = { today: number; total: number; likes: number; liked: boolean };
type DevelopmentEngagementStore = { visitors: Set<string>; likes: Set<string> };

const responseHeaders = { "Cache-Control": "no-store" };

const developmentStore = (() => {
  const runtime = globalThis as typeof globalThis & {
    __portfolioDevelopmentEngagement?: DevelopmentEngagementStore;
  };

  runtime.__portfolioDevelopmentEngagement ??= {
    visitors: new Set<string>(),
    likes: new Set<string>(),
  };

  return runtime.__portfolioDevelopmentEngagement;
})();

function environment() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const salt = process.env.ENGAGEMENT_IP_SALT;

  return url && key && salt ? { url, key, salt } : null;
}

function visitorHash(request: NextRequest, salt: string) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "local-development";

  return createHmac("sha256", salt).update(ip).digest("hex");
}

function isAllowedOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");

  return !origin || new URL(origin).host === request.nextUrl.host;
}

async function invokeRpc(
  config: NonNullable<ReturnType<typeof environment>>,
  functionName: "record_portfolio_visit" | "record_portfolio_like",
  hash: string,
) {
  const response = await fetch(`${config.url}/rest/v1/rpc/${functionName}`, {
    method: "POST",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_visitor_hash: hash }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Supabase RPC failed: ${response.status}`);

  const rows = (await response.json()) as EngagementStats[];
  return rows[0];
}

function developmentStats(request: NextRequest, action: EngagementAction): EngagementStats {
  const hash = visitorHash(request, "local-development");

  developmentStore.visitors.add(hash);
  if (action === "like") developmentStore.likes.add(hash);

  return {
    today: developmentStore.visitors.size,
    total: developmentStore.visitors.size,
    likes: developmentStore.likes.size,
    liked: developmentStore.likes.has(hash),
  };
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ message: "허용되지 않은 요청입니다." }, { status: 403, headers: responseHeaders });
  }

  try {
    const body = (await request.json()) as { action?: EngagementAction };
    if (body.action !== "visit" && body.action !== "like") {
      return NextResponse.json({ message: "알 수 없는 요청입니다." }, { status: 400, headers: responseHeaders });
    }

    const config = environment();
    if (!config) {
      if (process.env.NODE_ENV !== "development") {
        return NextResponse.json({ configured: false }, { headers: responseHeaders });
      }

      return NextResponse.json(
        { configured: true, ...developmentStats(request, body.action) },
        { headers: responseHeaders },
      );
    }

    const stats = await invokeRpc(
      config,
      body.action === "visit" ? "record_portfolio_visit" : "record_portfolio_like",
      visitorHash(request, config.salt),
    );

    return NextResponse.json({ configured: true, ...stats }, { headers: responseHeaders });
  } catch {
    return NextResponse.json({ message: "방문 기록을 불러오지 못했습니다." }, { status: 503, headers: responseHeaders });
  }
}
