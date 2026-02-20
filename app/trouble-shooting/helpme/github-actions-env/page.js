import TroubleShootingLayout from "@/components/trouble-shooting/TroubleShootingLayout";
import articles from "../articles";
import CodeBlock from "@/components/trouble-shooting/CodeBlock";

export default function GithubActionsEnvPage() {
  return (
    <TroubleShootingLayout
      title="Github Actions 환경 변수 적용 문제"
      projectSlug="helpme"
      articleSlug="github-actions-env"
      articles={articles}
      problem={
        <>
          <p>
            Github Actions를 통해 CI/CD 파이프라인 구축 중 환경 변수가 적용되지
            않는 문제가 발생하였습니다.
            <br />
            환경 변수가 적용되지 않아 <code>Docker Compose</code> 실행 시 환경
            변수가 없어 애플리케이션이 실행되지 않는 문제가 발생하였습니다.
          </p>
        </>
      }
      cause={
        <>
          <p>
            환경 변수 설정 방법이 잘못되어 환경 변수가 적용되지 않았습니다.
            <br />
            <code>application.properties</code> 파일에 환경 변수를 설정하는
            방법이 잘못되어 환경 변수가 적용되지 않았습니다.
          </p>
          <CodeBlock
            language="properties"
            code={`
              # application.properties
spring.profiles.active=dev              
            `}
          />
          <CodeBlock
            language="properties"
            code={`
              # application-dev.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/helpme
spring.datasource.username=postgres
spring.datasource.password=password
...
            `}
          />
          <CodeBlock
            language="plaintext"
            code={`
            # .dockerignore
application-dev.properties
...
            `}
          />
          <p>
            이렇게 설정하면 빌드 파일 안에{" "}
            <code>application-dev.properties</code>를 제외하고 빌드하게 되면서,
            환경 변수가 적용되지 않는 문제가 발생하였습니다.
            <br />
            또한, <code>application-dev.properties</code> 파일이 Docker Image
            안에 포함되어 있으면 <b>보안 문제</b>가 발생할 수 있습니다.
            <br />
            따라서, Docker Image 안에 환경 변수 관련 파일이 포함되어 있지 않도록
            설정하는 것이 중요합니다.
          </p>
        </>
      }
      solution={
        <>
          <CodeBlock
            language="properties"
            code={`
              # application.properties
spring.datasource.url=\${DB_URL}
spring.datasource.username=\${DB_USERNAME}
spring.datasource.password=\${DB_PASSWORD}
            `}
          />
          <p>
            <code>application.properties</code> 파일에 환경 변수를 설정하는
            방법을 수정하여, <code>.env</code> 파일에서 환경 변수를 가져와
            사용하도록 변경하였습니다.
          </p>
          <br />
          <CodeBlock
            language="dockerfile"
            code={`
              # Dockerfile
...
COPY src/main/resources/application.properties /app/application.properties
...
            `}
          />
          <p>
            Dockerfile에서 <code>application.properties</code> 파일을 Docker
            Image 안에 포함할 수 있게 설정합니다.
          </p>
          <br />
          <CodeBlock
            language="yaml"
            code={`
              # .github/workflows/build.yml
docker-push:
  if: github.event_name == 'push'
  runs-on: ubuntu-latest
  needs: build
  outputs:
    image_tag: \${{ steps.vars.outputs.image_tag }}
  steps:
    ...
    - name: Create application.properties
      env:
        APPLICATION_SECRET: \${{ secrets.APPLICATION }}
      run: |
        mkdir -p src/main/resources
        echo "$APPLICATION_SECRET" > src/main/resources/application.properties
        ls -l src/main/resources/
    ...
            `}
          />
          <p>
            <b>Github Actions</b>는 github 안에 있는 코드를 참조해서 만들어지기
            떄문에, <code>application.properties</code> 내용을 알 수가 없습니다.
            (대부분 <code>.gitignore</code> 파일에 추가되어 있습니다.) <br />
            그렇기에, <code>.github/workflows/build.yml</code> 파일에서{" "}
            <b>Github Secrets</b>을 통해 <code>application.properties</code>{" "}
            파일을 생성하게 하였습니다. <br />
            이렇게 함으로써, 빌드 파일 안에 <code>
              application.properties
            </code>{" "}
            파일이 생성되고, 변수를 통해 값을 지정할 수 있게 됩니다. <br />
            이러한 작업은 Github 저장소에 <code>
              application.properties
            </code>{" "}
            파일을 추가하는 것을 대체하며, 변수를 사용함으로써, Docker Image
            안에 환경 변수 값이 포함되지 않아 보안 문제가 발생할 수 있는 것을
            방지할 수 있습니다.
          </p>
          <br />
          <CodeBlock
            language="yaml"
            code={`
              # .github/workflows/build.yml
...
- name: Build and push Docker image
  uses: docker/build-push-action@v6
  with:
  context: .
  file: ./Dockerfile
  push: true
  tags: |
    \${{ secrets.DOCKERHUB_REPOSITORY }}:\${{ steps.vars.outputs.image_tag }}
    \${{ secrets.DOCKERHUB_REPOSITORY }}:latest
            `}
          />

          <p>
            <code>Build and push Docker image</code> 단계에서{" "}
            <code>Dockerfile</code>에 설정하고,{" "}
            <code>Create application.properties</code> 단계에서 생성한{" "}
            <code>application.properties</code> 파일을 Docker Image 안에
            포함하게 됩니다.
          </p>
          <br />
          <CodeBlock
            language="plaintext"
            code={`
              # .env
DB_URL=jdbc:postgresql://localhost:5432/helpme
DB_USERNAME=postgres
DB_PASSWORD=password
            `}
          />
          <p>
            서버 컴퓨터에서는 <code>.env</code> 파일을 생성하여 환경 변수를
            설정하고, 환경 변수를 사용하도록 설정하였습니다.
          </p>
        </>
      }
    />
  );
}
