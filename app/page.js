import React from "react";
import { Analytics } from "@vercel/analytics/next";

import Top from "@/components/top/top";
import Profile from "@/components/profile/profile";
import Skills from "@/components/skills/skills";
import Experience from "@/components/experience/experience";
import Project from "@/components/project/project";
import Certificate from "@/components/certificate/certificate";

import styles from "./page.module.scss";

const page = () => {
  return (
    <>
      <Analytics />
      <section className={styles.center}>
        <Top />
        <Profile />
        <Skills />
        <Experience />
        <Project />
        <Certificate />
      </section>
      <footer className={`${styles.footer} text-muted-foreground`}>
        © 2025 by Kim Seung Yong. All rights reserved.
      </footer>
    </>
  );
};

export default page;
