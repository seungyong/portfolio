import React from "react";

import styels from "./certificate.module.scss";

import Title from "../title/title";
import { Card } from "@/components/ui/card";

const Certificate = () => {
  const certificates = [
    {
      name: "정보처리기사",
      date: "2025.09",
    },
    {
      name: "SQLD",
      date: "2024.12",
    },
  ];

  return (
    <div>
      <Title title="Certificates" />
      <ul className={styels.certificateList}>
        {certificates.map((certificate, index) => (
          <li key={index} className={styels.certificateItem}>
            <Card className={styels.certificateCard}>
              <span className={styels.certificateName}>{certificate.name}</span>
              <span className={styels.certificateDate}>{certificate.date}</span>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Certificate;
