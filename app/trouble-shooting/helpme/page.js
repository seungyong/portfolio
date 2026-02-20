"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import articles from "./articles";
import styles from "../styles/page.module.scss";
import { ArrowLeft } from "lucide-react";

export default function HelpmePage() {
  const navigate = useRouter();

  return (
    <div className={styles.container}>
      <Link href="#" className={styles.back} onClick={() => navigate.back()}>
        <ArrowLeft className={styles.backIcon} aria-hidden />
        뒤로 가기
      </Link>
      <h1 className={styles.title}>Helpme</h1>
      <p className={styles.description}>
        Helpme 프로젝트에서 겪은 트러블 슈팅 목록입니다.
      </p>

      <ul className={styles.articleList}>
        {articles.map(({ slug, title }) => (
          <li key={slug}>
            <Link
              href={`/trouble-shooting/helpme/${slug}`}
              className={styles.card}
            >
              <span className={styles.cardTitle}>{title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
