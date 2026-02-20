import TroubleShootingLayout from "@/components/trouble-shooting/TroubleShootingLayout";
import articles from "../articles";

export default function KafkaPage() {
  return (
    <TroubleShootingLayout
      title="Kafka 하드웨어 제약"
      projectSlug="globa"
      articleSlug="kafka"
      articles={articles}
      problem={
        <>
          <p>
            1차 개발 당시, Spring Boot API Server와 Whisper, GPT API, Kiwi 등
            고비용 작업들을 처리하는 Python 서버 간의 통신 및 공부 목적으로
            Kafka를 사용하였습니다.
          </p>
          <p>
            하지만, 2차 개발 당시, Kafka를 사용함에 따라, AWS EC2에서는{" "}
            <b>메모리 부족 문제</b>로 Kafka가 종료되는 문제가 발생했습니다.
          </p>
        </>
      }
      cause={
        <>
          <p>
            AWS EC2 무료 티어는 <b>1GB</b> 메모리 제한이 있어, Kafka를 사용함에
            따라 메모리 부족 문제가 발생했습니다.
          </p>
          <p>
            또한, Kafka는 메모리 사용량이 많은 프로세스이기 때문에, EC2 무료
            티어에서는 사용할 수 없습니다.
          </p>
        </>
      }
      solution={
        <>
          <p>
            하드웨어 제약을 벗어나고, 두 서버 간의 통신을 위해 사용할 수 있는
            방법을 찾아야 했습니다.
          </p>
          <p>
            그 중 다음과 같은 방법을 찾아보았고, 각 방벙의 가능 여부를
            확인하였습니다.
          </p>
          <table>
            <thead>
              <tr>
                <th>종류</th>
                <th>교체 비용</th>
                <th>장점</th>
                <th>단점</th>
                <th>하드웨어 제약</th>
                <th>가능 여부</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Database</td>
                <td>
                  <ul>
                    <li>중복 메시지 방지</li>
                    <li>DLQ 구현</li>
                    <li>Backoff 기능 구현</li>
                    <li>DB 장애 시 메시지 손실 방지</li>
                  </ul>
                </td>
                <td>프리티어 무료</td>
                <td>
                  메시지 특성상 데이터가 많으며, 지속적인 조회로 인해, API
                  서버의 성능 저하 우려
                </td>
                <td>없음 (사용자가 많지 않은 가정 하에)</td>
                <td>가능</td>
              </tr>
              <tr>
                <td>RabbitMQ</td>
                <td>
                  <ul>
                    <li>새로운 메시지 큐 시스템 도입으로 인해 러닝커브 발생</li>
                  </ul>
                </td>
                <td>DLX, 메시지 보장 등 신뢰있는 메시지 큐 시스템</td>
                <td>프리티어에서는 구동하기 어려운 메모리 사용량</td>
                <td>있음</td>
                <td>불가능</td>
              </tr>
              <tr>
                <td>Redis Pub/Sub</td>
                <td>
                  <ul>
                    <li>메시지 유실 가능성</li>
                    <li>DLQ 구현</li>
                    <li>Backoff 기능 구현</li>
                    <li>ACK 기능 구현</li>
                  </ul>
                </td>
                <td>
                  JWT RTR 기법 및 캐싱 기능 구현을 위해 사용하고 있어, 통합 사용
                  가능
                </td>
                <td>
                  Redis 메모리 사용량이 많을 뿐더러, 구현해야할 기능이 많음
                </td>
                <td>없음 (사용자가 많지 않은 가정 하에)</td>
                <td>가능</td>
              </tr>
              <tr style={{ backgroundColor: "#1563d7", color: "white" }}>
                <td>AWS SQS</td>
                <td>
                  <ul>
                    <li>Backoff 기능 구현</li>
                    <li>Visibility 갱신 구현</li>
                  </ul>
                </td>
                <td>하드웨어 제약이 없고, 프리티어에서는 하루 100만건 무료</td>
                <td>Visibility 갱신 구현이 복잡함</td>
                <td>없음</td>
                <td>가능</td>
              </tr>
            </tbody>
          </table>
          <p>
            위 4가지 방법 중 하드웨어 제약을 받지 않으며, 교체 비용이 적은{" "}
            <b>AWS SQS</b>를 선택하였습니다.
          </p>
        </>
      }
    />
  );
}
