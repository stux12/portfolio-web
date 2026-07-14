"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const revealDuration = 5000;

export default function ProfileCard() {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (!isRevealed) return;

    const timer = window.setTimeout(() => setIsRevealed(false), revealDuration);
    return () => window.clearTimeout(timer);
  }, [isRevealed]);

  return (
    <aside className={`profile-card ${isRevealed ? "is-revealed" : ""}`} aria-label="프로필 사진 영역">
      <div className="profile-card-inner">
        <div className="profile-card-face profile-card-front">
          <div className="photo-placeholder profile-photo-frame">
            <Image className="profile-photo" src="/profile-jinhwan.png" alt="숲길을 걷는 김진환의 프로필 사진" width={896} height={1196} priority sizes="(max-width: 760px) 120px, 290px" />
            <button className="profile-gemini-trigger" type="button" aria-label="운동 취향 보기" onClick={() => setIsRevealed(true)} />
          </div>
          <div className="profile-meta">
            <strong>김진환</strong>
            <p>1997.09.17</p>
            <div className="profile-contact">
              <a href="mailto:stux12@naver.com">stux12@naver.com</a>
              <a href="tel:01028308290">010-2830-8290</a>
            </div>
          </div>
        </div>

        <div className="profile-card-face profile-card-back" aria-live="polite">
          <div className="profile-intro-copy">
            <span>HELLO!</span>
            <strong>안녕하세요,<br />김진환입니다.</strong>
            <p className="profile-intro-thanks">제 포트폴리오를 보러 와주셔서 감사합니다!</p>
            <div className="profile-intro-tags" aria-label="취미와 성향">
              <span>🏃 운동</span>
              <span>🎮 게임</span>
              <span>ISTJ</span>
            </div>
            <p>사람을 좋아하고 공감하려고 노력합니다.<br />처음 만나도 편안한 친구 같은 느낌이<br />제 장점이에요. : )</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
