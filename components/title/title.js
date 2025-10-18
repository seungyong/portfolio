"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./title.module.scss";

const Title = ({ title }) => {
  const titleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "30px",
      },
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <h1 className={styles.title} ref={titleRef}>
      <span>{title}</span>
      <div
        className={`${styles.underline} ${
          !isVisible ? styles.none : styles.scrolled
        }`}
      />
    </h1>
  );
};

export default Title;
