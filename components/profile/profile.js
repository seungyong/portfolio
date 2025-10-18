"use client";

import React, { useCallback, useEffect } from "react";
import Image from "next/image";

import styles from "./profile.module.scss";

import Info from "./info";

const Profile = () => {
  const info = [
    { label: "이름", value: "김승용" },
    { label: "이메일", value: "seungyong20@naver.com" },
    { label: "전화번호", value: "010-8529-7193" },
    { label: "Github", value: "github.com/seungyong", isLink: true },
    { label: "블로그", value: "seungyong20.tistory.com", isLink: true },
  ];

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const profileElement = document.querySelector(`.${styles.profile}`);
    const underlineElement = document.querySelector(`.${styles.underline}`);

    if (profileElement) {
      if (scrollY > 100) {
        underlineElement.classList.remove(styles.none);
        underlineElement.classList.add(styles.scrolled);
        window.removeEventListener("scroll", handleScroll);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={styles.profile}>
      <h1 className={styles.title}>
        <span>Profile</span>
        <div className={`${styles.underline} ${styles.none}`} />
      </h1>
      <div className={styles.content}>
        <Image
          src="/profile.jpg"
          alt="사진"
          width={1193}
          height={1535}
          className={styles.profileImg}
        />
        <div className={styles.info}>
          {info.map((item, index) => (
            <Info key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
