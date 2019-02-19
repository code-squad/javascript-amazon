class Carousel {
    constructor() {
        this.dataList = [];
        this.carousel = document.querySelector(".carousel");
        this.container = this.carousel.querySelector(".carousel-container");
        this.item = this.carousel.querySelector(".carousel-item");
        this.items = this.carousel.querySelectorAll(".carousel-item");

        this.prevBtn = this.carousel.querySelector(".prev-btn");
        this.nextBtn = this.carousel.querySelector(".next-btn");

        this.currentItem = 1;
        this.carouselWidth = 0;

        this.init()
    }

    init() {
        this.getData();

        this.nextBtn.addEventListener("click", () => this.moveRight());
        this.prevBtn.addEventListener("click", () => this.moveLeft());
    }

    getData() {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", function () {
            const obj = JSON.parse(this.responseText);
            carousel.pushData(obj.src);
        });
        oReq.open("GET", "./carousel_data.json");
        oReq.send();
    }

    pushData(arr) {
        for (let i = 0; i < arr.length; i++) {
            this.dataList.push(arr[i]);
        }
    }

    moveRight() {
        if (this.checkLength() === 'last') this.makeInfinite(this.checkLength());
        else {
            this.currentItem++;
            this.carouselWidth -= 180;
            this.container.style.transform = `translateX(${this.carouselWidth}px)`;
        }
    }

    moveLeft() {
        if (this.checkLength() === 'first') this.makeInfinite(this.checkLength());
        else {
            this.currentItem--;
            this.carouselWidth += 180;
            this.container.style.transform = `translateX(${this.carouselWidth}px)`;
        }
    }

    checkLength() {
        if (this.currentItem === 1) return 'first'
        else if (this.currentItem === this.items.length) return 'last'
    }

    makeInfinite(val) {
        if (val === 'first') {
            this.currentItem = this.items.length;
            this.carouselWidth = -(180 * (this.items.length - 1));
            console.log(this.currentItem, this.carouselWidth)
            this.container.style.transform = `translateX(${this.carouselWidth}px)`;
        } else if (val === 'last') {
            this.currentItem = 1
            this.carouselWidth = 0
            this.container.style.transform = `translateX(${this.carouselWidth}px)`;
        }
    }
}

const carousel = new Carousel();

/*
export default class Carousel {
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
*/