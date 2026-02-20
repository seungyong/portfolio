import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import projects from "./projects";
import styles from "./page.module.scss";

export default function TroubleShootingListPage() {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.back}>
        <ArrowLeft className={styles.backIcon} aria-hidden />
        메인으로
      </Link>
      <h1 className={styles.title}>트러블 슈팅</h1>
      <p className={styles.description}>
        프로젝트를 선택하면 해당 프로젝트의 트러블 슈팅 목록을 볼 수 있습니다.
      </p>

      <ul className={styles.projectList}>
        {projects.map(({ projectSlug, projectTitle }) => (
          <li key={projectSlug}>
            <Link
              href={`/trouble-shooting/${projectSlug}`}
              className={styles.card}
            >
              <span className={styles.cardTitle}>{projectTitle}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
