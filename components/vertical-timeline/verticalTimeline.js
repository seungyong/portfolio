import React from "react";

import styles from "./verticalTimeline.module.scss";

const VerticalTimeline = ({ timeline }) => {
  return (
    <div className={styles.verticalTimeline}>
      {timeline.map((item, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.point}></div>
          <div className={styles.line}></div>
          <div className={styles.content}>
            <div className={styles.date}>{item.date}</div>
            <div className={styles.title}>{item.title}</div>
            {Array.isArray(item.description) ? (
              <div className={`text-muted-foreground ${styles.description}`}>
                {item.description.map((desc, i) => (
                  <p key={i}>{desc}</p>
                ))}
              </div>
            ) : (
              <div className={`text-muted-foreground ${styles.description}`}>
                {item.description}
              </div>
            )}
          </div>
        </div>
      ))}
      <div className={styles.item}>
        <div className={styles.point}></div>
        <div className={styles.line}></div>
      </div>
    </div>
  );
};

export default VerticalTimeline;
