//amazon step4 carousel module js 

// 슬라이드 시간 설정
const slideTime = {
    intervalTime: 3000,
    restartTime: 2000
}

// Carousel 클래스
class Carousel {
    constructor(slideTime) {
        this.setSlideTime(slideTime);
        this.callAjax();
        this.carouselPanelWidth = 180;
        this.carouselModuleBox = document.querySelector(".carousel-module-box");
        this.carouselUnit = document.querySelector(".carousel-unit");
        this.distance = 0;

    }

    setSlideTime(slideTime) {
        this.intervalTime = slideTime.intervalTime;
        this.restartTime = slideTime.restartTime;
    }

    callAjax() {

        let oReq = new XMLHttpRequest();

        oReq.addEventListener("readystatechange", function () {
            if (oReq.readyState === 4 && oReq.status === 200) {
                let imgMetadata = JSON.parse(this.responseText);
                for (let key in imgMetadata) {
                    document.querySelector(".carousel-unit").innerHTML += 
                        `<li class="carousel-panels"><img src="${imgMetadata[key]["imgURL"]}" alt=""><br></li>`;
                }
                carouselModule.prepareSlidingEvent.call(carouselModule);
            }
        });
        oReq.open("GET", "http://localhost:3000/img_src/ajax_imgs/imgMetadata");
        oReq.send(null);
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
                elemnt.style.left = `${this.carouselPanelWidth * elemntIdx++}px`;
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
        this.distance -= this.carouselPanelWidth;
        this.carouselPanels.forEach(elemnt => {
            elemnt.style.transform = `translateX(${this.distance}px)`
        })
        this.carouselUnit.firstElementChild.style.left = `${Number(`${lastItemLeft}`.match(/.\d+/)) + this.carouselPanelWidth}px`;
        this.carouselUnit.lastElementChild.insertAdjacentElement("afterend", this.carouselUnit.firstElementChild);
    }

    setPrevBtn() {
        let firstItemLeft = this.carouselUnit.firstElementChild.style.left;
        this.distance += this.carouselPanelWidth;
        this.carouselPanels.forEach(elemnt => {
            elemnt.style.transform = `translateX(${this.distance}px)`
        })
        this.carouselUnit.lastElementChild.style.left = `${Number(`${firstItemLeft}`.match(/.\d+/)) - this.carouselPanelWidth}px`;
        this.carouselUnit.firstElementChild.insertAdjacentElement("beforebegin", this.carouselUnit.lastElementChild);
    }

    // 자동 슬라이딩 시작
    startAutoSlide() {
        this.startTimerId = setInterval(this.setNextBtn.bind(this), this.intervalTime);
    }

    // 트랜지션 이벤트 종료 후 슬라이딩 재개 실행
    triggerResumeAutoSlide() {
        this.carouselUnit.addEventListener("transitionend", this.resumeAutoSlide.bind(this));

    }

    // 자동 슬라이딩 재개
    resumeAutoSlide() {
        if (this.eventIdentifier === "next-btn" || this.eventIdentifier === "prev-btn") {
            this.resumeTimerId = setTimeout(this.startAutoSlide.bind(this), this.restartTime);
            this.eventIdentifier = "";
        } else {
            return;
        }
    }

}

const carouselModule = new Carousel(slideTime);

