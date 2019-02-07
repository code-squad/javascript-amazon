//amazon step4 carousel module js 

// Carousel 클래스
class Carousel {
    constructor() {
        this.callAjax();
        this.carouselPanelWidth = 180;
        this.carouselModuleBox = document.querySelector(".carousel-module-box");
        this.carouselUnit = document.querySelector(".carousel-unit");
        this.distance = 0;
        this.slideTime = {
            intervalTime : 3000,
            restartTime : 2000
        }
    }

    callAjax() {
        let ajaxElementTemplate = document.querySelector(".ajax-element-template").innerHTML;

        let oReq = new XMLHttpRequest();

        oReq.addEventListener("readystatechange", function () {
            if (oReq.readyState === 4 && oReq.status === 200) {
                let imgMetadata = JSON.parse(this.responseText);
                for (let key in imgMetadata) {
                    document.querySelector(".carousel-unit").innerHTML += ajaxElementTemplate.replace("{url}", imgMetadata[key]["imgURL"]);
                }
                carouselModule.prepareSlidingEvent.call(carouselModule);
            }
        });
        oReq.open("GET", "http://localhost:3000/img_src/ajax_imgs/imgMetadata");
        oReq.send(null);
    }

    prepareSlidingEvent() {
        document.addEventListener("DOMContentLoaded", this.arrangeCarouselLis());
        document.addEventListener("DOMContentLoaded", this.operateClickEvent());
        document.addEventListener("DOMContentLoaded", this.startAutoSlide());
        document.addEventListener("DOMContentLoaded", this.triggerResumeAutoSlide());
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
        this.eventIdentifier = evt.target.closest("div").classList[0];
        clearInterval(this.startTimerId);
        clearTimeout(this.resumeTimerId);
        if (this.eventIdentifier === "next-btn") this.setNextBtn();
        else if (this.eventIdentifier === "prev-btn") this.setPrevBtn();
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
        this.startTimerId = setInterval(this.setNextBtn.bind(this), this.slideTime.intervalTime);
    }

    // 트랜지션 이벤트 종료 후 슬라이딩 재개 실행
    triggerResumeAutoSlide() {
        this.carouselUnit.addEventListener("transitionend", this.resumeAutoSlide.bind(this));
    }

    // 자동 슬라이딩 재개
    resumeAutoSlide(evt) {
        if (this.eventIdentifier === "next-btn" || this.eventIdentifier === "prev-btn") {
            this.resumeTimerId = setTimeout(this.startAutoSlide.bind(this), this.slideTime.restartTime);
            this.eventIdentifier = "";
        } else {
            return;
        }
    }
}

const carouselModule = new Carousel();

