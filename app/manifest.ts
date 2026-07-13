import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "진환's 포트폴리오",
    short_name: "진환's 포트폴리오",
    description: "풀사이클 개발자 김진환의 포트폴리오",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfaf7",
    theme_color: "#5e81ac",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
