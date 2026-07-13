export type SkillGroup = {
  title: string;
  description: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "백엔드",
    description: "서비스 로직과 API를 설계하고 구현합니다.",
    skills: ["Java", "Spring Boot", "Python", "Django", "Django REST Framework", "REST API"],
  },
  {
    title: "데이터",
    description: "데이터 모델, 쿼리, 마이그레이션과 성능을 다룹니다.",
    skills: ["MySQL", "Amazon Aurora", "PostgreSQL", "MyBatis"],
  },
  {
    title: "클라우드 · DevOps",
    description: "배포, 확장, 보안, 모니터링을 운영 구조로 만듭니다.",
    skills: ["AWS", "Linux", "Docker", "Kubernetes", "EKS", "Git", "Bitbucket CI/CD", "Auto Scaling", "CloudWatch", "WAF"],
  },
  {
    title: "프론트엔드",
    description: "제품 전달에 필요한 화면과 사용자 흐름을 구현합니다.",
    skills: ["JavaScript", "TypeScript", "React"],
  },
];
