import React from "react";

import styles from "./project.module.scss";

import Title from "../title/title";
import Detail from "./detail";

const Project = () => {
  const projects = [
    {
      name: "Globa",
      descriptions: [
        "AI 시장의 폭발적인 성장 및 디지털 수업을 이용한 교육 방식의 변화에 따라, AI를 활용한 STT 모바일 앱 개발하였습니다.",
        "STT(음성인식) 기술을 활용하여 사용자의 음성을 텍스트로 변환하고, 이를 기반으로 다양한 기능을 제공합니다.",
      ],
      role: "팀장 및 백엔드 개발자",
      date: ["2024.03 - 2024.09", "2025.01 - 현재"],
      skills: [
        {
          title: "Spring Boot",
          isActive: true,
        },
        {
          title: "Spring Data JPA",
          isActive: true,
        },
        {
          title: "Python",
          isActive: true,
        },
        {
          title: "Android (Java)",
          isActive: false,
        },
        {
          title: "openAI/gpt",
          isActive: true,
        },
        {
          title: "Whisper",
          isActive: true,
        },
        {
          title: "Kiwi",
          isActive: true,
        },
        {
          title: "MariaDB",
          isActive: true,
        },
        {
          title: "Redis",
          isActive: true,
        },
        {
          title: "AWS EC2",
          isActive: true,
        },
        {
          title: "AWS RDS",
          isActive: true,
        },
        {
          title: "AWS SQS",
          isActive: true,
        },
        {
          title: "Docker / Docker Compose",
          isActive: true,
        },
        {
          title: "Git / GitHub",
          isActive: true,
        },
      ],
      develop: [
        "기획",
        "DB 설계",
        "API 설계",
        "UI/UX 디자인",
        "Kiwi를 통한 중요 키워드 추출",
        "Whisper를 통한 음성 인식 결과 추출",
        "OpenAI GPT API를 통한 퀴즈, 단락 분리, 요약 생성",
        "사용자 인증 (JWT), 문서, 댓글, 공유, 권한 관리 등 주요 기능 API 개발",
        "Spring Boot API Server 리팩토링 (Clean Architecture)",
        "우리말샘 Excel을 활용한 단어 검색 기능 개발",
        "AWS EC2, RDS, SQS를 활용한 인프라 구축 및 배포",
      ],
      video: "/globa.mp4",
      github: "https://github.com/Globa-Seoil-Univ/globa-backend",
    },
    {
      name: "Algorithm",
      descriptions: [
        "다양한 알고리즘 문제를 풀고, 자신의 알고리즘 실력을 향상시킬 수 있는 웹 애플리케이션입니다.",
        "백준과 프로그래머스과 차별점을 두기 위해 문제 해설을 제공합니다.",
      ],
      role: "프론트엔드 개발자",
      date: ["2024.01 - 2024.02", "2024.07 - 2024.09"],
      skills: [
        {
          title: "Next.js",
          isActive: true,
        },
        {
          title: "Typescript",
          isActive: true,
        },
        {
          title: "SCSS",
          isActive: true,
        },
        {
          title: "Tiptap",
          isActive: true,
        },
        {
          title: "Spring Boot",
          isActive: false,
        },
        {
          title: "MySQL",
          isActive: false,
        },
        {
          title: "Redis",
          isActive: false,
        },
        {
          title: "Git / GitHub",
          isActive: true,
        },
        {
          title: "Figma",
          isActive: true,
        },
      ],
      develop: [
        "기획",
        "UI/UX 디자인",
        "전체적인 프론트 개발",
        "Tiptap을 활용한 Text Editor 개발 (Indent, Code Block, Table 등)",
        "CodeMirror를 활용한 코드 편집기 활용",
        "라이트/다크 모드 테마 구현",
        "반응형 웹 구현",
        "Naver, Google, Github 로그인 연동",
        "API 통신",
      ],
      images: [
        "/algorithm1.png",
        "/algorithm2.png",
        "/algorithm3.png",
        "/algorithm4.png",
        "/algorithm5.png",
        "/algorithm6.png",
        "/algorithm7.png",
        "/algorithm8.png",
        "/algorithm9.png",
        "/algorithm10.png",
        "/algorithm11.png",
        "/algorithm12.png",
        "/algorithm13.png",
        "/algorithm14.png",
      ],
      github: "https://github.com/Seoil-Twins/algorithm",
    },
  ];

  return (
    <div>
      <Title title="Projects" />
      <div className={styles.projects}>
        {projects.map((project, index) => (
          <Detail key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Project;
