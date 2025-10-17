import React from "react";
import Image from "next/image";

import styles from "./info.module.scss";

const info = () => {
  return (
    <div className={styles.info}>
      <h1 className={styles.title}>Profile</h1>
      <div className={styles.content}>
        <Image
          src="/profile.jpg"
          alt="사진"
          width={1193}
          height={1535}
          className={styles.profileImg}
        />
        <div>
          <div>
            <p>이름</p>
            <span>김승용</span>
          </div>
          <div>
            <p>이메일</p>
            <span>seungyong20@naver.com</span>
          </div>
          <div>
            <p>전화번호</p>
            <span>010-8529-7193</span>
          </div>
          <div>
            <p>Github</p>
            <span>
              <a href="https://github.com/seungyong">seungyong20</a>
            </span>
          </div>
          <div>
            <p>블로그</p>
            <span>
              <a href="https://seungyong20.tistory.com/">
                seungyong-dev.tistory.com
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default info;
