import React from "react";
import Image from "next/image";

import styles from "./skillCard.module.scss";

import { Card } from "@/components/ui/card";

const SkillCard = ({ skill, path }) => {
  return (
    <Card className={styles.skillCard}>
      <Image
        src={path}
        alt={skill}
        width={40}
        height={40}
        className={styles.skillImage}
      />
      <div className={styles.skillName}>{skill}</div>
    </Card>
  );
};

export default SkillCard;
