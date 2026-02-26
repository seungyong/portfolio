import TroubleShootingLayout from "@/components/trouble-shooting/TroubleShootingLayout";
import articles from "../articles";
import CodeBlock from "@/components/trouble-shooting/CodeBlock";

export default function RaceConditionPage() {
  return (
    <TroubleShootingLayout
      title="동시 요청 문제"
      projectSlug="helpme"
      articleSlug="race-condition"
      articles={articles}
      problem={
        <>
          <p>
            동시에 여러 요청을 보낸 후, 각 요청에서 401 에러가 발생하면{" "}
            <b>AT 재발급 요청</b>이 여러 번 발생하였습니다.
          </p>
        </>
      }
      cause={
        <>
          <CodeBlock
            language="typescript"
            code={`
// authFallback.ts
export const authFallback = async <T>(
  error: Error,
  retryFn?: () => Promise<T>
): Promise<T | void> => {
  // error가 ApiError 인스턴스가 아니라면 예외 처리
  if (!(error instanceof ApiError)) {
    throw error;
  }

  // 401 에러: Access Token 만료
  if (error.status === 401) {
    try {
      // Access Token 재발급 요청
      const response = await fetch(
        \`\${import.meta.env.VITE_API_URL}\${APIEndpoint.TOKEN_REISSUE}\`,
        {
          credentials: "include",
          method: "POST",
        }
      );

      if (!response.ok) {
        // 재발급 실패 시 원래 에러를 throw
        throw error;
      }

      // 재발급 성공 시, 원래 요청 재시도
      if (retryFn) {
        return await retryFn();
      }

      return;
    }

    ...
  }

  ...
};
            `}
          />
          <p>
            각 요청에서 401 에러가 발생하면, AT 재발급 요청을 보낸 후 다시 API
            호출을 시도하는 로직이 있습니다.
          </p>
          <p>
            하지만, 동시에 여러 요청이 발생하면, AT 재발급 요청이 여러 번
            발생하였습니다.
          </p>
        </>
      }
      solution={
        <>
          <p>
            동시 요청 문제를 해결하기 위해, 먼저 <b>Axios Interceptor</b>를
            사용해 AT 재발급 요청을 처리하도록 하였습니다.
          </p>
          <p>
            또한, <b>요청 큐</b>를 사용해 이미 AT 재발급 요청이 진행 중이라면
            다른 요청은 대기하도록 하였습니다.
          </p>
          <CodeBlock
            language="typescript"
            code={`
// apiClient.ts
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    ...

    if (isExpiredAccessTokenError) {
      // 이미 AT 재발급 요청이 진행 중이라면 다른 요청은 대기하도록 하였습니다.
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequests.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(createApiError(err));
          });
      }

      isRefreshing = true;
      originalRequest._retry = true;

      try {
        await axios.post(API_URL + APIEndpoint.TOKEN_REISSUE, null, {
          withCredentials: true,
        });

        processQueue(null);

        return apiClient(originalRequest);
      } catch (refreshError) {
        ...
      }

      ...
    }
  }
);
            `}
          />
        </>
      }
    />
  );
}
