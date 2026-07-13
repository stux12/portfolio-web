# 방문 기록·좋아요 Supabase 연결

## 구조

- Vercel의 `/api/engagement`가 방문자 IP를 서버에서 HMAC-SHA256으로 해시합니다.
- Supabase에는 해시값, 방문 날짜, 좋아요 여부만 저장합니다. 원문 IP는 저장하지 않습니다.
- 페이지는 오늘 고유 방문자, 누적 고유 방문자, 좋아요 수만 표시합니다.

## 최초 설정

1. Supabase에서 새 프로젝트를 만듭니다.
2. Dashboard의 SQL Editor에서 [`supabase/schema.sql`](../supabase/schema.sql) 전체를 한 번 실행합니다.
3. Vercel 프로젝트의 Environment Variables에 아래 값을 **Production / Preview / Development** 범위로 등록합니다.

| 이름 | 값 | 비고 |
| --- | --- | --- |
| `SUPABASE_URL` | Project URL | `https://<project-ref>.supabase.co` 형식 |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret key 또는 legacy service role key | 절대 브라우저·Git에 노출하지 않음 |
| `ENGAGEMENT_IP_SALT` | 무작위 긴 문자열 | IP 해시 전용 비밀값, 한 번 정하면 변경하지 않음 |

4. Vercel에서 재배포한 뒤 페이지를 열어 방문 기록과 좋아요 버튼이 나타나는지 확인합니다.

## 운영 규칙

- `SUPABASE_SERVICE_ROLE_KEY`와 `ENGAGEMENT_IP_SALT`는 `.env*`에도 커밋하지 않습니다.
- 좋아요는 IP 해시 기준 1회입니다. 공유 IP 환경에서는 여러 사람이 한 명으로, IP가 바뀌면 같은 사람이 새 방문자로 집계될 수 있습니다.
- 오늘 방문자는 `Asia/Seoul` 날짜를 기준으로 집계합니다.
- Supabase Free 프로젝트는 장기간 미접속 시 일시 정지될 수 있으므로, 포트폴리오를 주기적으로 확인합니다.
