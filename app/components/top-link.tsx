"use client";

import type { MouseEvent } from "react";
import Image from "next/image";

export default function TopLink() {
  const moveToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <a className="wordmark" href="#top" aria-label="페이지 최상단으로 이동" onClick={moveToTop}>
      <Image src="/og-jh.png" alt="" width={30} height={30} />
      <span>진환&apos;s 포트폴리오</span>
    </a>
  );
}
