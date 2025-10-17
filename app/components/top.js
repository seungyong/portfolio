"use client";

import React from "react";

import { blackHanSans } from "@/styles/_font";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import styles from "./top.module.scss";

const top = () => {
  return (
    <>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={`${blackHanSans.variable} ${styles.name}`}>
            KIM <p>SEUNG YONG</p>
          </h1>
          <p className={`${styles.job} text-muted-foreground`}>
            Backend Developer
          </p>
          <p className={`${styles.desc}`}>
            친화적이고 다재다능한 Spring Boot 개발자
          </p>
        </div>
        <DotLottieReact
          className="w-16 h-16 absolute bottom-12"
          src="https://lottie.host/d09b318b-30a0-4fd0-a502-c5d8db168eed/9x78GJfisa.json"
          loop
          autoplay
        />
      </div>
    </>
  );
};

export default top;
