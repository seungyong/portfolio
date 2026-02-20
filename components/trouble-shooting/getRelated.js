/**
 * 같은 프로젝트 내 자신을 제외한 트러블 슈팅 목록을 반환합니다.
 * @param {Array<{ slug: string, title: string }>} articles - 프로젝트 트러블 슈팅 목록
 * @param {string} currentSlug - 현재 글 slug
 * @param {string} projectSlug - 프로젝트 slug (URL 경로용)
 * @returns {Array<{ title: string, href: string }>}
 */
export function getRelated(articles, currentSlug, projectSlug) {
  return articles
    .filter((a) => a.slug !== currentSlug)
    .map((a) => ({
      title: a.title,
      href: `/trouble-shooting/${projectSlug}/${a.slug}`,
    }));
}
