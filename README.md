# Promise 설계

## 기본 로직

### 프로미스 객체 생성 시

- 프로미스 객체의 constructor는 executor(resolve, reject) 콜백함수를 인자로 받아 프로미스 인스턴스를 생성한다.
- executor 함수는 resolve, reject 콜백함수를 인자로 받는다.
- 프로미스 객체는 "state" 라는 상태를 가진다.
  - pending(default)
  - resolved(executor 함수에서 resolve 가 실행되었을 때)
  - rejected(executor 함수에서 resolve 가 실행되었을 때)
