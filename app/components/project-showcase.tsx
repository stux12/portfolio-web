"use client";

import { useEffect, useRef, useState } from "react";

type ReadmeDocument = {
  overview: string;
  siteUrl?: string;
  features: string[];
  architecture: {
    description: string;
    choices: { category: string; name: string; reason: string }[];
    diagram?: { client: string; api: string; dependencies: string[] };
    deployment: string;
  };
  implementation: {
    overview: string;
    steps: { label: string; title: string; description: string }[];
    principles: string[];
  };
};

type ProjectTemplate = {
  id: string;
  title: string;
  category: string;
  summary: string;
  stack: string[];
  tone: "lavender" | "mint" | "peach";
  readme?: ReadmeDocument;
  note?: string;
};

const defaultReadme: ReadmeDocument = {
  overview: "해결하려는 문제와 대상 사용자, 서비스의 핵심 가치를 정리합니다.",
  features: ["핵심 기능", "사용자 흐름", "기술 선택", "운영 기준"],
  architecture: {
    description: "아키텍처, 데이터 모델, 기술을 선택한 이유를 구체적으로 기록합니다.",
    choices: [
      { category: "페이지 구조", name: "프레임워크", reason: "서비스 성격에 맞는 렌더링 전략과 라우팅 방식을 기록합니다." },
      { category: "상태와 데이터", name: "컴포넌트 책임", reason: "데이터 흐름과 컴포넌트 책임을 분리한 이유를 정리합니다." },
      { category: "디자인 규칙", name: "디자인 시스템", reason: "반복되는 색상과 컴포넌트 규칙을 어떻게 관리하는지 설명합니다." },
    ],
    deployment: "GitHub 저장소 연결과 Vercel 배포, 자동화 흐름을 추가로 기록합니다.",
  },
  implementation: {
    overview: "프로젝트를 기획하고 설계한 뒤, 구현·검증·개선한 과정을 순서대로 기록합니다.",
    steps: [
      { label: "01", title: "문제와 목표 정리", description: "만들려는 서비스의 문제, 대상 사용자와 완료 기준을 먼저 정리합니다." },
      { label: "02", title: "구조와 화면 설계", description: "정보 구조, 데이터 모델, 컴포넌트 책임과 화면 흐름을 설계합니다." },
      { label: "03", title: "작은 단위 구현", description: "기능을 작은 단위로 구현하고 화면과 동작을 반복적으로 확인합니다." },
      { label: "04", title: "검증과 개선", description: "반응형, 접근성, 배포 흐름을 점검하고 개선 사항을 기록합니다." },
    ],
    principles: ["AI의 제안은 초안으로만 사용하고, 최종 요구사항과 검증 책임은 개발자가 갖습니다."],
  },
};

