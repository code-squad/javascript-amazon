//amazon step4 carousel module js 

// ajax 요청을 통한 JS 템플릿 완성 및 이미지 로드
let ajaxElementTemplate = document.querySelector(".ajax-element-template").innerHTML;

let oReq = new XMLHttpRequest();

oReq.addEventListener("load", function () {
    let imgMetadata = JSON.parse(this.responseText);
    for (let key in imgMetadata) {
        document.querySelector(".carousel-unit").innerHTML += ajaxElementTemplate.replace("{url}", imgMetadata[key]["imgURL"]);
    }
});

oReq.open("GET", "http://localhost:3000/img_src/ajax_imgs/imgMetadata");
oReq.send(null);


// Carousel 클래스
class Carousel {
    constructor() {
        this.carouselModuleBox = document.querySelector(".carousel-module-box");
        this.carouselUnit = document.querySelector(".carousel-unit");
        this.distance = 0;
        this.prepareSlidingEvent();
    }

    prepareSlidingEvent() {
        window.addEventListener("load", this.organizeCarouselLis.bind(this));
        window.addEventListener("load", this.arrangeCarouselLis.bind(this));
        window.addEventListener("load", this.operateClickEvent.bind(this));
        window.addEventListener("load", this.startAutoSlide.bind(this));
        window.addEventListener("load", this.triggerResumeAutoSlide.bind(this));
    }

    organizeCarouselLis() {
        this.carouselPanels = document.querySelectorAll(".carousel-panels");
    }

    arrangeCarouselLis() {
        for (let elemnt = 0; elemnt < this.carouselPanels.length; elemnt++) {
            if (elemnt === 0) {
                this.carouselPanels[elemnt].style.left = "0px";
            } else {
                this.carouselPanels[elemnt].style.left = `${Number(getComputedStyle(this.carouselPanels[0]).width.match(/.\d+/)) * elemnt}px`;
            }
        }
    }

    operateClickEvent() {
        this.getImageWidth();
        this.addClassCarouselTransition();
        this.carouselModuleBox.addEventListener("click", this.setClickBtn.bind(this));
    }

    getImageWidth() {
        this.imageWidth = Number(getComputedStyle(this.carouselPanels[0]).width.match(/.\d+/));
        return this.imageWidth;
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
        this.distance -= this.imageWidth;
        this.carouselPanels.forEach(elemnt => {
            elemnt.style.transform = `translateX(${this.distance}px)`
        })
        this.carouselUnit.firstElementChild.style.left = `${Number(`${lastItemLeft}`.match(/.\d+/)) + this.imageWidth}px`;
        this.carouselUnit.lastElementChild.insertAdjacentElement("afterend", this.carouselUnit.firstElementChild);
    }

    setPrevBtn() {
        let firstItemLeft = this.carouselUnit.firstElementChild.style.left;
        this.distance += this.imageWidth;
        this.carouselPanels.forEach(elemnt => {
            elemnt.style.transform = `translateX(${this.distance}px)`
        })
        this.carouselUnit.lastElementChild.style.left = `${Number(`${firstItemLeft}`.match(/.\d+/)) - this.imageWidth}px`;
        this.carouselUnit.firstElementChild.insertAdjacentElement("beforebegin", this.carouselUnit.lastElementChild);
    }

    // 자동 슬라이딩 시작
    startAutoSlide() {
        this.startTimerId = setInterval(this.setNextBtn.bind(this), 3000);
    }

    // 트랜지션 이벤트 종료 후 슬라이딩 재개 실행
    triggerResumeAutoSlide() {
        this.carouselUnit.addEventListener("transitionend", this.resumeAutoSlide.bind(this));
    }

    // 자동 슬라이딩 재개
    resumeAutoSlide(evt) {
        if (this.eventIdentifier === "next-btn" || this.eventIdentifier === "prev-btn") {
            this.resumeTimerId = setTimeout(this.startAutoSlide.bind(this), 2000);
            this.eventIdentifier = "";
        } else {
            return;
        }
    }

}

const carouselModule = new Carousel();

