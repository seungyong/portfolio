"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { getRelated } from "./getRelated";
import styles from "./TroubleShootingLayout.module.scss";

/**
 * 트러블 슈팅 페이지 골격 레이아웃.
 * - backHref: 메인(뒤로가기) 링크
 * - title: 페이지 제목
 * - problem, cause, solution: 각 섹션 내용 (React 노드, 이미지 포함 가능)
 * - related: 다른 트러블 슈팅 카드 목록 [{ title, href }] (수동)
 * - projectSlug + articleSlug + articles: 지정 시 같은 프로젝트 목록에서 자신을 제외해 related 자동 생성
 */
export default function TroubleShootingLayout({
  title,
  problem,
  cause,
  solution,
  related: relatedProp = [],
  projectSlug,
  articleSlug,
  articles = [],
}) {
  const navigate = useRouter();

  const related =
    projectSlug != null && articleSlug != null && articles.length > 0
      ? getRelated(articles, articleSlug, projectSlug)
      : relatedProp;
  return (
    <article className={styles.container}>
      <Link href="#" onClick={() => navigate.back()} className={styles.back}>
        <ArrowLeft className={styles.backIcon} aria-hidden />
        뒤로 가기
      </Link>

      <h1 className={styles.title}>{title}</h1>

      <section className={styles.section} aria-labelledby="problem-heading">
        <h2 id="problem-heading" className={styles.sectionTitle}>
          문제
        </h2>
        <div className={styles.sectionBody}>{problem}</div>
      </section>

      <section className={styles.section} aria-labelledby="cause-heading">
        <h2 id="cause-heading" className={styles.sectionTitle}>
          원인
        </h2>
        <div className={styles.sectionBody}>{cause}</div>
      </section>

      <section className={styles.section} aria-labelledby="solution-heading">
        <h2 id="solution-heading" className={styles.sectionTitle}>
          해결책
        </h2>
        <div className={styles.sectionBody}>{solution}</div>
      </section>

      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="related-heading">
          <h2 id="related-heading" className={styles.relatedTitle}>
            다른 트러블 슈팅
          </h2>
          <ul className={styles.cardList}>
            {related.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.card}>
                  <span className={styles.cardTitle}>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
