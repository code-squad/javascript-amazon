[기획서](https://docs.google.com/presentation/d/1E0HUKbGFaGpGIyZFbQ5iyX-egynVwXqfGqwl42VE1g4/edit#slide=id.g5469229b45_0_0)
[구 아마존 페이지](https://web.archive.org/web/20180717213726/amazon.com/amazonprime)


# 월요일 수업

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


## test code
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

## master code
```javascript
let [left, right] = document.querySelectorAll("button");
right.addEventListener("mousedown", (e)=> {
    //const viewerEl = document.querySelector(".viewer > .img-section")
    const ul = e.target.previousElementSibling.firstElementChild;
    ul.style.marginLeft = "-800px";
});
```



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


# 금요일 수업
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


# 코드 리뷰
- data attribute
- 의도가 들어나도록 이름 짜기
- 생성자가 많아질것 같으면 **객체**로 받을 것 (장점 : **key**와 **value**가 있으니까 순서가 달라도 됨)
- 인자 순서 같은건 같은 일관성을 가져야 함. 비슷한 함수는 비슷하게 동작해야 함.
