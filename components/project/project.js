"use client";

import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./project.module.scss";
import Title from "../title/title";
import Detail from "./detail";

const Project = () => {
  const [showImportantOnly, setShowImportantOnly] = useState(false);
  const projects = useMemo(
    () => [
      {
        name: "Helpme.md",
        descriptions: [
          "취준생 및 학생 등 개발의 입문한 사람들이 README.md 작성에 대한 어려움을 겪는 문제를 해결하기 위해 개발된 웹 애플리케이션입니다.",
          "사용자들은 Github App을 통해 자신의 프로젝트를 연동하고, 프로젝트의 정보를 읽어 README.md 파일을 자동으로 생성할 수 있습니다.",
        ],
        role: "풀스택",
        date: ["2026.01 - 2026.02 (v1.0)", "2026.02 - 현재 (서비스 중)"],
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
            title: "React",
            isActive: true,
          },
          {
            title: "openAI/gpt",
            isActive: true,
          },
          {
            title: "Supabase",
            isActive: true,
          },
          {
            title: "Redis",
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
          {
            title: "Github Actions",
            isActive: true,
          },
          {
            title: "Vercel",
            isActive: true,
          },
        ],
        develop: [
          "기획",
          "DB 설계",
          "API 설계",
          "UI/UX 디자인",
          "Github App을 통한 프로젝트 연동 기능 개발",
          "Github API를 활용한 프로젝트 정보 수집 및 분석 (커밋 메시지, 프로젝트 구조, 코드 내용, 기술 스택 분석 등)",
          "OpenAI GPT API를 활용한 README.md 초안 생성 기능 개발",
          "OpenAI GPT API를 활용한 프로젝트 중요 파일, 진입점 파일 추출 기능 개발",
          "사용자 인증 (JWT), README.md 관리 등 주요 기능 API 개발",
          "Docker를 활용한 개발 및 배포 환경 구축",
          "Github Actions를 활용한 CI/CD 파이프라인 구축",
          "Vercel을 활용한 프론트엔드 배포",
        ],
        video: "https://www.youtube.com/embed/S2M90_2e1ao?si=MboNt-hRf7ELzcGb",
        btns: [
          {
            title: "Helpme.md",
            url: "https://helpme.seungyong.co.kr/",
            svgEle: (
              <Image src="/helpme.png" alt="Link" width={24} height={24} />
            ),
          },
          {
            title: "Backend",
            url: "https://github.com/seungyong/helpme.md-backend",
            svgEle: (
              <Image src="/github.svg" alt="GitHub" width={24} height={24} />
            ),
          },
          {
            title: "Frontend",
            url: "https://github.com/seungyong/helpme.md-frontend",
            svgEle: (
              <Image src="/github.svg" alt="GitHub" width={24} height={24} />
            ),
          },
        ],
        isImportant: true,
      },
      {
        name: "Globa",
        descriptions: [
          "AI 시장의 폭발적인 성장 및 디지털 수업을 이용한 교육 방식의 변화에 따라, AI를 활용한 STT 모바일 앱 개발하였습니다.",
          "STT(음성인식) 기술을 활용하여 사용자의 음성을 텍스트로 변환하고, 이를 기반으로 다양한 기능을 제공합니다.",
        ],
        role: "팀장 및 백엔드 개발자",
        date: ["2024.03 - 2024.09", "2025.01 - 2025.09"],
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
        video: "https://www.youtube.com/embed/NHepQN2UuM8?si=wdZvYNkz6rRxs0Ob",
        btns: [
          {
            title: "Github",
            url: "https://github.com/Globa-Seoil-Univ/globa-backend",
            svgEle: (
              <Image src="/github.svg" alt="GitHub" width={24} height={24} />
            ),
          },
          {
            title: "트러블 슈팅",
            url: "/trouble-shooting/globa",
            svgEle: (
              <Image
                src="/trouble-shooting.svg"
                alt="트러블 슈팅"
                width={24}
                height={24}
              />
            ),
          },
        ],
        isImportant: true,
      },
      {
        name: "PerfectFit",
        descriptions: [
          "사용자의 프로젝트 경험, 일 경험, 직업, 프롬프트 등을 기반하여 자기소개서 및 모의 면접을 생성하는 웹 사이트입니다.",
          "문장에 대한 띄어쓰기, 맞춤법 등을 검사 해주는 기능을 제공합니다.",
          "각 회사 별 인재상을 추출하고, 회사에 대표적인 직업 5가지를 뽑아 모의 면접 내용을 제공합니다.",
          "사용자들은 자신의 자기소개서와 모의 면접을 다른 사람들에게 공개할 수 있습니다.",
        ],
        role: "백엔드 개발자",
        date: ["2023.10 - 2024.12"],
        skills: [
          {
            title: "Flask",
            isActive: true,
          },
          {
            title: "Python",
            isActive: true,
          },
          {
            title: "openAI/gpt",
            isActive: true,
          },
          {
            title: "MySQL",
            isActive: true,
          },
          {
            title: "Redis",
            isActive: true,
          },
          {
            title: "SQLAlchemy",
            isActive: true,
          },
          {
            title: "Celery",
            isActive: true,
          },
          {
            title: "Git / GitHub",
            isActive: true,
          },
        ],
        develop: [
          "로그인 및 회원가입",
          "자기소개서 (목록, 상세, 단락 생성, 단락에 대한 답변 생성) API 개발",
          "상호 작용 (좋아요, 조회수, 공개 여부 설정) API 개발",
          "자신의 자기소개서, 모의 면접, 내 정보 API 개발",
          "면접 선택, 작성, 로딩, 공개 모달창, 진행 디자인",
          "면접 목록 (기업, 직업, 검색), 면접 상세, 필수 정보 입력 (수정), 선택 정보 입력 (수정) 프론트 개발",
        ],
        images: [
          "/perfectfit01.gif",
          "/perfectfit02.gif",
          "/perfectfit03.gif",
          "/perfectfit04.gif",
          "/perfectfit05.gif",
          "/perfectfit06.gif",
          "/perfectfit07.gif",
          "/perfectfit08.gif",
          "/perfectfit09.gif",
          "/perfectfit10.gif",
          "/perfectfit11.gif",
        ],
        btns: [
          {
            title: "Github",
            url: "https://github.com/7-wonders/PerfectFit",
            svgEle: (
              <Image src="/github.svg" alt="GitHub" width={24} height={24} />
            ),
          },
        ],
        delay: 6000,
        isImportant: true,
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
            title: "HTML/CSS/JavaScript",
            isActive: true,
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
        btns: [
          {
            title: "Github",
            url: "https://github.com/Seoil-Twins/algorithm",
            svgEle: (
              <Image src="/github.svg" alt="GitHub" width={24} height={24} />
            ),
          },
        ],
      },
      {
        name: "Forde",
        descriptions: [
          "IT 업계 선배, 후배, 동기들의 다양한 경험과 조언을 공유하는 커뮤니티 웹사이트입니다.",
          "사용자들은 게시글 작성, 댓글 작성, 좋아요 등의 기능을 통해 활발히 소통할 수 있습니다.",
          "팔로우 기능을 통해 관심 있는 사용자들의 활동을 쉽게 팔로우할 수 있습니다.",
        ],
        role: "풀스택 개발자",
        date: ["2025.02 - 2025.04"],
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
            title: "MariaDB",
            isActive: true,
          },
          {
            title: "Redis",
            isActive: true,
          },
          {
            title: "React",
            isActive: true,
          },
          {
            title: "Typescript",
            isActive: true,
          },
          {
            title: "AWS RDS",
            isActive: true,
          },
          {
            title: "HTML/CSS/JavaScript",
            isActive: true,
          },
        ],
        develop: [
          "기획",
          "UI/UX 디자인",
          "API/DB 설계 및 문서화",
          "React/TypeScript 기반 웹 애플리케이션 구축 ( 메인 일부,로그인,코드작성 부분 등 )",
          "컴포넌트 아키텍처 설계 및 개발 ( 게시글 리스트, 댓글 등 컴포넌트 기초 설계 )",
          "콘텐츠 관리 (게시글 CRUD, 댓글 및 대댓글 시스템, 임시저장 기능) API 개발",
          "뉴스 및 피드 (최신/일일/월간 뉴스 조회, 추천 콘텐츠, 팔로잉 피드) API 개발",
          "검색 및 태그 (통합 검색 기능, 태그 관리 및 검색, 인기 태그 조회) API 개발",
          "상호작용 기능 (좋아요, 게시글 조회수 및 체류시간 추적) 기능 개발",
        ],
        images: [
          "/forde05.png",
          "/forde06.png",
          "/forde07.png",
          "/forde08.png",
          "/forde09.png",
          "/forde10.png",
          "/forde11.png",
          "/forde12.png",
          "/forde13.png",
        ],
        btns: [
          {
            title: "Github",
            url: "https://github.com/3-Wonders/Forde-Backend",
            svgEle: (
              <Image src="/github.svg" alt="GitHub" width={24} height={24} />
            ),
          },
        ],
      },
      {
        name: "YSY",
        descriptions: [
          "커플 간의 일정, 앨범 등을 공유하여 손쉽게 추억을 쌓고 관리할 수 있는 모바일 애플리케이션입니다.",
        ],
        role: "백엔드 개발자",
        date: ["2023.03 - 2023.11"],
        skills: [
          {
            title: "Node JS",
            isActive: true,
          },
          {
            title: "Express",
            isActive: true,
          },
          {
            title: "MySQL",
            isActive: true,
          },
          {
            title: "Redis",
            isActive: true,
          },
          {
            title: "GCS",
            isActive: true,
          },
          {
            title: "React Native",
            isActive: false,
          },
        ],
        develop: [
          "기획",
          "UI/UX 디자인",
          "API/DB 설계 및 문서화",
          "SNS 로그인",
          "단일/다중 이미지 업로드 및 관리",
          "일정 관리",
          "Batch를 통한 Tour API 호출 및 데이터 저장",
          "데이트 장소 정렬 및 좋아요",
        ],
        images: [
          "/ysy01.jpg",
          "/ysy02.jpg",
          "/ysy03.jpg",
          "/ysy04.jpg",
          "/ysy05.jpg",
          "/ysy06.jpg",
          "/ysy07.jpg",
          "/ysy08.jpg",
          "/ysy09.jpg",
          "/ysy10.jpg",
        ],
        btns: [
          {
            title: "Github",
            url: "https://github.com/Seoil-Twins/ysy",
            svgEle: (
              <Image src="/github.svg" alt="GitHub" width={24} height={24} />
            ),
          },
        ],
      },
      {
        name: "Drone (Object Tracking)",
        descriptions: [
          "드론에 장착된 카메라를 통해 실시간으로 객체를 추적하는 시스템입니다.",
          "OpenCV을 활용하여 특정 객체를 지정하고, 드론이 해당 객체를 지속적으로 추적할 수 있도록 구현하였습니다.",
        ],
        role: "풀스택 개발자",
        date: ["2023.07 - 2023.09"],
        skills: [
          {
            title: "Python",
            isActive: true,
          },
          {
            title: "Flask",
            isActive: true,
          },
          {
            title: "DJI Tello SDK",
            isActive: true,
          },
          {
            title: "OpenCV",
            isActive: true,
          },
          {
            title: "FFmpeg",
            isActive: true,
          },
          {
            title: "HTML/CSS/JavaScript",
            isActive: true,
          },
        ],
        develop: [
          "드론과의 통신을 위한 Flask 서버 구축",
          "드론 카메라 스트리밍 데이터 수신 및 처리",
          "OpenCV를 활용한 객체 인식 및 추적 알고리즘 구현",
          "드론 제어 명령어 생성 및 전송",
          "실시간 비디오 스트리밍 및 객체 추적 결과 웹 인터페이스 개발",
        ],
        video: "/drone.mp4",
        btns: [
          {
            title: "Github",
            url: "https://github.com/seungyong/drone",
            svgEle: (
              <Image src="/github.svg" alt="GitHub" width={24} height={24} />
            ),
          },
        ],
      },
      {
        name: "개인 포트폴리오 웹사이트",
        descriptions: [
          "자신의 경력, 프로젝트, 기술 스택 등을 효과적으로 소개하는 개인 포트폴리오 웹사이트입니다.",
          "반응형 디자인을 적용하여 다양한 기기에서 최적의 사용자 경험을 제공합니다.",
        ],
        role: "풀스택 개발자",
        date: ["2025.10 - 현재"],
        skills: [
          {
            title: "React",
            isActive: true,
          },
          {
            title: "HTML/CSS/JavaScript",
            isActive: true,
          },
          {
            title: "Vercel",
            isActive: true,
          },
        ],
        develop: [
          "UI/UX 디자인",
          "반응형 웹 구현",
          "프로젝트 및 경력 소개 페이지 개발",
          "배포 및 유지보수",
        ],
        btns: [
          {
            title: "Github",
            url: "https://github.com/seungyong/portfolio",
            svgEle: (
              <Image src="/github.svg" alt="GitHub" width={24} height={24} />
            ),
          },
        ],
      },
    ],
    [],
  );

  const filteredProjects = useMemo(() => {
    if (showImportantOnly) {
      return projects.filter((project) => project.isImportant);
    }
    return projects;
  }, [showImportantOnly, projects]);

  const handleToggle = useCallback(() => {
    setShowImportantOnly((prev) => !prev);
  }, []);

  return (
    <div>
      <Title title="Projects" />
      <div className={styles.filterBox}>
        <p className={styles.totalProjects}>
          총{" "}
          <span className={styles.totalCount}>{filteredProjects.length}</span>개
          프로젝트
        </p>
        <button
          className={styles.filterToggle}
          onClick={handleToggle}
          aria-pressed={showImportantOnly}
          aria-label="주요 프로젝트만 보기"
        >
          <span className={styles.toggleIcon}>★</span>
          <span>주요 프로젝트만</span>
        </button>
        <Link
          href="/trouble-shooting"
          className={styles.troubleShootingLink}
          aria-label="트러블 슈팅 페이지로 이동"
        >
          <Image
            src="/trouble-shooting.svg"
            alt=""
            width={20}
            height={20}
            aria-hidden
          />
          <span>모든 트러블 슈팅 목록</span>
        </Link>
        <hr className={styles.divider} />
      </div>
      <div className={styles.projects}>
        {filteredProjects.map((project, index) => (
          <Detail key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Project;
