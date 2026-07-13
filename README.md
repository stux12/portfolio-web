# 진환's 포트폴리오 유지보수 가이드

김진환의 풀사이클 개발자 포트폴리오입니다. 백엔드 개발을 중심으로 인프라, DevOps, 데이터베이스, 서비스 운영 경험을 보여주도록 구성했습니다.

이 문서만 읽고도 콘텐츠를 추가하거나 디자인을 수정할 수 있도록 현재 구조와 규칙을 기록합니다.

## 실행과 배포

```bash
npm install
npm run dev
```

- 로컬 주소: `http://localhost:3001`
- 확인 명령: `npm run lint`, `npm run build`
- 원격 저장소: `https://github.com/stux12/portfolio-web`
- 운영 주소: `https://jinhwan-portfolio.vercel.app`
- `main` 브랜치에 push하면 Vercel Hobby 플랜에서 자동으로 프로덕션 배포됩니다.

변경 후에는 최소한 `npm run lint`와 `npm run build`를 모두 실행합니다. 화면·모달·모바일처럼 동작에 영향을 주는 변경은 실제 브라우저에서도 확인합니다.

## 파일 구조와 역할

| 경로 | 역할 | 수정할 때 |
| --- | --- | --- |
| `app/page.tsx` | 첫 화면, 프로필, 총 경력 카드, 커리어 타임라인 | 이름·연락처·경력·회사별 성과 수정 |
| `app/data/projects.ts` | 상단 기술 스택 데이터 | 기술 추가·삭제·분류 변경 |
| `app/components/project-showcase.tsx` | 프로젝트 카드, 카드 전환, README 모달, 프로젝트 상세 데이터 | 개인 프로젝트 추가와 상세 README 작성 |
| `app/components/site-engagement.tsx` | 방문 기록과 좋아요 UI | Supabase 연결 후 방문·좋아요 표시 |
| `app/api/engagement/route.ts` | 방문·좋아요 API | IP 해시와 Supabase RPC 호출 |
| `app/components/top-link.tsx` | 상단 워드마크와 최상단 이동 | 브랜드 문구 또는 이동 방식 변경 |
| `app/globals.css` | 전체 디자인 토큰, 반응형, 카드·모달 스타일 | 디자인과 레이아웃 수정 |
| `app/layout.tsx` | 탭 제목, 검색·공유 메타데이터, Open Graph 이미지 | 사이트 제목·설명·대표 이미지 변경 |
| `app/manifest.ts`, `app/icon.svg` | 웹 앱 이름·파비콘 | 앱 이름·아이콘 변경 |
| `public/` | 회사 로고와 공유 이미지 같은 정적 파일 | 새 이미지 저장 |

## 콘텐츠 수정 방법

### 프로필과 커리어

`app/page.tsx`의 다음 데이터를 수정합니다.

- `careers`: 회사명, 기간, 역할, 설명, 성과 목록
- 히어로 영역: 이름, 생년월일, 이메일, 전화번호
- `public/lawtle-logo.jpg`, `public/wincube-logo.png`: 회사 로고

커리어 설명은 **무엇을 했는지**보다 **어떤 문제를 어떤 기준으로 해결했는지**를 우선합니다. 수치가 있으면 근거가 확인되는 범위에서만 사용합니다.

### 기술 스택

`app/data/projects.ts`의 `skillGroups`를 수정합니다.

- 서비스 개발: 백엔드·데이터베이스·프론트엔드 기술
- 인프라 · 운영: AWS, Linux, Docker, Kubernetes, CI/CD, 모니터링·보안 기술

상단 카드가 너무 길어지지 않도록 현재 실제로 설명 가능한 기술만 유지합니다.

### 개인 프로젝트 추가

`app/components/project-showcase.tsx`의 `projectTemplates` 배열에 프로젝트 객체를 추가합니다. 화면을 복제하지 말고, 데이터만 추가합니다.

다른 AI와 프로젝트 정보를 정리할 때는 [개인 프로젝트 정리 입력 양식](docs/project-intake-template.md)을 사용합니다.

필수 항목:

```ts
{
  id: "unique-project-id",
  title: "프로젝트 이름",
  category: "개인 프로젝트 02",
  summary: "카드 앞면에 보일 한두 문장 설명",
  stack: ["기술", "스택"],
  tone: "mint", // lavender | mint | peach
  readme: {
    overview: "프로젝트 개요",
    features: ["핵심 기능"],
    architecture: {
      description: "구조 설명",
      choices: [{ category: "선택 기준", name: "기술", reason: "선택 이유" }],
      deployment: "배포 방식과 자동화 흐름",
    },
    implementation: {
      overview: "개발 과정 요약",
      steps: [{ label: "01", title: "단계", description: "판단과 결과" }],
      principles: ["재사용할 개발 원칙"],
    },
  },
  note: "README 하단 문구",
}
```

프로젝트는 다음 네 가지 내용을 모두 채운 뒤 공개합니다.

