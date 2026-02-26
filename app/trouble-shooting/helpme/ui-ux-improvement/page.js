import TroubleShootingLayout from "@/components/trouble-shooting/TroubleShootingLayout";
import articles from "../articles";
import Image from "next/image";

export default function UiUxImprovementPage() {
  return (
    <TroubleShootingLayout
      title="UI/UX 개선 문제"
      projectSlug="helpme"
      articleSlug="ui-ux-improvement"
      articles={articles}
      problem={
        <>
          <p>
            Helpme.md 프로젝트를 피드백 받으면서, Readme.md 작성 페이지에서 섹션
            드래그 앤 드롭, 섹션 추가/삭제 등 기능 버튼들이 정확히 무슨 역할인지
            모르겠다는 피드백을 받았습니다.
          </p>
        </>
      }
      cause={
        <>
          <Image
            src="/ui-ux-01.png"
            alt="UI/UX 개선 문제"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <p>
            <b>하나의 페이지</b>에서 <b>여러 기능</b>을 배치한 결과 사용자가
            어떤 버튼을 눌러야 해당 기능을 수행할 수 있는지 모호해졌습니다.
            <br />
            특히, <b>섹션 드래그 앤 드롭 기능</b>은 사용자가 알아보기
            어려웠습니다.
          </p>
        </>
      }
      solution={
        <>
          <Image
            src="/ui-ux-02.png"
            alt="UI/UX 개선 문제"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <p>
            이를 해결하기 위해서, 각 버튼들이 어떤 기능을 하는지에 대해 알려주는{" "}
            <b>가이드 라인</b>을 추가하였습니다.
          </p>
        </>
      }
    />
  );
}
