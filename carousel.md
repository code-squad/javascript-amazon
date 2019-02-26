1. 4개의 패널
2. 패널은 한 번에 하나만 노출시킴
    - 좌우로 메뉴가 움직인다. 
        1) 메뉴 무한 동작 (맨 끝에서 한번 더 이동하면 처음 메뉴 노출)
        2) 캐로샐은 3초 간격으로 자동으로 움직인다
        3) 사용자가 좌우 버튼을 누르면 메뉴 이동 
            - 사용자 조작으로 캐로샐이 움직이면 자동이동 off
            - 일정 시간 버튼 클릭 없으면 자동이동 on
        4) 메뉴이동시 슬라이드 애니메이션
3. 화면 로딩 후 이미지 URL과 텍스트 데이터 불러온다 
    - Ajax 이용 

## STEP 동작 나누기 

0. 화면이 로딩되면 데이터를 받는다. 
1. 초기 이미지를 보여준다.  
2. 이미지는 좌우로 움직인다 
3. 이미지는 자동으로 이동한다 
4. 이미지는 3초 간격으로 움직인다 
5. 오른쪽 버튼을 눌러서 이미지를 오른쪽으로 움직일 수 있다.  
6. 왼쪽 버튼을 눌러서 이미지를 왼쪽으로 움직일 수 있다.
7. 오른쪽 / 왼쪽 버튼이 눌리면 자동이동이 꺼진다.
8. 일정시간 버튼 클릭이 없으면 자동이동이 켜진다.

## 스켈레톤 코드

```js
class Carousel {
    constructor() {
        오토무빙 = true;
        btnClickedTime = 0;
    }

    getData() {
        - ajax로 이미지 URL, text가 포함된 데이터를 가져온다. 
    }

    showFirstData() {
        - ajax로 데이터를 받았는지 확인한다.
        - 첫번째 데이터를 HTML에 주입한다.
    }

    moveToRight() {
        - checkLength()
        - 데이터를 오른쪽으로 한 칸 바꿔준다.
    }

    moveToLeft() {
        - checkLength()
        - 데이터를 왼쪽으로 한 칸 바꿔준다.
    }

    checkLength() {
        - 첫번째 데이터면 마지막 데이터로, 마지막 데이터면 첫번째 데이터로 바꿔준다. 
    }

    autoMove() {
        - 오토 무빙 = true;
        - 3초 간격으로 moveToRight()를 실행한다.
    }

    clickRightBtn() {
        - moveToRight()
        - 오토 무빙 = false;
        - saveClickedTime();
    }

    clickLeftBtn() {
        - moveToLeft()
        - 오토 무빙 = false;
        - saveClicekdTime();
    }

    saveClickedTime() {
        - 현재 시간을 기록한다 (btnClickedTime)
    }

    runAutoMove() {
        - var now = 현재시간
        - if(now - btnClickedTime > 5초) autoMove();
    }
    window.addEventListener('load', () => setInterval(runAutoMove, 500))
}
```

```HTML
<div class = "carousel">
    <div class = "carousel-left">
        <div class = "carousel-left-btn"></div>
        <img class = "carousel-img" src = "">
        <img class = "carousel-img" src = "">
        <img class = "carousel-img" src = "">
        <img class = "carousel-img" src = "">
        <div class = "carousel-right-btn"></div>
    </div>

    <div class = "carousel-right">
        <h2 class = "carousel-txt-title"></h2>
        <div class = "carousel-txt-body"></div>
        <div class = "carousel-txt-link"></div>
    </div>
</div>
```