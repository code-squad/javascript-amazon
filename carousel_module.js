//amazon step5 carousel module js

// 슬라이드 시간 설정
const SLIDE_TIME = {
    INTERVAL: 3000,
    RESTART: 2000
}

// 패널 너비 설정
const CAROUSEL_PANEL_WIDTH = {
    WIDTH: 180
}

// fetch API request URL
const REQUEST_URL = {
    URL: "http://localhost:8080/img_src/ajax_imgs/imgMetadata"
}

// Carousel 클래스
class Carousel {
    constructor(SLIDE_TIME, CAROUSEL_PANEL_WIDTH, REQUEST_URL) {
        this.setSlideTime(SLIDE_TIME);
        this.WIDTH = CAROUSEL_PANEL_WIDTH.WIDTH;
        this.URL = REQUEST_URL.URL;
        this.fetchData(this.URL);
        this.carouselModuleBox = document.querySelector(".carousel-module-box");
        this.carouselUnit = document.querySelector(".carousel-unit");
        this.distance = 0;
    }

    setSlideTime(SLIDE_TIME) {
        this.INTERVAL = SLIDE_TIME.INTERVAL;
        this.RESTART = SLIDE_TIME.RESTART;
    }


    fetchData(REQUEST_URL) {
        fetch(REQUEST_URL, { mode: "same-origin" })
            .then(this.checkFetchStatus.bind(this))
            .then(this.addLiImgElemnt.bind(this));
    }

    checkFetchStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response.json());
        }
    }

    addLiImgElemnt(responseJSON) {
        let imgMetadata = responseJSON;
        for (let key in imgMetadata) {
            document.querySelector(".carousel-unit").innerHTML +=
                `<li class="carousel-panels"><img src="${imgMetadata[key]["imgURL"]}" alt=""><br></li>`;
        }
        this.prepareSlidingEvent();
    }

    prepareSlidingEvent() {
        this.arrangeCarouselLis();
        this.operateClickEvent();
        this.startAutoSlide();
        this.triggerResumeAutoSlide();
    } 

    arrangeCarouselLis() {
        this.carouselPanels = document.querySelectorAll(".carousel-panels");
        let elemntIdx = 1;
        for (let elemnt of this.carouselPanels) {
            if (elemnt === this.carouselUnit.firstElementChild) {
                elemnt.style.left = "0px";
            } else {
                elemnt.style.left = `${this.WIDTH * elemntIdx++}px`;
            }
        }
    }

    operateClickEvent() {
        this.addClassCarouselTransition();
        this.carouselModuleBox.addEventListener("click", this.setClickBtn.bind(this));
    }

    addClassCarouselTransition() {
        this.carouselPanels.forEach(elemnt => {
            elemnt.classList.add("carousel-transition");
        });
    }

    setClickBtn(evt) {
        clearInterval(this.startTimerId);
        clearTimeout(this.resumeTimerId);
        const closestDivClassList = evt.target.closest("div").classList

        closestDivClassList.contains("next-btn") ?
            `${this.eventIdentifier = "next-btn"} ${this.setNextBtn()}` :
            closestDivClassList.contains("prev-btn") ?
                `${this.eventIdentifier = "prev-btn"} ${this.setPrevBtn()}` : undefined;
    }

    setNextBtn() {
        let lastItemLeft = this.carouselUnit.lastElementChild.style.left;
        this.distance -= this.WIDTH;
        this.carouselPanels.forEach(elemnt => {
            elemnt.style.transform = `translateX(${this.distance}px)`
        })
        this.carouselUnit.firstElementChild.style.left = `${Number(`${lastItemLeft}`.match(/.\d+/)) + this.WIDTH}px`;
        this.carouselUnit.lastElementChild.insertAdjacentElement("afterend", this.carouselUnit.firstElementChild);
    }

    setPrevBtn() {
        let firstItemLeft = this.carouselUnit.firstElementChild.style.left;
        this.distance += this.WIDTH;
        this.carouselPanels.forEach(elemnt => {
            elemnt.style.transform = `translateX(${this.distance}px)`
        })
        this.carouselUnit.lastElementChild.style.left = `${Number(`${firstItemLeft}`.match(/.\d+/)) - this.WIDTH}px`;
        this.carouselUnit.firstElementChild.insertAdjacentElement("beforebegin", this.carouselUnit.lastElementChild);
    }

    // 자동 슬라이딩 시작
    startAutoSlide() {
        this.startTimerId = setInterval(this.setNextBtn.bind(this), this.INTERVAL);
    }

    // 트랜지션 이벤트 종료 후 슬라이딩 재개 실행
    triggerResumeAutoSlide() {
        this.carouselUnit.addEventListener("transitionend", this.resumeAutoSlide.bind(this));

    }

    // 자동 슬라이딩 재개
    resumeAutoSlide() {
        if (this.eventIdentifier === "next-btn" || this.eventIdentifier === "prev-btn") {
            this.resumeTimerId = setTimeout(this.startAutoSlide.bind(this), this.RESTART);
            this.eventIdentifier = "";
        } else {
            return;
        }
    }

}

const carouselModule = new Carousel(SLIDE_TIME, CAROUSEL_PANEL_WIDTH, REQUEST_URL);