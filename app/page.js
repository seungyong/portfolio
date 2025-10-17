import React from "react";

import Top from "@/app/components/top";
import Skills from "@/app/components/skills";
import Info from "@/app/components/info";

import styles from "./page.module.scss";

const page = () => {
  return (
    <section className={styles.center}>
      <Top />
      <Info />
      {/* <Skills /> */}
    </section>
  );
};

export default page;
