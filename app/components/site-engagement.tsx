"use client";

import { useEffect, useState } from "react";

type EngagementStats = {
  configured: boolean;
  today: number;
  total: number;
  likes: number;
  liked: boolean;
};

const formatter = new Intl.NumberFormat("ko-KR");

export default function SiteEngagement() {
  const [stats, setStats] = useState<EngagementStats | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const request = async (action: "visit" | "like") => {
    const response = await fetch("/api/engagement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Engagement request failed");
    return (await response.json()) as EngagementStats;
  };

  useEffect(() => {
    request("visit").then(setStats).catch(() => setStats(null));
  }, []);

  const handleLike = async () => {
    if (!stats || stats.liked || isSubmitting) return;

    setIsSubmitting(true);
    try {
      setStats(await request("like"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!stats?.configured) return null;

  return (
    <>
      <aside className="engagement-stats" aria-label="방문 기록">
        <span>방문 기록</span>
        <strong><em>오늘</em>{formatter.format(stats.today)}</strong>
        <strong><em>누적</em>{formatter.format(stats.total)}</strong>
      </aside>
      <button
        className={`like-orb ${stats.liked ? "is-liked" : ""}`}
        type="button"
        aria-label={stats.liked ? "이미 좋아요를 눌렀습니다" : "포트폴리오에 좋아요 누르기"}
        aria-pressed={stats.liked}
        disabled={stats.liked || isSubmitting}
        onClick={handleLike}
      >
        <span aria-hidden="true">👍</span>
        <b>{formatter.format(stats.likes)}</b>
      </button>
    </>
  );
}
