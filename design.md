# 검색 자동 완성 컴포넌트 설계

## 기본 흐름 : event => setState => 상태 변경 로직 => notify => render

## 1. 검색어 입력 컴포넌트

- 입력을 받아서 Model에 전달한다 - **setState**
- (자동완성 컴포넌트에서 입력이 있을 경우) 해당 데이터(자동완성 키워드)를 Model로부터 받아서 화면에 렌더링한다
- 검색버튼이 눌렸다는 입력을 Model에 전달한다 - **setState**

## 2. 자동완성 컴포넌트

- Model로 부터 자동완성 키워드 목록을 전달받아서 화면에 렌더링한다
- 사용자 입력(방향키 위아래)을 받아서 화면에 렌더링 한다 - self-rendering?
- 사용자 입력(엔터키)을 받아서 Model에 전달한다(selected_id) - **setState**

## 3. 최근 검색어 컴포넌트

- Model로 부터 최근 검색어 목록을 전달받아서 화면에 렌더링한다
- 사용자 입력(방향키 위아래)을 받아서 화면에 렌더링 한다 - self-rendering?
- 사용자 입력(엔터키)을 받아서 Model에 전달한다(selected_id) - **setState**

## 4. StateManager

- **보유 state** : 최근검색어 목록(객체), 검색어 입력 키워드와 매칭된 자동완성 키워드 목록 10개(객체)
- View 컴포넌트들로부터 입력을 받아서 Model에 필요한 데이터를 요청한다
- Model로부터 받은 데이터를 적절한 로직으로 가공하여 필요한 컴포넌트들에 전달한다

## 5. Model

- 모델을 별도로 둘지 stateManager와 합칠지는 구현해봐야 필요성을 알 것 같다..
- **보유 state** : 자동완성에 필요한 모든 키워드 목록(객체형태?)(음..이거 다 받아오는건 비용낭비가 심한듯?)
- 서버와의 통신을 담당한다
- StateManager의 요청을 받아서 서버에서 데이터를 꺼내준다

## 6. json data

- case1 : 알파벳 별로 파일을 따로 만든다
  - 장점 : fetch 1번의 비용이 작다
  - 단점 : request를 여러번 보내게 된다
- case2 : 전체를 파일 한개로 만들고 알파벳 별 key값으로 구분한다
  - 장점 : request를 최초 1번만 보낸다
  - 단점 : fetch 1번의 비용이 크다
- 음.. 원래는 서버에서 데이터를 필터링해서 필요한 데이터만 보내주는것 같은데.. 어떻게 구현하는게 좋을까

## draft code

```javascript
class Search {
  constructor(stateManager) {
    this.stateManager = stateManager;
  }
  init() {
    this.subscribe(this.stateManager);
  }
  addKeydownEvent(el, input, delay) {
    el.addEventListener("keydown", () => {
      setTimeout(() => this.stateManager.setState(), delay);
    });
  }
  render(props) {
    //value에 props입력하는 로직
    //또는 value가 입력된 DOM자체를 그리는 로직(diff비교 필요)
  }
}

class AutoComplete {
  constructor(stateManager) {
    this.stateManager = stateManager;
  }
  init() {
    this.subscribe(this.stateManager);
  }
  handleEnterKeyEvent({ key }) {
    if (key === "Enter") {
      //some logic here
      this.stateManager.setState({ selected_id });
    }
  }
  addEnterKeyEvent(el) {
    el.addEventListener("keydown", this.handelEnterKeyEvent.bind(this));
  }
  render(props) {
    //
  }
}

class RecentKeywords {}

class StateManager {
  constructor() {
    this.subscribers = {};
    this.state = {};
  }
  setState(data) {
    this.notify();
  }

  notify(name, props) {
    this.subscribers[name].render(props);
  }
}

class Model {
  getJson(url) {
    const data = fetch(url).then(res => res.json());
  }
}
```

모르겠다 나머지는 구현하면서 다시 고민해보자
