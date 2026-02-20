import TroubleShootingLayout from "@/components/trouble-shooting/TroubleShootingLayout";
import CodeBlock from "@/components/trouble-shooting/CodeBlock";
import articles from "../articles";

export default function RepositoryRefactoringPage() {
  return (
    <TroubleShootingLayout
      title="유지보수의 문제"
      projectSlug="globa"
      articleSlug="repository-refactoring"
      articles={articles}
      problem={
        <>
          <p>
            2차 개발에서 Spring boot API Server 리팩토링 과정에서 Repository
            변경 시 모든 Service 단에서 코드를 수정해야 하는 문제가
            발생했습니다.
          </p>
          <p>
            또한, 비즈니스 로직을 각 Service 단에서 중복적으로 작성하여
            유지보수성이 떨어졌습니다.
          </p>
        </>
      }
      cause={
        <>
          <p>
            Jpa Repository Interface는 메소드 이름을 기준으로 작동하게 되어
            있어, Service 단에서 이를 직접 사용하는 경우 모든 Service 단에서
            코드를 수정해야 하는 문제가 발생했습니다.
          </p>
          <p>이는 이전 프로젝트의 구조입니다.</p>
          <CodeBlock
            language="plaintext"
            code={`project-root/
├── controller/
│   └── UserController.java
├── service/
│   └── UserService.java
├── repository/
│   └── UserRepository.java
├── dto/
│   └── UserDto.java
└── entity/
    └── UserEntity.java`}
          />
          <CodeBlock
            language="java"
            code={`// service/UserService.java
@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;

  public UserDto getUser(Long id) {
    return userRepository.findById(id)
      .map(UserMapper.INSTANCE::toDto)
      .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
  }
}
  
// /service/RecordService.java
@Service
@RequiredArgsConstructor
public class RecordService {
  private final RecordRepository recordRepository;

  public RecordDto getRecord(Long id) {
    // 중복 로직 발생
    User user = userRepository.findById(id)
      .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

    return recordRepository.findByUser(user)
      .map(RecordMapper.INSTANCE::toDto)
      .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_RECORD));
  }
}
`}
          />
        </>
      }
      solution={
        <>
          <p>
            Clean Architecture의 구조를 채택하여 프로젝트 구조에 맞게,
            Repository Interface와 Usecase 단을 추가해 각 레이어를 분리하여
            유지보수성을 높였습니다.
          </p>
          <ul>
            <li>
              프로젝트의 모든 구조를 바꾸기엔 시간이 너무 오래 걸리기 때문에,{" "}
              <b>Domain Entity</b>를 <b>Jpa Entity</b>와 통합하여 사용하도록
              하였습니다.
            </li>
            <li>
              모든 비즈니스 로직을 <b>Usecase</b> 단에서 처리하도록 하였습니다.
            </li>
            <li>
              <b>Usecase</b>에는 <b>Command</b> 패턴을 사용해, 각 비즈니스
              로직을 처리하도록 하였습니다.
            </li>
            <li>
              <b>Repository Interface</b>를 분리하여 추상화를 통해 각 레이어의
              의존성을 줄였습니다.
            </li>
          </ul>
          <p>예시:</p>
          <CodeBlock
            language="java"
            code={`
// domain/user/repository/UserRepository.java
public interface UserRepository {
  Optional<User> findById(Long id);
}
            `}
          />
          <CodeBlock
            language="java"
            code={`
// infrastructure/persistence/UserRepositoryImpl.java
@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {
  private final UserJpaRepository userJpaRepository;

  @Override
  public Optional<User> findById(Long id) {
    return userJpaRepository.findById(id)
      .map(UserMapper.INSTANCE::toEntity);
  }
}
            `}
          />
          <CodeBlock
            language="java"
            code={`
// infrastructure/persistence/UserJpaRepository.java
public interface UserJpaRepository extends JpaRepository<UserJpaEntity, Long> {
  Optional<UserJpaEntity> findById(Long id);
}
            `}
          />
          <hr />
          <CodeBlock
            language="java"
            code={`
// application/usecase/FindUserUseCase.java
@Component
@RequiredArgsConstructor
public class FindUserUseCase implements UseCase<Long, UserEntity> {
    private final UserRepository userRepository;

    @Override
    public UserEntity execute(Long userId) {
        UserEntity user = userRepository.getUserByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        if (user.getIsDeleted()) {
            throw new CustomException(ErrorCode.DELETED_USER);
        }

        return user;
    }
}
            `}
          />
          <CodeBlock
            language="java"
            code={`
// application/service/UserService.java
@Service
@RequiredArgsConstructor
public class UserService {
    private final FindUserUseCase findUserUseCase;

    public UserEntity findUser(Long userId) {
        return findUserUseCase.execute(userId);
    }
}
            `}
          />
          <CodeBlock
            language="java"
            code={`
// application/service/RecordService.java
@Service
@RequiredArgsConstructor
public class RecordService {
    private final FindUserUseCase findUserUseCase;
    private final FindRecordUseCase findRecordUseCase;

    public RecordEntity findRecord(Long recordId) {
        UserEntity user = findUserUseCase.execute(recordId);
        return findRecordUseCase.execute(user.getId())
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_RECORD));
    }
}
            `}
          />
        </>
      }
    />
  );
}
