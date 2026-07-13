import Image from "next/image";
import ProjectShowcase from "./components/project-showcase";
import SiteEngagement from "./components/site-engagement";
import TopLink from "./components/top-link";
import { skillGroups } from "./data/projects";

const serviceSkills = skillGroups
  .filter((group) => group.title !== "클라우드 · DevOps")
  .flatMap((group) => group.skills);
const infrastructureSkills = skillGroups.find((group) => group.title === "클라우드 · DevOps")?.skills ?? [];

const careers = [
  {
    period: "2024.10 ~ 2025.11",
    company: "(주) 법틀",
    logo: "/lawtle-logo.jpg",
    role: "SK 이노베이션 프로젝트 PL",
    tone: "lavender",
    description: "자체 법무 솔루션을 SK 이노베이션 환경에 맞게 도입하는 프로젝트를 리딩했습니다. 개발뿐 아니라 일정, 배포 환경, 보안 점검과 문서화까지 프로젝트 전반을 책임졌습니다.",
    highlights: [
      "고객사 환경에 맞춘 Kubernetes EKS 배포 구조 설계 및 구축",
      "Bitbucket 기반 CI/CD 파이프라인 구성으로 배포 흐름 표준화",
      "팀원 일정 설계·관리, PR 템플릿과 코드 리뷰 프로세스 운영",
      "보안 취약점 점검 대응 및 위험 사항 조치·문서화",
    ],
  },
  {
    period: "2021.05 ~ 2024.05",
    company: "(주) 윈큐브마케팅",
    logo: "/wincube-logo.png",
    role: "풀스택 개발 · 인프라 운영",
    tone: "mint",
    description: "B2B 서비스와 이벤트, 오픈마켓 연동을 개발하면서 AWS 전환과 운영 환경 개선까지 맡았습니다. 기능 출시부터 데이터, 트래픽, 비용까지 연결해 운영했습니다.",
    highlights: [
      "WINK B2B 배송지 입력, 컴포즈커피 프리퀀시·럭키박스, 지류쿠폰 교환 서비스 오픈",
      "네이버 스마트스토어·옥션·지마켓·원스토어·신한올댓 등 오픈마켓 연동",
      "KT Cloud·MSSQL에서 AWS·Aurora MySQL로 이관하고 데이터 마이그레이션 검증",
      "Auto Scaling, WAF, CloudWatch·SNS 알림으로 이벤트 트래픽과 해외 공격 대응",
      "예약 인스턴스와 DNS 구조 개선으로 클라우드 비용 약 20% 절감",
    ],
  },
];

export default function Home() {
  return (
    <main id="top">
      <nav
        className="site-nav"
        aria-label="주요 메뉴"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(251, 250, 247, 0.92)",
          backdropFilter: "blur(12px)",
        }}
      >
        <TopLink />
        <div className="nav-links">
          <a href="#projects">프로젝트</a>
          <a href="#career">커리어</a>
        </div>
      </nav>

      <section className="hero section-wrap">
        <div className="hero-content">
          <div className="hero-copy">
            <p className="hero-kicker">서비스의 모든 과정을 연결하는 개발자</p>
            <h1
              style={{
                fontSize: "clamp(42px, 10vw, 76px)",
                fontWeight: 500,
                letterSpacing: "-.075em",
                lineHeight: 1.1,
                margin: 0,
                wordBreak: "keep-all",
              }}
            >
              문제 해결에<br />
              진심인 <em style={{ color: "var(--blue)", fontStyle: "normal" }}>풀사이클</em><br />
              개발자입니다.
            </h1>
            <p className="hero-description">
              백엔드 개발을 중심으로 클라우드 전환, 데이터베이스, 배포 자동화,
              보안과 운영까지 서비스가 성장하는 모든 과정을 중요하게 생각합니다.
            </p>
            <a className="primary-link" href="#career">커리어 살펴보기 <span>→</span></a>
          </div>
          <aside className="profile-card" aria-label="프로필 사진 영역">
            <div className="photo-placeholder" role="img" aria-label="진환의 프로필 사진을 넣을 자리">
              <span>PHOTO</span>
              <strong>진환</strong>
              <small>프로필 사진을<br />추가해 주세요</small>
            </div>
            <div className="profile-meta">
              <strong>김진환</strong>
              <p>1997.09.17</p>
              <div className="profile-contact">
                <a href="mailto:stux12@naver.com">stux12@naver.com</a>
                <a href="tel:01028308290">010-2830-8290</a>
              </div>
            </div>
          </aside>
        </div>

        <div className="hero-grid" aria-label="핵심 경력 및 기술">
          <div className="hero-career-card" style={{ backgroundColor: "var(--lavender)", borderColor: "var(--lavender)" }}>
            <span className="hero-card-label">총 경력</span>
            <strong>4년 2개월</strong>
            <ol className="career-list">
              <li>
                <header className="career-heading"><time>2024.10 ~ 2025.11</time><b>(주) 법틀</b></header>
                <p>법무 시스템 고객사 도입 프로젝트 PL</p>
              </li>
              <li>
                <header className="career-heading"><time>2021.05 ~ 2024.05</time><b>(주) 윈큐브마케팅</b></header>
                <p>B2B·이벤트·오픈마켓 연동 및 AWS 인프라 운영</p>
              </li>
            </ol>
          </div>
          <div className="hero-tech-card">
            <span className="hero-card-label">기술 스택</span>
            <strong>서비스 개발</strong>
            <div className="hero-stack-list">{serviceSkills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          </div>
          <div className="hero-tech-card">
            <span className="hero-card-label">기술 스택</span>
            <strong>인프라 · 운영</strong>
            <div className="hero-stack-list">{infrastructureSkills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="section-wrap project-placeholder-section" id="projects">
        <div className="project-section-heading">
          <div className="section-label">01 / 프로젝트</div>
          <div className="project-section-intro">
            <span>카드에 마우스를 올리면 기술 스택을, README.md를 누르면 상세 기록 영역을 확인할 수 있습니다.</span>
          </div>
        </div>
        <ProjectShowcase />
      </section>

      <section className="section-wrap career-section" id="career">
        <div className="career-section-heading">
          <div className="section-label">02 / 커리어</div>
        </div>
        <div className="career-timeline">
          {careers.map((career) => (
            <article className={`career-entry career-entry-${career.tone}`} key={career.company}>
              <div className="career-entry-heading">
                <p>{career.period}</p>
                <h3>
                  <Image className="company-logo" src={career.logo} alt={`${career.company} 로고`} width={36} height={36} />
                  {career.company}
                </h3>
                <span>{career.role}</span>
              </div>
              <div className="career-entry-content">
                <p className="career-entry-description">{career.description}</p>
                <ul>
                  {career.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer section-wrap">
        <small>© 2026. Kim JinHwan Portfolio. All rights reserved.</small>
      </footer>
      <SiteEngagement />
    </main>
  );
}
