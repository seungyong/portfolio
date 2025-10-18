import React from "react";
import Image from "next/image";

import styles from "./profile.module.scss";

import Info from "./info";
import Title from "../title/title";

const Profile = () => {
  const info = [
    { label: "이름", value: "김승용" },
    { label: "이메일", value: "seungyong20@naver.com" },
    { label: "전화번호", value: "010-8529-7193" },
    { label: "Github", value: "github.com/seungyong", isLink: true },
    { label: "블로그", value: "seungyong20.tistory.com", isLink: true },
  ];

  return (
    <div className={styles.profile}>
      <Title title="Profile" />
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
