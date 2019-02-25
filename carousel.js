export default class Carousel {
    constructor(itemWidth) {
        this.dataList = [];
        this.carousel = document.querySelector(".carousel");
        this.container = this.carousel.querySelector(".carousel-container");

        this.btnClicked = false;
        this.btnClickedTime = 0;
        
        this.items = 0
        this.currentItem = 0;
        this.carouselPosition = 0;
        this.itemWidth = itemWidth;
        this.carouselPosition = 0;
        // this.transitioning = false;
        
        this.carouselDuration = 2000;
        this.carouselCheckingDuration = 500;
        this.timeGapToRestartCarousel = 5000;
        
        this.timerId = 0;
        // this.init();
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
        oReq.open("GET", "./carousel_data.json");
        oReq.send();
    }

    pushData(arr) {
        arr.forEach((data) => this.dataList.push(data));
        this.carouselTemplate();
    }

    carouselTemplate(arr) {
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
        this.carousel.style.opacity = 1; // this.carousel.classList.add(view) : .view { opacity: 1;}
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
            // else if (this.btnClicked) {
            //     clearTimeout(this.timerId);
            // }
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
        const prevBtn = this.carousel.querySelector(".prev-btn");
        const nextBtn = this.carousel.querySelector(".next-btn");

        prevBtn.addEventListener("click", () => this.btnMoveLeft());
        nextBtn.addEventListener("click", () => this.btnMoveRight());

        this.container.addEventListener('transitionend', () => {
            this.transitioning = false;
            console.log(this.transitioning)
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
        if (this.checkLength() === this.items.length-1) this.makeInfinite(this.checkLength())
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
        if (this.checkLength() === 0) this.makeInfinite(this.checkLength());
        else {
            this.currentItem--;
            this.carouselPosition += this.itemWidth;
            this.transitioning = true;
            this.container.style.transform = `translateX(${this.carouselPosition}px)`;
        }
    }

    checkLength() {
        return this.currentItem;
    }

    makeInfinite(val) {
        if (val === 0) {
            this.currentItem = this.items.length-2
            this.carouselPosition = -(this.itemWidth * this.currentItem)
            this.container.classList.remove("transition");
            this.transitioning = true;
            this.container.style.transform = `translateX(${this.carouselPosition}px)`;
        } else if (val === this.items.length-1) {
            this.container.classList.remove("transition");
            this.moveToFirstItem();

            // this.currentItem = 1;
            // this.carouselPosition = -this.itemWidth;
            // // this.transitioning = true;
            // this.container.style.transform = `translateX(${this.carouselPosition}px)`;
        }
    }
}