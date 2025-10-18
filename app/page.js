import React from "react";

import Top from "@/components/top/top";
import Skills from "@/components/skills/skills";
import Profile from "@/components/profile/profile";

import styles from "./page.module.scss";

const page = () => {
  return (
    <section className={styles.center}>
      <Top />
      <Profile />
      <Skills />
    </section>
  );
};

export default page;
