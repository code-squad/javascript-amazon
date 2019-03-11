export default class Carousel {
    constructor({carouselSelector, btnSelector, options, data}) {
        this.dataList = [];
        this.carousel = document.querySelector(carouselSelector.carousel);
        this.container = document.querySelector(carouselSelector.container);

        this.btnClicked = false;
        this.btnClickedTime = 0;
        this.transitioning = false;

        this.items = 0
        this.currentItem = 0;
        this.carouselPosition = 0;

        this.options = options;
        this.itemWidth = options.itemWidth;
        this.btnSelector = btnSelector;
        this.dataObj = data;
    }

    init() {
        this.getData();
        this.addEvent();
    }

    getData() {
        const oReq = new XMLHttpRequest();
        oReq.addEventListener("load", () => {
            const obj = JSON.parse(oReq.responseText);
            this.addDataTags(obj.src);
            this.showImage();
            this.startAutoCarousel();
        });
        oReq.open(this.dataObj.method, this.dataObj.url);
        oReq.send();
    }

    addDataTags(srcArr) {
        let tagContainer = "";
        srcArr.forEach((data, i) => tagContainer += this.templateData(data, i));
        this.container.innerHTML = tagContainer;
    }

    templateData(src, i) {
        return `
        <div class="carousel-item">
        <img src="${src}" alt="img${i}">
        </div>
        `
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

    moveToFirstItem() {
        this.carouselPosition = -this.itemWidth;
        this.container.style.transform = `translateX(${this.carouselPosition}px)`;
        this.currentItem = 1;
    }

    startAutoCarousel() {
        const carouselDuration = this.options.carouselDuration;
        const carouselCheckingDuration = this.options.carouselCheckingDuration;
        const timeGapToRestartCarousel = this.options.timeGapToRestartCarousel;

        this.moveCarouselAuto(carouselDuration);
        this.checkAutoCarousel(timeGapToRestartCarousel, carouselCheckingDuration);
    }

    moveCarouselAuto(duration) {
        const moveAuto = () => {
            if (!this.btnClicked) this.moveRight();
            let timer = setTimeout(moveAuto, duration);
        }
        moveAuto();
    }

    checkAutoCarousel(timeGap, duration) {
        const checkWhenBtnClicked = () => {
            if (new Date() - this.btnClickedTime > timeGap) this.btnClicked = false;
            let timer = setTimeout(checkWhenBtnClicked, duration);
        }
        checkWhenBtnClicked();
    }

    addEvent() {
        this.carousel.addEventListener("click", ((event) => {
            const target = event.target;
            if(target.matches(".prev-btn")) this.btnMoveLeft();
            else if (target.matches(".next-btn")) this.btnMoveRight();
        }), false);

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
        if (!this.container.classList.contains("transiting")) this.container.classList.add("transiting");
        else {
            this.currentItem++;
            this.carouselPosition -= this.itemWidth;
            this.transitioning = true;
            this.container.style.transform = `translateX(${this.carouselPosition}px)`;
        }
    }

    moveLeft() {
        if (this.transitioning) return;
        if (!this.container.classList.contains("transiting")) this.container.classList.add("transiting");
        else {
            this.currentItem--;
            this.carouselPosition += this.itemWidth;
            this.transitioning = true;
            this.container.style.transform = `translateX(${this.carouselPosition}px)`;
        }
    }

    makeInfinite(val) {
        const first = 0;
        const last = this.items.length - 1;
        if (val === first) {
            this.currentItem = this.items.length - 2;
            this.carouselPosition = -(this.itemWidth * this.currentItem);
            this.container.classList.remove("transiting");
            this.container.style.transform = `translateX(${this.carouselPosition}px)`;
        } else if (val === last) {
            this.container.classList.remove("transiting");
            this.moveToFirstItem();
        }
    }
}