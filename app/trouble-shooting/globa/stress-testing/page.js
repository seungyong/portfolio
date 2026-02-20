import TroubleShootingLayout from "@/components/trouble-shooting/TroubleShootingLayout";
import articles from "../articles";
import Image from "next/image";
import CodeBlock from "@/components/trouble-shooting/CodeBlock";

export default function StressTestingPage() {
  return (
    <TroubleShootingLayout
      title="부하 테스트"
      projectSlug="globa"
      articleSlug="stress-testing"
      articles={articles}
      problem={
        <>
          <p>
            Jmeter를 통해 50명의 유저가 1초마다 100번의 요청을 보내는 스트레스
            테스트를 진행하였습니다.
          </p>
          <p>
            스트레스 테스트 결과, 초반에는 처리량이 높았지만, 시간이 지나면서
            처리량이 점점 감소하면서 오류가 발생한 요청이 생겼습니다.
          </p>
          <Image
            src="/stress-test.png"
            alt="부하 테스트 결과"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <Image
            src="/throughput.png"
            alt="처리량"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </>
      }
      cause={
        <>
          <p>
            처리량이 감소하는 이유를 찾고, 오류율 0%를 만들기 위해 다음 3가지
            방법을 시도하였습니다.
          </p>
          <ul>
            <li>CloudWatch 확인</li>
            <li>Server Log 확인</li>
            <li>로컬과의 비교교</li>
          </ul>
        </>
      }
      solution={
        <>
          <div>
            <b>1. CloudWatch 확인</b>
            <Image
              src="/cloudwatch.png"
              alt="CloudWatch"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "40%", height: "auto", justifySelf: "center" }}
            />
            <p>
              부하 테스트가 진행된 15시에는 <b>75.4%</b>의 메모리 사용률이
              보였습니다. 하지만, 그 이후 메모리 사용률이 계속 증가하여{" "}
              <b>80%</b>까지 증가하여 메모리 누수 발생 문제가 있을 수 있습니다.
            </p>
            <br />
            <Image
              src="/visualvm.png"
              alt="VisualVm"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "40%", height: "auto", justifySelf: "center" }}
            />
            <p>
              메모리 누수 문제를 확인하기 위해, VisualVm을 통해 JVM의 힙 메모리
              사용량을 확인하고, 부하 테스트를 다시 진행하였습니다.
              <br />
              부하 테스트를 다시 진행하였지만, GC가 동작하여{" "}
              <b>정상적인 메모리 사용 패턴</b>
              이 보였습니다.
              <br />
              따라서, 메모리 누수 문제는 아니라고 판단하였습니다.
            </p>
            <hr />
            <b>2. Server Log 확인</b>
            <Image
              src="/nginx-log.png"
              alt="Nginx Log"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "80%", height: "auto", justifySelf: "center" }}
            />
            <p>
              Nginx Error Log를 통해 요청이 무엇 떄문에 실패했는지
              확인하였습니다. 그 결과, <b>time out</b> 오류가 발생하였습니다.
            </p>
            <br />
            <Image
              src="/server-log.png"
              alt="Server Log"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "80%", height: "auto", justifySelf: "center" }}
            />
            <p>
              그렇다면, API 응답 시간은 어느 정도 소요되었는지 확인하였습니다.
              <br />
              기본적으로 290ms ~ 400ms 정도의 시간이 소요되었습니다.
            </p>
            <br />
            <CodeBlock
              code={`
                2025-09-20T19:24:00.873+09:00 INFO 33784 --- [Globa] [.0-8080-exec-35] o.y.g.c.filter.RequestLoggingFilter : [b14a7c56] GET /user - IP: 127.0.0.1
- Device: Desktop - Status: 200 - Duration: 326ms 2025-09-20T19:24:00.878+09:00 INFO 33784 --- 
[Globa] [.0-8080-exec-26] o.y.g.c.filter.RequestLoggingFilter : [af6af8e1] GET /user - IP: 127.0.0.1 - Device: Desktop - Status: 200 - Duration: 463ms 

Hibernate: select ue1_0.user_id, ue1_0.code, ue1_0.created_time, ue1_0.deleted_time, ue1_0.event_nofi, ue1_0.is_deleted, ue1_0.name,
ue1_0.notification_token, ue1_0.notification_token_time, ue1_0.primary_nofi, ue1_0.profile_path, ue1_0.profile_size, ue1_0.profile_type, ue1_0.share_nofi,
ue1_0.sns_id, ue1_0.sns_kind, ue1_0.upload_nofi from app_user ue1_0 where ue1_0.user_id=?
              `}
            />
            <CodeBlock
              code={`
@Cacheable(
  value = "user",
  key = "#userId",
  condition = "#userId != null",
  unless = "#result == null"
)
public ResponseUserDto getUser(Long userId) {
  ...
}
                `}
              language="java"
            />
            <p>
              또한, Log에서 캐싱되어야 할 데이터가 캐싱되지 않아
              데이터베이스에서 조회하는 시간이 발생하였습니다.
            </p>
            <br />
            <CodeBlock
              code={`
private Authentication getAuthentication(String accessToken) {
  Long userId = provider.getUserIdByAccessToken(accessToken);
  UserEntity user = findUserUseCase.execute(userId);
  CustomUserDetails customUser = new CustomUserDetails(
          user.getUserId(),
          user.getName(),
          user.getNotificationToken()
          userId
  );
    
    // 프로덕션에서는 삭제 필요
  log.info("Authenticated token: {}", accessToken);

  return new UsernamePasswordAuthenticationToken(customUser, null, customUser.getAuthorities());
}
              `}
              language="java"
            />
            <p>
              그 문제는 JWT 토큰을 통해 사용자 정보를 조회하는 과정에서
              발생하였습니다.
            </p>
            <p>
              하지만, JWT는 <b>Stateless</b> 토큰이기 때문에 매번 DB에서
              조회하는 것은 비효율적입니다.
              <br />
              또한, 중요한 권한 검증인 경우 <b>Usecase</b> 단에서 처리하도록
              하였기 때문에 불필요한 조회라고 생각되어 제거하였습니다.
            </p>
          </div>
          <hr />
          <b>3. 로컬과의 비교</b>
          <Image
            src="/jmeter-local.png"
            alt="Jmeter Local"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto", justifySelf: "center" }}
          />
          <p>
            로컬에서 부하 테스트를 진행하였을 때는 준수한 성능을 보였습니다.
          </p>
          <br />
          <Image
            src="/jmeter-error.png"
            alt="Jmeter Error"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto", justifySelf: "center" }}
          />
          <p>
            실패 케이스를 보는 도중, 도메인을 접속하는 데 <b>time out</b> 오류가
            발생하였습니다.
            <br />
            이는 도메인 접속 시간이 길어지는 것을 의미하며, 이는 네트워크 문제로
            인해 발생한 것으로 판단됩니다. 또한, 2번에서 확인한 바와 같이
            Gateway Timeout이 발생하는 것을 확인할 수 있습니다.
          </p>
          <p>
            이를 해결하고자 무료 DNS 서비스인 DuckDNS에서 <b>가비아 도메인</b>을
            결제하여 도메인을 변경하였습니다. Region 간의{" "}
            <b>네트워크 경유 소요 시간</b>이 길었기 때문에 다음 Region들을{" "}
            <b>서울</b>로 변경하였습니다.
          </p>
          <ul>
            <li>AWS EC2</li>
            <li>AWS RDS</li>
            <li>Redis Cloud &rarr; Elasticache 이전</li>
            <li>AWS SQS</li>
          </ul>
          <hr />
          <b>결과</b>
          <Image
            src="/jmeter-result.png"
            alt="Jmeter Result"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "80%", height: "auto", justifySelf: "center" }}
          />
          <Image
            src="/throughput-result.png"
            alt="Throughput Result"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "80%", height: "auto", justifySelf: "center" }}
          />
          <br />
          <p>
            위 3가지 방법을 제외하고, 여러 테스트를 진행하였으며, 쿼리 최적화
            등을 수행했습니다.
          </p>
          <table className="w-full">
            <thead>
              <tr>
                <th>환경</th>
                <th>
                  Cache Hit
                  <br />
                  (Spring)
                </th>
                <th>
                  Cache Hit
                  <br />
                  (Postman)
                </th>
                <th>
                  Cache No Hit
                  <br />
                  (Spring)
                </th>
                <th>
                  Cache No Hit
                  <br />
                  (Postman)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>EC2 (Sydney)</td>
                <td>199ms</td>
                <td>337ms</td>
                <td>595ms</td>
                <td>734ms</td>
              </tr>
              <tr>
                <td>EC2 (Seoul)</td>
                <td>188ms</td>
                <td>198ms</td>
                <td>558ms</td>
                <td>567ms</td>
              </tr>
              <tr>
                <td>DNS 변경 + EC2 (Seoul)</td>
                <td>185ms</td>
                <td>249ms</td>
                <td>558ms</td>
                <td>593ms</td>
              </tr>
              <tr>
                <td>DNS 변경 + EC2 (Seoul) + Query 개선</td>
                <td>195ms</td>
                <td>249ms</td>
                <td>417ms</td>
                <td>441ms</td>
              </tr>
              <tr>
                <td>DNS 변경 + Medium EC2 (Seoul) + Query 개선</td>
                <td>183ms</td>
                <td>210ms</td>
                <td>379ms</td>
                <td>393ms</td>
              </tr>
              <tr>
                <td>
                  DNS 변경 + Medium EC2 (Seoul) + Query 개선 + Local Redis
                </td>
                <td>12ms</td>
                <td>22ms</td>
                <td>14ms</td>
                <td>35ms</td>
              </tr>
              <tr>
                <td>
                  DNS 변경 + Medium EC2 (Seoul) + Query 개선 + ElastiCache
                </td>
                <td>8ms</td>
                <td>17ms</td>
                <td>18ms</td>
                <td>27ms</td>
              </tr>
              <tr>
                <td>
                  <b>최종 개선율</b>
                </td>
                <td>
                  <b>94.0% ↑</b>
                </td>
                <td>
                  <b>93.5% ↑</b>
                </td>
                <td>
                  <b>97.6% ↑</b>
                </td>
                <td>
                  <b>95.2% ↑</b>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      }
    />
  );
}
