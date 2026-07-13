import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "진환's 포트폴리오",
  description: "백엔드, 클라우드, DevOps와 운영을 연결하는 풀사이클 엔지니어 포트폴리오",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
