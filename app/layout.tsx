import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jinhwan-portfolio.vercel.app"),
  title: {
    default: "진환's 포트폴리오 | 풀사이클 개발자 김진환",
    template: "%s | 진환's 포트폴리오",
  },
  description:
    "백엔드 개발을 중심으로 클라우드 전환, 인프라, DevOps와 서비스 운영까지 연결하는 풀사이클 개발자 김진환의 포트폴리오입니다.",
  keywords: [
    "김진환",
    "풀사이클 개발자",
    "백엔드 개발자",
    "Spring Boot",
    "AWS",
    "DevOps",
    "Kubernetes",
  ],
  authors: [{ name: "김진환", url: "https://jinhwan-portfolio.vercel.app" }],
  creator: "김진환",
  publisher: "김진환",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "진환's 포트폴리오",
    title: "진환's 포트폴리오 | 풀사이클 개발자 김진환",
    description:
      "백엔드, 클라우드 전환, 인프라, DevOps와 서비스 운영까지 연결하는 풀사이클 개발자 포트폴리오입니다.",
    images: [
      {
        url: "/og-jh-v2.png",
        width: 1730,
        height: 909,
        alt: "진환's 포트폴리오 JH 대표 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "진환's 포트폴리오 | 풀사이클 개발자 김진환",
    description:
      "백엔드, 클라우드 전환, 인프라, DevOps와 서비스 운영까지 연결하는 풀사이클 개발자 포트폴리오입니다.",
    images: ["/og-jh-v2.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
