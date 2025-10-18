import React from "react";

import styles from "./info.module.scss";

const Info = ({ label, value, isLink = false }) => {
  return (
    <div className={styles.info}>
      <p className="text-muted-foreground">{label}</p>
      {isLink ? (
        <a
          href={`https://${value}`}
          target="_blank"
          className={`text-blue-100 underline ${styles.value}`}
          rel="noopener noreferrer"
        >
          {value}
        </a>
      ) : (
        <p className={styles.value}>{value}</p>
      )}
    </div>
  );
};

export default Info;