const projectTemplates: ProjectTemplate[] = [
  {
    id: "service",
    title: "진환's 포트폴리오",
    category: "개인 프로젝트 01",
    summary: "경력과 기술 스택, 프로젝트 기록을 한곳에서 보여주고 개발 과정과 판단을 더 자세히 설명하기 위해 만든 개인 포트폴리오 사이트입니다.",
    stack: ["Next.js", "React", "TypeScript", "CSS", "Node.js", "Vercel Functions", "Supabase", "PostgreSQL", "Git", "GitHub", "Vercel", "Web App Manifest", "OpenAI Codex"],
    tone: "lavender",
    readme: {
      overview: "경력과 기술 스택, 프로젝트 기록을 한곳에서 보여주고 개발 과정과 판단을 더 자세히 설명하기 위해 만든 개인 포트폴리오 사이트입니다.",
      features: ["경력과 기술 스택을 한눈에 보여주는 첫 화면", "프로젝트 카드를 통한 기술 스택과 상세 기록 탐색", "README 모달로 제공하는 기술적 맥락", "모바일 환경까지 고려한 반응형 화면", "오늘·누적 방문 기록과 IP 해시 기반의 1회 좋아요", "대표 도메인·검색·공유 정보를 갖춘 공개 배포 환경"],
      architecture: {
        description: "정적 콘텐츠, 사용자 상호작용, 운영 데이터를 분리하고, 프로젝트 데이터만 추가하면 같은 화면 구조를 재사용할 수 있도록 설계했습니다.",
        choices: [
          { category: "페이지 구조", name: "Next.js · App Router", reason: "정적 콘텐츠 중심의 포트폴리오에 적합하고, 페이지 구조와 메타데이터를 일관되게 관리할 수 있어 선택했습니다." },
          { category: "상호작용", name: "React · Client Component", reason: "카드 뒤집기, README 모달, 최상단 이동처럼 사용자 입력이 필요한 영역에만 상태와 이벤트를 적용했습니다." },
          { category: "데이터 확장성", name: "TypeScript · Data-driven UI", reason: "프로젝트 제목·기술 스택·README를 타입과 데이터로 관리해, 새 프로젝트를 화면 복제 없이 추가할 수 있게 구성했습니다." },
          { category: "디자인 규칙", name: "CSS Token · Component Composition", reason: "색상 변수를 기준으로 화면 톤을 통일하고, 페이지·쇼케이스·최상단 이동 기능을 역할별 컴포넌트로 분리했습니다." },
          { category: "운영 데이터", name: "Vercel Functions · Supabase", reason: "방문과 좋아요 요청은 Next.js Route Handler에서 처리하고, IP 원문 대신 서버에서 생성한 HMAC 해시만 Supabase PostgreSQL에 전달합니다. 날짜별 방문 기록과 좋아요를 분리해 오늘·누적 지표와 동일 IP의 중복 좋아요를 관리합니다." },
        ],
        deployment: "GitHub 저장소로 코드 이력을 관리하고 Vercel Hobby 플랜의 jinhwan-portfolio.vercel.app 도메인에 프로덕션 배포했습니다. Vercel의 Next.js 빌드 환경과 Functions를 활용해 별도 서버를 운영하지 않고도 화면과 방문·좋아요 API를 함께 제공하며, 배포 뒤에는 운영 URL의 응답과 주요 화면을 확인하는 흐름으로 관리합니다.",
      },
      implementation: {
        overview: "AI Codex를 단순 코드 생성 도구가 아니라, 요구사항을 구조화하고 작은 변경을 빠르게 검증하는 개발 파트너로 활용했습니다. 방향과 완료 기준은 제가 결정하고, 구현 결과는 화면·린트·프로덕션 빌드로 확인하는 방식으로 진행했습니다.",
        steps: [
          { label: "01", title: "기획과 정보 구조", description: "경력기술서와 자기소개서에서 풀사이클 개발자라는 핵심 메시지, 회사별 성과, 기술 스택을 추렸습니다. 이후 첫 화면·프로젝트·커리어 순서로 면접관이 빠르게 맥락을 파악할 수 있는 정보 구조를 정했습니다." },
          { label: "02", title: "디자인 원칙을 먼저 합의", description: "lavender·mint·peach·blue 색상 토큰과 둥근 카드라는 공통 규칙을 먼저 정했습니다. 화면마다 새 디자인을 즉흥적으로 추가하는 대신, 같은 색상·여백·카드 패턴을 재사용해 일관성을 유지했습니다." },
          { label: "03", title: "데이터 중심으로 구현", description: "프로젝트 카드와 README 내용을 타입이 있는 데이터로 분리하고, 컴포넌트는 데이터를 렌더링하는 역할에 집중시켰습니다. 다음 개인 프로젝트를 추가할 때 화면을 복제하지 않고 데이터만 추가할 수 있도록 구성했습니다." },
          { label: "04", title: "입력 방식과 반응형 문제 해결", description: "데스크톱의 hover 카드가 모바일 터치 환경에서는 동작하지 않는 문제를 확인했습니다. 선택 상태와 ‘기술 스택 보기’ 버튼을 별도로 두어, 입력 방식이 달라도 같은 정보에 접근할 수 있게 보완했습니다." },
          { label: "05", title: "검증 가능한 바이브 코딩", description: "요청 단위로 변경 범위를 제한하고, 매 변경 후 린트·프로덕션 빌드·브라우저 동작을 확인했습니다. 모달의 배경 스크롤, 헤더 고정, Contents 활성화처럼 화면에서만 드러나는 문제도 실제 상태를 확인한 뒤 수정했습니다." },
          { label: "06", title: "공개 배포와 운영 지표 추가", description: "대표 도메인과 검색·공유 메타데이터를 적용한 뒤, Vercel Functions와 Supabase를 연결해 오늘·누적 방문 기록과 좋아요를 구현했습니다. IP 원문을 저장하지 않고 해시로만 중복을 판별하며, 배포 완료 후에는 실제 도메인의 응답과 화면을 다시 확인해 로컬 결과와 공개 환경의 차이를 줄였습니다." },
        ],
        principles: [
          "프롬프트는 구현 지시가 아니라 요구사항·제약 조건·완료 기준을 전달하는 문서로 작성했습니다.",
          "AI가 만든 결과라도 사용자 경험, 사실성, 반응형 동작과 빌드 성공 여부는 직접 확인한 뒤 반영했습니다.",
          "관련 없는 영역을 함께 바꾸지 않고, 변경 범위를 작게 유지해 회귀 가능성을 낮추는 것을 원칙으로 삼았습니다.",
          "운영 데이터는 필요한 최소 정보만 저장하고, IP 원문 대신 서버 측 HMAC 해시를 사용해 방문·좋아요 중복만 판별하도록 구성했습니다.",
          "반복되는 프로젝트 등록·모바일 검증·배포 절차는 SKILL과 AGENTS 문서로 남겨, 다음 수정에서도 같은 구조와 검증 기준을 재사용하도록 했습니다.",
        ],
      },
    },
    note: "해당 프로젝트는 AI Codex를 통해 개발된 프로젝트 입니다.",
  },
  {
    id: "infrastructure",
    title: "감정 일기장",
    category: "개인 프로젝트 02",
    summary: "오늘의 감정에, AI와 너의 답장이 오는 커플 감정 일기 서비스입니다. 기록·댓글·통계로 두 사람의 마음을 함께 돌아봅니다.",
    stack: ["React", "TypeScript", "Vite", "PWA", "Java 21", "Spring Boot", "JPA", "PostgreSQL", "Supabase", "Docker", "Render", "Vercel", "Claude API", "FCM"],
    tone: "mint",
    readme: {
      overview: "감정을 글로 남기고 싶지만 혼자서는 이어가기 힘든 커플을 위한 AI 감정 일기입니다. 하루를 기록하면 선택한 페르소나의 AI가 감정을 읽고 답해주며, 서로의 일기에 댓글로 반응해 기록이 대화로 이어집니다. 월간 감정 통계와 두 사람의 감정 동기화로 마음의 흐름을 함께 돌아볼 수 있습니다.",
      siteUrl: "https://today-my-diary.vercel.app/login",
      features: ["AI 감정 일기: 선택한 페르소나에 맞춰 감정 분석과 답변을 생성하고, 다른 컨셉으로 재생성할 수 있습니다.", "커플 연결과 소통: 초대 코드로 연결한 두 사람만 서로의 일기를 캘린더에서 열람하고 댓글을 남길 수 있습니다.", "감정 통계와 동기화: 월간 감정 분포·추이·평균과 일별 감정 점수 상관도 기반의 동기화율을 제공합니다.", "검색과 기록 확장: 키워드·감정·기간 검색, 버킷리스트, 이미지 첨부, 리마인더를 지원합니다.", "운영 제어: 관리자 RBAC, AI 호출·토큰 집계, 일일 한도 제어를 제공합니다.", "게스트 데모: 게스트 체험은 브라우저 세션 목 데이터로 동작하며, 실제 서비스 데이터베이스에 영향을 주지 않습니다."],
      architecture: {
        description: "도메인별 수직 분리의 모듈형 모놀리스로 구성하고, AI·스토리지·푸시처럼 교체나 장애 가능성이 있는 외부 연동은 포트&어댑터로 격리했습니다. 일기 작성과 통계의 AI 요약은 비동기 처리해 사용자 요청을 외부 API 지연으로 막지 않습니다.",
        choices: [
          { category: "AI 이중화", name: "전략 패턴 · 포트&어댑터", reason: "AiProvider 추상화 뒤에 Claude와 OpenAI를 두고, Claude 장애·한도·요금 변화 시 OpenAI로 자동 폴백합니다. 실제 응답 Provider도 기록해 관측 가능하게 했습니다." },
          { category: "비동기 처리", name: "@Async · 도메인 이벤트", reason: "약 15초가 걸릴 수 있는 AI 분석과 통계 요약을 백그라운드로 분리해 일기 작성은 즉시 응답합니다. 대신 분석 중 상태와 폴링 UI, 요약 실패 방어 로직을 함께 설계했습니다." },
          { category: "사용량 제어", name: "@Primary 데코레이터", reason: "기존 AI 서비스 변경 없이 호출 수·토큰을 계측하고, DB 동적 설정 기반 일일 한도 초과 시 429를 반환합니다." },
          { category: "데이터 접근", name: "커서 페이지네이션 · 검색 추상화", reason: "타임라인은 오프셋 페이징의 성능·일관성 문제를 피하기 위해 커서 기반으로 구현했고, 운영 PostgreSQL 전문검색과 로컬 H2 LIKE를 인터페이스로 분리했습니다." },
          { category: "인증과 권한", name: "JWT · OAuth2 · RBAC", reason: "Google OAuth2 로그인 뒤 Access 30분·Refresh 14일 로테이션을 적용하고, @PreAuthorize 기반 관리자 권한을 분리했습니다." },
        ],
        diagram: { client: "사용자 · React PWA · Vercel", api: "Spring Boot API · Render Docker", dependencies: ["PostgreSQL · Supabase", "Supabase Storage · S3", "Claude API → OpenAI 폴백", "FCM 웹 푸시"] },
        deployment: "프론트엔드는 Vercel, 백엔드는 멀티스테이지 Dockerfile 기반 Render, 데이터베이스와 스토리지는 Supabase로 운영합니다. 시크릿은 코드가 아닌 배포 플랫폼 환경변수로 관리하며, JWT·CORS 출처 제한·@PreAuthorize RBAC·AI 일일 한도·헬스체크로 운영 환경을 보호합니다.",
      },
      implementation: {
        overview: "‘혼자 쓰는 일기는 반응이 없어 지속하기 어렵다’는 문제에서 시작해 AI 답변과 커플 상호작용으로 기록에 반응을 보장하는 서비스로 설계했습니다. 도메인별 기능을 완결 단위로 구현하고, 실제 운영 환경에서 발생한 데이터베이스·배포·PWA 캐시 문제까지 재현하며 해결했습니다.",
        steps: [
          { label: "01", title: "문제 정의", description: "기록에 반응이 없어 지속하기 어려운 커플의 문제를 정의하고, AI 답변과 상대 댓글이라는 두 겹의 피드백을 핵심 가치로 설정했습니다." },
          { label: "02", title: "도메인과 경계 설계", description: "사용자·커플·일기·댓글·통계를 수직 분리하고, AI·스토리지·푸시는 포트&어댑터로 격리했습니다." },
          { label: "03", title: "핵심 흐름 구현", description: "인증·커플 연결부터 일기와 AI, 댓글·캘린더, 통계·동기화, 검색·이미지·알림·관리자 기능 순으로 완성했습니다." },
          { label: "04", title: "외부 지연 분리", description: "AI 응답이 요청을 막지 않도록 @Async와 이벤트로 분리하고, 전략·폴백과 데코레이터 계측을 적용했습니다." },
          { label: "05", title: "운영 장애 재현", description: "운영 PostgreSQL에서 삭제·통계만 500이 나는 문제를 직접 재현해 @Lob String의 oid 매핑을 text 마이그레이션으로 변경했습니다." },
          { label: "06", title: "검증과 배포", description: "JUnit5·MockMvc 기반 약 100개의 테스트를 작성하고, Render·Vercel·Supabase의 콜드스타트·CORS·환경변수·PWA 캐시 이슈를 확인했습니다." },
          { label: "07", title: "다음 개선", description: "Flyway 스키마 형상관리, GitHub Actions CI 정비, 콜드스타트 대응, 게스트 데모의 실 AI 연동 옵션을 계획하고 있습니다." },
        ],
        principles: ["외부 의존은 경계 뒤로 숨겨 교체·장애·이중화가 비즈니스 코드 변경 없이 가능하도록 설계했습니다.", "느린 외부 AI 호출은 사용자 요청과 분리하되, 분석 중 상태와 실패 방어까지 함께 설계했습니다.", "로컬에서 통과한 코드도 운영 PostgreSQL과 커넥션 환경에서 직접 재현해 검증했습니다.", "통계의 AI 요약이 실패해도 숫자 결과는 반드시 응답하도록 부가 기능 장애가 핵심 기능을 끌어내리지 않게 했습니다.", "커밋 메타데이터와 서비스 워커 캐시까지 배포의 일부로 보고 원인을 확인했습니다."],
      },
    },
    note: "해당 프로젝트는 Claude Code를 통해 개발된 프로젝트 입니다.",
  },
  {
    id: "devpet",
    title: "DevPet",
    category: "개인 프로젝트 03",
    summary: "현재 프로젝트 정리 중입니다.",
    stack: ["Research", "Prototype", "Docs"],
    tone: "lavender",
  },
  {
    id: "experiment",
    title: "공부 자동 정리",
    category: "개인 프로젝트 04",
    summary: "현재 프로젝트 정리 중입니다.",
    stack: ["Research", "Prototype", "Docs"],
    tone: "peach",
  },
];

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<ProjectTemplate | null>(null);
  const [flippedProject, setFlippedProject] = useState<string | null>(null);
  const [isCompact, setIsCompact] = useState(false);
  const [activeSection, setActiveSection] = useState("readme-overview");
  const contentScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateViewport = () => setIsCompact(window.innerWidth <= 760);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [selectedProject]);

  const handleContentScroll = () => {
    const container = contentScrollRef.current;
    if (!container) return;

    const sectionIds = ["readme-overview", "readme-features", "readme-architecture", "readme-implementation"];
    const containerTop = container.getBoundingClientRect().top;
    const current = sectionIds.reduce((active, id) => {
      const section = container.querySelector<HTMLElement>(`#${id}`);
      return section && section.getBoundingClientRect().top - containerTop <= 72 ? id : active;
    }, sectionIds[0]);

    setActiveSection(current);
  };

  const moveToSection = (id: string) => {
    const container = contentScrollRef.current;
    const section = container?.querySelector<HTMLElement>(`#${id}`);
    setActiveSection(id);
    if (container && section) {
      const top = section.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
      container.scrollTo({ top, behavior: "smooth" });
    }
  };

  const openReadme = (project: ProjectTemplate) => {
    setActiveSection("readme-overview");
    setSelectedProject(project);
  };

  return (
    <>
      <div className="project-template-list">
        {projectTemplates.map((project) => {
          const isFlipped = flippedProject === project.id;

          return (
            <article className={`project-template-card ${project.tone} ${project.id === "service" ? "portfolio-card" : ""} ${isFlipped ? "is-flipped" : ""}`} key={project.id}>
              <div className="project-template-inner">
                <div className="project-template-face project-template-front">
                  <p>{project.category}</p>
                  <h3>{project.title}</h3>
                  <span>{project.summary}</span>
                  <button
                    className="project-flip-button"
                    type="button"
                    aria-expanded={isFlipped}
                    onClick={() => setFlippedProject(isFlipped ? null : project.id)}
                  >
                    기술 스택 보기
                  </button>
                  <i aria-hidden="true">↗</i>
                </div>
                <div className="project-template-face project-template-back">
                  <p>기술 스택</p>
                  <h3>{project.title}</h3>
                  <div className="project-template-stack">
                    {project.stack.map((skill) => <span key={skill}>{skill}</span>)}
                  </div>
                  <button className="readme-button" type="button" onClick={() => openReadme(project)}>
                    README.md <b>→</b>
                  </button>
                  <button className="project-back-button" type="button" onClick={() => setFlippedProject(null)}>
                    앞면으로 돌아가기
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {selectedProject && (
        <div
          className="project-readme-modal"
          role="presentation"
          style={{ position: "fixed", top: 0, right: 0, bottom: 0, left: 0, zIndex: 100, padding: "20px 28px" }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProject(null);
          }}
        >
          <section className="project-readme" role="dialog" aria-modal="true" aria-labelledby="project-readme-title" style={{ display: "flex", flexDirection: "column", maxHeight: "calc(100vh - 40px)", overflow: "hidden" }}>
            <div className="project-readme-heading" style={{ position: "relative", flex: "0 0 auto" }}>
              <p>README.md / {selectedProject.category}</p>
              <h3 id="project-readme-title">{selectedProject.title}</h3>
              <button type="button" autoFocus aria-label="README 영역 닫기" onClick={() => setSelectedProject(null)}>×</button>
            </div>
            <div className="project-readme-scroll" style={{ minHeight: 0, display: isCompact ? "block" : "grid", gridTemplateColumns: isCompact ? undefined : "186px minmax(0, 1fr)", gap: isCompact ? undefined : 25, padding: isCompact ? "20px" : "28px 34px 34px", overflowY: isCompact ? "auto" : "hidden", overscrollBehavior: "contain" }}>
              <nav className="project-readme-toc" aria-label="README 목차" style={isCompact ? undefined : { alignSelf: "start", height: "max-content" }}>
                {["readme-overview", "readme-features", "readme-architecture", "readme-implementation"].map((id, index) => {
                  const labels = ["프로젝트 개요", "핵심 기능", "구조와 기술 선택", "프로젝트 개발 처음부터 끝"];
                  const isActive = activeSection === id;
                  return <a key={id} href={`#${id}`} className={isActive ? "is-active" : undefined} style={isActive ? { background: "#fff", color: "var(--blue-dark)", boxShadow: "0 3px 8px rgba(64, 71, 99, .08)" } : undefined} onClick={(event) => { event.preventDefault(); moveToSection(id); }}>{String(index + 1).padStart(2, "0")}. {labels[index]}</a>;
                })}
              </nav>
              <div className="project-readme-content-scroll" ref={contentScrollRef} onScroll={handleContentScroll} style={{ minHeight: 0, overflowY: isCompact ? "visible" : "auto", overscrollBehavior: "contain" }}>
              <div className="project-readme-document">
                {(() => {
                  const readme = selectedProject.readme ?? defaultReadme;
                  return <>
                    <section id="readme-overview" onClick={() => setActiveSection("readme-overview")}><h4 className="readme-inline-title"><span style={{ fontSize: 17, fontWeight: 900 }}>01</span>{"\u00A0\u00A0"}프로젝트 개요</h4><p>{readme.overview}</p>{readme.siteUrl && <p className="project-site-link">🔗 <strong>사이트 URL:</strong> <a href={readme.siteUrl} target="_blank" rel="noreferrer">{readme.siteUrl}</a></p>}</section>
                    <section id="readme-features" onClick={() => setActiveSection("readme-features")}><h4 className="readme-inline-title"><span style={{ fontSize: 17, fontWeight: 900 }}>02</span>{"\u00A0\u00A0"}핵심 기능</h4><ul>{readme.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>
                    <section id="readme-architecture" onClick={() => setActiveSection("readme-architecture")}>
                      <h4 className="readme-inline-title"><span style={{ fontSize: 17, fontWeight: 900 }}>03</span>{"\u00A0\u00A0"}구조와 기술 선택</h4>
                      <p>{readme.architecture.description}</p>
                      {readme.architecture.diagram && (
                        <div className="architecture-diagram" aria-label="서비스 아키텍처 구성도">
                          <div className="architecture-diagram-core">
                            <strong>{readme.architecture.diagram.client}</strong><span aria-hidden="true">→</span><strong>{readme.architecture.diagram.api}</strong>
                          </div>
                          <div className="architecture-diagram-dependencies">
                            {readme.architecture.diagram.dependencies.map((dependency) => <span key={dependency}>{dependency}</span>)}
                          </div>
                        </div>
                      )}
                      <div className="architecture-choice-list">{readme.architecture.choices.map((choice) => <article key={choice.name}><strong className="architecture-inline-title"><span>{choice.category}</span>{"\u00A0\u00A0"}{choice.name}</strong><p>{choice.reason}</p></article>)}</div>
                      <div className="deployment-plan"><span>배포 방식</span><strong>배포 · 운영 환경</strong><p>{readme.architecture.deployment}</p></div>
                    </section>
                    <section id="readme-implementation" onClick={() => setActiveSection("readme-implementation")}><h4 className="readme-inline-title"><span style={{ fontSize: 17, fontWeight: 900 }}>04</span>{"\u00A0\u00A0"}프로젝트 개발 처음부터 끝</h4><p>{readme.implementation.overview}</p><div className="vibe-process-list" style={{ display: "grid", gridTemplateColumns: isCompact ? "1fr" : "repeat(2, minmax(0, 1fr))", gap: 10 }}>{readme.implementation.steps.map((step, index) => <article key={step.label} style={{ display: "flex", flexDirection: "column", minHeight: 164, padding: 18, borderRadius: 16, border: "1px solid rgba(74, 84, 100, .08)", background: ["var(--lavender)", "var(--mint)", "var(--peach)", "#f7f6f3", "var(--lavender)", "var(--mint)"][index] }}><span style={{ display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: "50%", background: "var(--ink)", color: "#fff", fontSize: 10, fontWeight: 800 }}>{step.label}</span><h5 style={{ margin: "18px 0 7px", color: "var(--ink)", fontSize: 15, letterSpacing: "-.04em" }}>{step.title}</h5><p style={{ margin: 0, color: "#566170", fontSize: 11, fontWeight: 700, lineHeight: 1.65 }}>{step.description}</p></article>)}</div><div className="vibe-principles" style={{ marginTop: 12, padding: 18, borderRadius: 16, background: "#f3f1ff", color: "var(--ink)" }}><strong style={{ fontSize: 12 }}>AI Codex와 함께한 개발 원칙</strong><ul style={{ marginTop: 11 }}>{readme.implementation.principles.map((principle) => <li key={principle} style={{ color: "#566170" }}>{principle}</li>)}</ul></div></section>
                  </>;
                })()}
              </div>
              </div>
            </div>
            <footer className="project-readme-footer" style={{ flex: "0 0 auto", padding: "14px 34px 18px", borderTop: "1px solid #ebe9e3", background: "#fff", color: "#6b7390", fontSize: 11, fontWeight: 700 }}>
              {selectedProject.note ?? "프로젝트 등록 후 이 영역을 실제 README 내용으로 채울 수 있습니다."}
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
