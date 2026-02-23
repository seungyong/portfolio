"use client";

import { Lightbulb } from "lucide-react";
import styles from "./NoteBlock.module.scss";

/**
 * Note/참고 블록. 강조하고 싶은 설명을 감싸서 표시할 때 사용
 * @param {string} [title="Note"] - 블록 제목
 * @param {React.ReactNode} children - 블록 내용
 */
export default function NoteBlock({ title = "Note", children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Lightbulb className={styles.icon} size={16} aria-hidden />
        {title}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