1. 프로젝트 개요
2. 핵심 기능
3. 구조와 기술 선택 — 기술을 쓴 이유와 대안을 함께 기록
4. 프로젝트 개발 처음부터 끝 — 기획, 구현, 검증, 배포 결과를 순서대로 기록

현재의 02·03 카드가 실제 프로젝트로 바뀌면 `title`, `summary`, `stack`, `readme`를 함께 교체합니다. 아직 기록이 없다면 카드와 README 버튼을 노출하지 않는 편이 더 좋습니다.

### 방문 기록과 좋아요

방문자·좋아요 기능은 Vercel API와 Supabase를 함께 사용합니다. 최초 연결 방법과 보안 규칙은 [Supabase 연결 문서](docs/supabase-engagement.md)를 따릅니다.

## 디자인 규칙

### 색상과 카드

`app/globals.css`의 `:root` 토큰을 기본값으로 사용합니다.

- `--paper`: `#fbfaf7` — 페이지 기본 배경
- `--lavender`: `#f0edff` — 핵심 경력·대표 프로젝트
- `--mint`: `#e5f7ef` — 서비스·운영 관련 영역
- `--peach`: `#fff0e7` — 보조 강조 영역
- `--blue`: `#5b66e8` — 링크·상태·번호 강조
- `--ink`: `#293041` — 본문 제목과 짙은 카드

새 영역은 흰색, lavender, mint, peach 가운데 하나를 선택합니다. 임의의 강한 색을 추가하지 않고, 둥근 카드·부드러운 그림자·짧은 안내 문구의 조합을 유지합니다.

### 반응형과 모달: 반드시 지킬 규칙

- 기준 폭은 `760px`입니다.
- 모바일 프로젝트 카드는 3D 회전 대신 앞면·뒷면 교차 전환을 사용합니다. 다시 `rotateY`만으로 되돌리면 모바일 Safari에서 앞면 글자가 반전되어 비칠 수 있습니다.
- 첫 프로젝트 카드는 기술 스택이 많으므로 모바일 최소 높이 `352px`을 유지합니다.
- README 모달이 열리면 `body`, `html` 스크롤을 잠그고 모달 내부만 스크롤합니다.
- README의 `architecture-choice-list`는 `minmax(0, 1fr)`, `max-width: 100%`, `overflow-wrap: anywhere` 규칙을 유지합니다. 긴 기술명이 모바일 모달 밖으로 나가는 것을 막는 장치입니다.
- 상단 nav는 sticky 상태를 유지합니다. 모달과 nav의 레이어 순서를 변경할 때는 모달을 연 상태에서도 nav 노출·클릭 동작을 함께 확인합니다.

## 검색·공유 이미지

공유 메타데이터는 `app/layout.tsx`에서 관리합니다.

- 대표 이미지: `public/og-jh.png` (`1730 × 909`)
- Open Graph: KakaoTalk, LinkedIn 등
- Twitter: `summary_large_image`
- 대표 도메인과 canonical URL: `https://jinhwan-portfolio.vercel.app`

대표 이미지를 교체할 때는 새 파일을 `public/`에 추가하고, `openGraph.images`와 `twitter.images`를 같은 파일명으로 함께 변경합니다. 이미지에는 개인정보나 작은 글자를 많이 넣지 않고, 축소된 미리보기에서도 읽히는 `JH` 같은 브랜드 요소를 사용합니다.

카카오톡은 예전에 생성한 링크 미리보기를 캐시할 수 있습니다. 운영 페이지의 `og:image`가 새 이미지인지 먼저 확인하고, 캐시가 남으면 `?v=날짜` 같은 쿼리를 붙인 URL로 한 번 공유해 새 미리보기를 생성합니다.

## 변경 전·후 체크리스트

- [ ] 실제 화면에 없는 기술·프로젝트·성과를 추가하지 않았는가?
- [ ] 새 프로젝트의 카드 앞면, 뒷면, README 네 섹션을 모두 채웠는가?
- [ ] 모바일에서 카드 전환, 모달 열기·닫기, 내부 스크롤을 확인했는가?
- [ ] 긴 기술명이나 문장이 카드·모달 밖으로 넘치지 않는가?
- [ ] `npm run lint`와 `npm run build`를 통과했는가?
- [ ] 공개 변경이면 `main` push 후 운영 주소와 공유 메타데이터를 확인했는가?

## 작업 원칙

1. 요청받은 영역만 수정하고, 관계없는 디자인을 함께 바꾸지 않습니다.
2. 데이터와 화면 구조를 분리합니다. 프로젝트 추가는 컴포넌트 복제가 아니라 데이터 추가로 처리합니다.
3. AI가 만든 제안도 실제 화면, 린트, 프로덕션 빌드로 확인한 뒤 반영합니다.
4. 변경 사항은 작게 나누어 커밋하고, 커밋 메시지에는 변경 목적을 명확히 적습니다.
