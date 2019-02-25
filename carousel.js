export default class Carousel {
    constructor({carouselSelector, btnSelector, options}) {
        this.dataList = [];
        this.carousel = document.querySelector(carouselSelector.carousel);
        this.container = document.querySelector(carouselSelector.container);

        this.btnClicked = false;
        this.btnClickedTime = 0;
        this.transitioning = false;
        
        this.items = 0
        this.currentItem = 0;
        this.carouselPosition = 0;

        this.itemWidth = options.itemWidth;
        this.carouselDuration = options.carouselDuration;
        this.carouselCheckingDuration = options.carouselCheckingDuration;
        this.timeGapToRestartCarousel = options.timeGapToRestartCarousel;
        this.btnSelector = btnSelector;
    }

    init() {
        this.getData();
        this.addEvent();
    }

    getData() {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", () => {
            const obj = JSON.parse(oReq.responseText);
            this.pushData(obj.src);
            this.showImage();
            this.startAutoCarousel();
        });
        oReq.open("GET", "./carouselData.json");
        oReq.send();
    }

    pushData(arr) {
        arr.forEach((data) => this.dataList.push(data));
        this.carouselTemplate();
    }

    carouselTemplate() {
        const items = this.carousel.querySelectorAll(".carousel-item");
        items.forEach((item, i) => items[i].firstElementChild.src = this.dataList[i])
    }

    moveToFirstItem() {
        this.carouselPosition = -this.itemWidth;
        this.container.style.transform = `translateX(${this.carouselPosition}px)`;
        this.currentItem = 1;
    }

    showImage() {
        this.makeClone();
        this.moveToFirstItem();
        this.carousel.classList.add("view");
    }

    makeClone() {
        const first = this.container.firstElementChild.cloneNode(true);
        const last = this.container.lastElementChild.cloneNode(true);
        this.container.appendChild(first);
        this.container.insertBefore(last, this.container.firstChild);
        this.items = this.carousel.querySelectorAll(".carousel-item");
    }

    startAutoCarousel() {
        this.moveCarouselAuto(this.carouselDuration);
        this.checkAutoCarousel(this.timeGapToRestartCarousel, this.carouselCheckingDuration);
    }
    
    moveCarouselAuto(duration) {
        let timer = setTimeout(function moveAuto() {
            if (!this.btnClicked) this.moveRight();
            timer = setTimeout(moveAuto.bind(this), duration);
        }.bind(this), duration);
    }

    checkAutoCarousel(timeGap, duration) {
        let timer = setTimeout(function checkTime() {
            if (new Date() - this.btnClickedTime > timeGap) this.btnClicked = false;
            timer = setTimeout(checkTime.bind(this), duration);
        }.bind(this), duration);
    }

    addEvent() {
        const prevBtn = this.carousel.querySelector(this.btnSelector.prevBtn);
        const nextBtn = this.carousel.querySelector(this.btnSelector.nextBtn);

        prevBtn.addEventListener("click", () => this.btnMoveLeft());
        nextBtn.addEventListener("click", () => this.btnMoveRight());

        this.container.addEventListener("transitionend", () => {
            this.transitioning = false;
            this.makeInfinite(this.currentItem);
        });
    }

    btnMoveRight() {
        this.isBtnClicked();
        this.recordBtnTime();
        this.moveRight();
    }

    btnMoveLeft() {
        this.isBtnClicked();
        this.recordBtnTime();
        this.moveLeft();
    }

    isBtnClicked() {
        this.btnClicked = !this.btnClicked;
    }

    recordBtnTime() {
        this.btnClickedTime = new Date();
    }

    moveRight() {
        if (this.transitioning) return;
        if (!this.container.classList.contains("transition")) this.container.classList.add("transition");
        else {
            this.currentItem++;
            this.carouselPosition -= this.itemWidth;
            this.transitioning = true;
            this.container.style.transform = `translateX(${this.carouselPosition}px)`;
        }
    }

    moveLeft() {
        if (this.transitioning) return;
        if (!this.container.classList.contains("transition")) this.container.classList.add("transition");
        else {
            this.currentItem--;
            this.carouselPosition += this.itemWidth;
            this.transitioning = true;
            this.container.style.transform = `translateX(${this.carouselPosition}px)`;
        }
    }

    makeInfinite(val) {
        const first = 0;
        const last = this.items.length-1;
        if (val === first) {
            this.currentItem = this.items.length-2;
            this.carouselPosition = -(this.itemWidth * this.currentItem);
            this.container.classList.remove("transition");
            this.container.style.transform = `translateX(${this.carouselPosition}px)`;
        } else if (val === last) {
            this.container.classList.remove("transition");
            this.moveToFirstItem();
            this.container.style.transition = "";
        }
    }
}