import TroubleShootingLayout from "@/components/trouble-shooting/TroubleShootingLayout";
import articles from "../articles";
import Image from "next/image";
import CodeBlock from "@/components/trouble-shooting/CodeBlock";

export default function ServerDownPage() {
  return (
    <TroubleShootingLayout
      title="서버 다운 문제"
      projectSlug="helpme"
      articleSlug="server-down"
      articles={articles}
      problem={
        <>
          <Image
            src="/server-down-01.png"
            alt="서버 다운 문제"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "80%", height: "auto", justifySelf: "center" }}
          />
          <p>어느 날 갑자기 Helpme 프로젝트가 서버 다운되었습니다.</p>
        </>
      }
      cause={
        <>
          <p>
            왜 서버가 다운되었고, 무슨 문제인지 확인하기 위해 <b>SSH</b>를
            연결하였지만 연결되지 않았습니다.
            <br />
            이런 상황이라면 완전히 서버 컴퓨터가 다운되거나, 멈춰있는 상황이라고
            판단하였습니다.
            <br />
            먼저 <b>재부팅</b>을 시도하였지만, 약 10분이 지나도 서버가 켜지지
            않았습니다.
            <br />왜 재부팅되지 않는지를 확인하기 위해, 네이버에서 제공하는{" "}
            <b>서버 모니터링</b>을 통해 서버 로그를 확인하였습니다.
          </p>
          <br />
          <Image
            src="/server-down-02.png"
            alt="서버 다운 문제"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "80%", height: "auto", justifySelf: "center" }}
          />
          <p>
            서버 로그를 확인하니, <code>/dev/vda</code>의 섹터를 읽지 못하고
            있었고, 이는 모종의 이유로 <b>섹터</b>가 손상되었을 수 있다고
            판단하였습니다.
          </p>
          <br />
          <Image
            src="/server-down-03.png"
            alt="서버 다운 문제"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <Image
            src="/server-down-04.png"
            alt="서버 다운 문제"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <p>
            왜 재부팅이 되지 않은지 확인하기 위해, 오류가 발생한 이미지의{" "}
            <b>스냅샷</b>을 생성하였습니다.
          </p>
          <br />
          <Image
            src="/server-down-05.png"
            alt="서버 다운 문제"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <p>또한, 새로운 인스턴스를 만들어 스냅샷을 연결하였습니다.</p>
          <br />
          <Image
            src="/server-down-06.png"
            alt="서버 다운 문제"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "40%", height: "auto", justifySelf: "center" }}
          />
          <p>
            이제 새로 생성한 인스턴스에 접속하여, 이미지가 정상적으로
            연결되었는지 확인하였고, <code>/dev/vdb2</code> 디스크가 정상적으로
            연결되었습니다.
          </p>
          <br />
          <CodeBlock
            language="bash"
            code={`
# 디스크의 UUID와 파일 시스템 타입을 확인하기 위해 blkid 명령어를 사용하였습니다. (ext4 파일 시스템을 사용하고 있습니다.)
sudo blkid

# 디스크의 오류를 강제로 체크하고 수리합니다. (마운트 전 반드시 수행해야 합니다.)
sudo e2fsck -f /dev/vdb2

# 디스크의 고유 ID를 바꿉니다. (원본 디스크 ID 충돌을 방지하기 위해 사용)
sudo tune2fs -U "<새로운 UUID>" /dev/vdb2

# 오류가 발생한 디스크를 /mnt/recovery 디렉토리에 마운트합니다.
sudo mount /dev/vdb2 /mnt/recovery
            `}
          />
          <Image
            src="/server-down-07.png"
            alt="서버 다운 문제"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <p>
            위와 같은 과정을 통해, 오류가 발생한 디스크를 수리하고, 정상적으로{" "}
            <code>/mnt/recovery</code> 디렉토리에 마운트하였습니다.
          </p>
          <br />
          <Image
            src="/server-down-08.png"
            alt="서버 다운 문제"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <p>
            먼저, Docker에서 실행되고 있는 <b>helpme.md</b>의{" "}
            <b>springboot 애플리케이션</b>의 로그를 확인하였고, 마지막까지
            정상적으로 실행되었음을 확인하였습니다.
          </p>
          <br />
          <Image
            src="/server-down-09.png"
            alt="서버 다운 문제"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <p>
            그 다음, <b>시스템 로그</b>를 확인하였고, 마지막까지 정상적으로
            실행되었음을 확인하였습니다.
          </p>
          <br />
          <Image
            src="/server-down-10.png"
            alt="서버 다운 문제"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <p>
            마지막으로, <b>커널 로그</b>를 확인하였고, 마지막까지 정상적으로
            실행되었음을 확인하였습니다.
          </p>
          <br />
          <p>
            이로 인해, Springboot 애플리케이션과 서버 자체에서는 문제가 없었음을
            확인하였습니다.
          </p>
        </>
      }
      solution={
        <>
          <Image
            src="/server-down-11.png"
            alt="서버 다운 문제"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <p>
            위 과정을 통해 네이버 자체에 문제가 있었음을 판단하고, Naver Cloud
            Platform 공지사항을 확인하였습니다.
            <br />
            공지사항을 보니, <b>Block Storage</b> 서비스 장애가 발생하여, 서버
            다운 문제가 발생했음을 확인하였습니다.
            <br />
            문제가 발생하면 무조건 내 잘못이라고 생각하지 말고, 공지사항 등을
            확인해 전체적인 시스템 문제인지 확인하는 과정이 필요하다고
            생각했습니다.
          </p>
          <p>
            잠시 후, 서버 재부팅을 시도하였고, 정상적으로 서버가
            재부팅되었습니다.
          </p>
          <br />
          <Image
            src="/server-down-12.png"
            alt="서버 다운 문제"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <p>
            이렇게 서버 모니터링의 중요함을 깨닫고, 슬랙을 통해{" "}
            <b>모니터링 채널</b>을 만들어 문제가 발생하면 즉시 알림을 받을 수
            있도록 설정하였습니다.
          </p>
        </>
      }
    />
  );
}
