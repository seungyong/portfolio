import React from "react";

import styles from "./skills.module.scss";

import { notosansMedium } from "@/styles/_font";

import Title from "../title/title";
import SkillCard from "./skillCard";

const Skills = () => {
  return (
    <div className={styles.skills}>
      <Title title="Skills" />
      <div className={`${notosansMedium.className} ${styles.title}`}>
        Proficient
      </div>
      <div className={styles.skillCards}>
        <SkillCard skill="Java" path="/java.svg" />
        <SkillCard skill="Spring Boot" path="/spring.svg" />
        <SkillCard skill="TypeScript" path="/typescript.svg" />
        <SkillCard skill="MariaDB" path="/mariadb.svg" />
        <SkillCard skill="MySQL" path="/mysql.svg" />
        <SkillCard skill="Redis" path="/redis.svg" />
        <SkillCard skill="Figma" path="/figma.svg" />
      </div>
      <div className={`${notosansMedium.className} ${styles.title}`}>
        Familiar
      </div>
      <div className={styles.skillCards}>
        <SkillCard skill="Python" path="/python.svg" />
        <SkillCard skill="Oracle" path="/oracle.svg" />
        <SkillCard skill="React" path="/react.svg" />
        <SkillCard skill="Next.js" path="/nextjs.svg" />
        <SkillCard skill="Docker" path="/docker.svg" />
      </div>
    </div>
  );
};

export default Skills;
