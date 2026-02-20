"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import articles from "./articles";
import styles from "./page.module.scss";

export default function GlobaTroubleShootingListPage() {
  const navigate = useRouter();

  return (
    <div className={styles.container}>
      <Link href="#" className={styles.back} onClick={() => navigate.back()}>
        <ArrowLeft className={styles.backIcon} aria-hidden />
        뒤로 가기
      </Link>
      <h1 className={styles.title}>Globa</h1>
      <p className={styles.description}>
        Globa 프로젝트에서 겪은 트러블 슈팅 목록입니다.
      </p>

      <ul className={styles.articleList}>
        {articles.map(({ slug, title }) => (
          <li key={slug}>
            <Link
              href={`/trouble-shooting/globa/${slug}`}
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
