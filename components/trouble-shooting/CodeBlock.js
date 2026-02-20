"use client";

import { useMemo } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

import styles from "./CodeBlock.module.scss";

/**
 * highlight.js 기반 코드 블록
 * @param {string} code - 코드 문자열
 * @param {string} [language="plaintext"] - 언어 (java, javascript, plaintext 등)
 */
export default function CodeBlock({ code, language = "plaintext" }) {
  const highlighted = useMemo(() => {
    try {
      return hljs.highlight(code.trim(), { language }).value;
    } catch {
      return hljs.highlight(code.trim(), { language: "plaintext" }).value;
    }
  }, [code, language]);

  return (
    <div className={styles.wrapper}>
      <pre className={styles.pre}>
        <code
          className={`hljs ${styles.code}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
}
