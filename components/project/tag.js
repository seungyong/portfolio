import React from "react";

import styles from "./tag.module.scss";

const Tag = ({ title, isActive }) => {
  return (
    <div
      className={`${styles.tag} ${isActive ? styles.active : styles.inactive}`}
    >
      {title}
    </div>
  );
};

export default Tag;
