import React from "react";

import Title from "../title/title";
import VerticalTimeline from "../vertical-timeline/verticalTimeline";

const Experience = () => {
  const timeline = [
    {
      date: "2025.03 - 2026.02",
      title: "서일대학교 전공심화",
      description: "소프트웨어공학과 졸업 예정",
    },
    {
      date: "2020.03 - 2025.02",
      title: "서일대학교 전문학사",
      description: "소프트웨어공학과 졸업 (학점 : 4.34/4.5)",
    },
    {
      date: "2019.01 - 2020.01",
      title: "(주)달소프트",
      description: [
        "Vue JS 웹 개발자",
        "Vue JS + Cordova 하이브리드 앱 개발자",
      ],
    },
    {
      date: "2017.03 - 2019.02",
      title: "한양공업고등학교",
      description: "컴퓨터 네트워크과 졸업",
    },
  ];

  return (
    <div>
      <Title title="Career" />
      <VerticalTimeline timeline={timeline} />
    </div>
  );
};

export default Experience;
