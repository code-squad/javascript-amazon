const $ = (selector, all) => {
    if (all) return document.querySelectorAll(selector);
    return document.querySelector(selector);
}


window.addEventListener('DOMContentLoaded', () => {
    const carousel = carouselService();
    carousel.getSlideSize();
    const carouselSlider = new CarouselSlider(carousel);
    carouselSlider.getSliderInfo();
    carouselSlider.cloneSlide();
    carouselSlider.setSliderBtns();
    const carouselCardMenu = new CarouselCardMenu(carousel);
    carouselCardMenu.setCardBtns();
});


function carouselService() {
    const SLIDES = '.slider__list';

    const slides = $(SLIDES);
    const carousel = new CarouselService({
        slides: slides,
        slideIndex: 1
    })
    return carousel;
}


const FIRSTSLIDE = 'slider-firstClone';
const LASTSLIDE = 'slider-lastClone';

class CarouselService {
    constructor(sliderData) {
        this.slides = sliderData.slides;
        this.slideIndex = sliderData.slideIndex;
    }

    getSlideSize() {
        return this.slideSize = this.slides.firstElementChild.clientWidth;
    }

    moveSlides(slideIndex) {
        return this.slides.style.transform = 'translateX(' + (-this.slideSize * slideIndex) + 'px)';
    }
}

class CarouselSlider {
    constructor(carousel) {
        this.carousel = carousel;
    }

    getSliderInfo() {
        const SLIDE_ITEM = '.slider__item';
        this.slideItems = $(SLIDE_ITEM, true);
        this.slideItemlength = this.slideItems.length;
    }

    cloneSlide() {
        const firstSlide = this.carousel.slides.firstElementChild;
        //위에서 구해놓은 this.slideItems[0]이 좋은지 firstElementChild로 의미를 명확하게 하는게 좋은지
        const lastSlide = this.carousel.slides.lastElementChild;
        const firstClone = firstSlide.cloneNode(true);
        firstClone.id = FIRSTSLIDE;
        const lastClone = lastSlide.cloneNode(true);
        lastClone.id = LASTSLIDE;
        this.carousel.slides.append(firstClone);
        this.carousel.slides.prepend(lastClone);
        this.getSliderInfo();
        this.carousel.moveSlides(this.carousel.slideIndex);
    }

    setSliderBtns() {
        const SLIDER_BTNS = '#slider__btn button';
        const [previousBtn, nextBtn] = $(SLIDER_BTNS, true);//클래스 아이디??

        previousBtn.addEventListener('click', () => {
            this.carousel.slideIndex--;
            this.moveAndCheckSlide();
        });

        nextBtn.addEventListener('click', () => {
            this.carousel.slideIndex++;
            this.moveAndCheckSlide();
        });
    }

    moveAndCheckSlide() {
        this.carousel.moveSlides(this.carousel.slideIndex);
        this.checkBothEndsSlide();
    }


    checkBothEndsSlide() {
        const FIRSTSLIDE_INDEX = 1;
        const LASTSLIDE_INDEX = 2;
        const lastSlideIndex = this.slideItemlength - LASTSLIDE_INDEX;

        let currentSlideId = this.slideItems[this.carousel.slideIndex].id;

        if (currentSlideId === LASTSLIDE) {
            this.changeSlideIndex(lastSlideIndex);
        }

        if (currentSlideId === FIRSTSLIDE) {
            this.changeSlideIndex(FIRSTSLIDE_INDEX);
        }
    }

    changeSlideIndex(index) {
        this.carousel.slideIndex = index;
        this.carousel.moveSlides(this.carousel.slideIndex);
    }
}

class CarouselCardMenu {
    constructor(carousel) {
        this.carousel = carousel;
    }

    setCardBtns() {
        const cardBtns = $('.card button', true);
        cardBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.carousel.moveSlides(index + 1);
            })
        })
    }
}











