[기획서](https://docs.google.com/presentation/d/1E0HUKbGFaGpGIyZFbQ5iyX-egynVwXqfGqwl42VE1g4/edit#slide=id.g5469229b45_0_0)
[구 아마존 페이지](https://web.archive.org/web/20180717213726/amazon.com/amazonprime)

# 2주차 CardUI-OOP&Animation

## 200210 월요일 수업

arry like type
from

$0.innerHTML
$0.parentElement

let [left, right] = document.querySelectorAll("button");

right.addEventListener("click", ()=> {
 console.log("오른쪽 클릭!");
});

click, mousemove, ...

window.addEventListener("resize", ()=> {
 console.log("오른쪽 클릭!");
});

interval 고려


### test code
```javascript
let [left, right] = document.querySelectorAll("button")

left.addEventListener("mousedown", ()=> {
 console.log("왼쪽 클릭!");
});

let move = document.querySelector(".main-image-child")

// move.style.transform = "translateX(-800px)"

right.addEventListener("mousedown", ()=> {
move.style.transform = "translateX(-800px)";
});
```

### master code
```javascript
let [left, right] = document.querySelectorAll("button");
right.addEventListener("mousedown", (e)=> {
    //const viewerEl = document.querySelector(".viewer > .img-section")
    const ul = e.target.previousElementSibling.firstElementChild;
    ul.style.marginLeft = "-800px";
});
```



## 200204 금요일 수업

- 리팩토링의 핵심은 중복을 제거하는 것부터 시작 (중복이 보이면 리팩토링을 시작하라)
- 언제나 변경을 예상할 것 (확장 가능성)
- Carousel.js 한 덩어리 VS. 잘개 쪼개기  

- 객체간 협력
  - 의존관계 줄이기
    ```javascript
    class Carousel { 
        constructor({AFTER_MOVE}) {
            this.AFTER_MOVE_LIST = AFTER_MOVE;
        }
        move_right() {
            moveRight();    // 실제 이동
            const nextPanelNumber = 3;
            this.AFTER_MOVE_LIST.forEach( object => {
                object.map.setNextNumber(nextPanelNumber);  // map?
            })
        }
    }

    // Carousel 객체에 생성자로 object(instance)를
    class Paging {
        setNextNumber(nextPanelNumber) {
            // 다음 패이지
        }
    }
    class CardNavigator {
        setNextNumber(nextPanelNumber) {
            // 다음 카드 하이라이트
        }
    }
    new Carousel({
        AFTER_MOVE : [Paging, CardNavigator]
    })

    // Carousel 객체에 생성자로 function 을
    new Carousel({
        AFTER_MOVE : function() {
            Paging.setNextNumber(nextPanelNumber);
            CardNavigator.setNextNumber(nextPanelNumber);
        }
    })

    // 외부와 결합
    const carousel = new Carousel();
    carousel.joinObjWithHooks({
        AFTER_MOVE: function() {...}
    })

    // 일급객체를 활용한 의존성 줄이기
    function a(fun) {
        return fun;     // return b(); 이런식으로 불러오지 말 것
    }

    function b() {...}

    a(b);
    ```

- 모듈 패턴 
  - 함수를 이용해서 private과 public을 나눔. 
  - 함수로 함수를 감싸서 내장함수로 만들고 외부에서 접근은 closer로.   


- 상속 : 재사용 패턴
  - 연속해서 상속하다 보면 복잡하고 알아보기 힘들어 진다는 단점이 있음
  - proto type chain?
  - 다중 상속?

- transform
  - 다시 paint 하는 것이 아니라 composition(GPU만 사용, CPU x)
    - GPU 가속
    - rendering engine
  - 별도의 layer를 사용

- 캔버스 (속도가 빠름. 게임에 필수?)
- keyframe layer..(패턴 애니메이션 구현)?, border-radius : css만으로 할 수 있음

 - 변수의 유효 scope를 항상 줄이자
   - 클래스의 메소드 안에서만 사용하는 경우 굳이 this.을 사용하지 말자


### 코드 리뷰
- data attribute

- 의도가 들어나도록 이름 짜기

- 생성자가 많아질것 같으면 **객체**로 받을 것 (장점 : **key**와 **value**가 있으니까 순서가 달라도 됨)

- 인자 순서 같은건 같은 일관성을 가져야 함. 비슷한 함수는 비슷하게 동작해야 함.

  


# NOTE
- mock data?

- render? 화면 그리는 거?

- prototype, this, bind, call

- solid 결합?

- 모바일에서..?

- request animation prame?

- 굳이 클래스를 두개로 해야했을까?

- translate 값을 img-parent의 height를 불러오거나 해볼 것

- scale 값을 menu-list의 width와 margin을 이용해서 계산해볼 것

- 브라우저 관련은 네이버 데뷰 영상이 좋음

  


# 데모 페이지 만들기
- _config.yml 파일 만들기 
    ```yml
    title                    : ""
    name                     : ""
    description              : ""
    url                      : "https://sally4405.github.io/demoPage"
    baseurl                  : 
    ```
- GitHub > repository > setting > GitHub Pages > Source > master branch
- 각 디렉토리 안에 있는 html에 접근 하는 경우
  
  - https://sally4405.github.io/demoPage/(디렉토리 이름)/(파일이름.html)
  
    


# 3주차 CardUI-FETCHING

## 200217 월요일 수업

- Fetch

  - XHR : 전통적인 

  ```javascript
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {
      console.log(response);
      return response.json()
  }).then(json => console.log(json))
  console.log("이거 먼저 출력됨");
  
  // fetch() -> then(콜백 등록) -> then(콜백 등록) -> "이거 먼저 출력됨"
  // http 요청 -> 응답 -> 콜백 실행 -> 반환 -> 콜백 실행
  // 반환값들이 promise 라 chaining 가능?
  
  //jsonplaceholder에 요청을 보내고, 결과를 받을 '때' '콜백함수'를 실행.
  //요청('jsonplace...').그때(실행할함수).그리고(더처리해야할함수)
  ```

  ```javascript
  function fetchData(url) {
  	fetch(url).then()
  }
  ```

- local 서버 띄워놓고 할 것. npm에서 다운 받을 수 있음?

  - `fetch("http://localhost:8080/data/data.json")`
  - data 는 mock data
  - 데이터를 아마존 페이지에서 패치 요청해서 가져오는 것임

### 이번주 학습 목표

- 동기 / 비동기
- Fetch 요청 방법
- json 방법 (jsonplaceholder)
- option) promise 패턴
- 콜 스택, 실행 컨텍스트?

### 코드 리뷰

- default 값을 만들어두면 좋음 (Object.assign 메서드를 활용해 볼 것)
- DOM caches (반복적으로 사용되는 코드들 기억, dom에 접근을 최소화)
- 범용 유틸리티를 만들려고 할 것 (현재 서비스 뿐만 아니라 다른 서비스에서도 사용할 수 있도록)

```javascript
//객체리터럴로 만든 유틸리티
//객체리터럴로 쓴 이유는 namespace! 
//singleton pattern 을 쓸 필요 없는 이유(?)
const hoo = {
	d0m : {
    $$() {
      
    },
    $() {
      
    } 
  }
  style : {
  	setcss() {},
		setTransition() {}
	}
}
h$.style.setcss();
```

- setting -> config
- DOM API 를 직접 조작하는 것이 성능이 좋기는 하지만?
  -  string을 조작하는 방법 (template literal을 사용하는 방법)

- 실전에서 $ 표시를 쓰면 jQuery랑 착각하고 충돌 일어남.

```javascript
function a() {
	b(1);
	middle("ADD_VALUE", 1)
}

function middle(type, value) {
	// switch() {
	// 	case "ADD_VALUE": b(value)
	// }
	if/else()
}

function b(n) {
	consol.log(n);
}
```



## 200220 금요일 수업

- 공식사이트부터 볼 것 (서론과 요약이라도) 하지만 너무 어려우면 쉬운 한글 블로그부터 봐도 무관
- 언제나 실습을 병행해서 할 것!

- Fetch API
  - js 스펙은 아니다 (window. 에 있는 것임?, 네트워크를 담당하는 모듈은 있다)

- Promise

  - [참고](https://developers.google.com/web/fundamentals/primers/promises)

  - Promise 클래스의 생성자에서 함수를 바로 실행 (then에서 부를 때 실행되는 것이 아님)

    ```javascript
    class Promise {
      constructor(fn) {
        fn();
      }
    }
    
    const asyncWork = (resolve, reject) => {
      console.log(0);
      if (true) resolve("Stuff worked!");  
      else reject(Error("It broke"));  
    }
    
    const promise = new Promise(asyncWork);
    
    console.log(1);
    
    promise.then(function(result) {
      console.log(result); // "Stuff worked!"
    }, function(err) {
      console.log(err); // Error: "It broke"
    }).then(()=> console.log('2번째 콜백'));
    
    console.log(2);
    
    // 0 > 1 > then(불리고) > 2 > Stuff worked!(1번째 콜백) > 2번째 콜백
    ```

    - resolve, reject, then은 promise의 method



```javascript
function delay(delayMillisecond) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res("resolve!")
        }, delayMillisecond);
    });
}

const delayMillisecond = 2000;
delay(delayMillisecond)
    .then((data) => {
        console.log("data : ", data);
        return delayMillisecond / 1000;
    })
    .then(second => console.log(`${second}초가 지났습니다`));

```

