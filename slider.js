//클래스 
const $ = (selector, all) => {
    if (all) return document.querySelectorAll(selector);
    return document.querySelector(selector);
}


window.addEventListener('DOMContentLoaded', () => {

    const cardMenuBtns = $('.card-menu__card button', true);
    const slider = $('.slider__list');
    // const size = $(".slider__item").clientWidth;
    const carousel = new carouselService({
        cardMenuBtns: cardMenuBtns,
        slider: slider,
        slideIndex: 1
    });
    carousel.getSliderInfo();
    carousel.cloneSlide();
    carousel.setSliderBtns();
    carousel.setCardBtns();
})



// 모듈2
const FIRSTSLIDE = 'slider-firstClone';
const LASTSLIDE = 'slider-lastClone';


class carouselService {
    constructor(option) {
        this.cardBtns = option.cardMenuBtns;
        this.slider = option.slider;
        this.slideIndex = option.slideIndex;
    }

    getSliderInfo() {
        const SLIDES = '.slider__item';
        this.slides = $(SLIDES, true);
        this.slideSize = this.slides[0].clientWidth;
        this.length = this.slides.length;
    }

    cloneSlide() {
        const firstSlide = this.slides[0];
        const lastSlide = this.slides[this.length - 1];

        const firstClone = firstSlide.cloneNode(true);
        firstClone.id = FIRSTSLIDE;
        const lastClone = lastSlide.cloneNode(true);
        lastClone.id = LASTSLIDE;
        this.slider.append(firstClone);
        this.slider.prepend(lastClone);
        this.getSliderInfo();
        this.moveSlides(this.slideIndex);
    }

    moveSlides(slideIndex) {
        return this.slider.style.transform = 'translateX(' + (-this.slideSize * slideIndex) + 'px)';
    }

    setSliderBtns() {
        const SLIDER_BTNS = '#slider__btn button';
        const [previousBtn, nextBtn] = $(SLIDER_BTNS, true);//클래스 아이디??

        previousBtn.addEventListener('click', () => {
            this.slideIndex--;
            this.moveAndCheckSlide();

        })
        nextBtn.addEventListener('click', () => {
            this.slideIndex++;
            this.moveAndCheckSlide();
        })

    }

    moveAndCheckSlide() {
        this.moveSlides(this.slideIndex);
        this.checkBothEndsSlide();
    }

    checkBothEndsSlide() {
        const FIRSTSLIDE_INDEX = 1;
        const lastSlideIndex = this.length - 2;

        let currentSlideId = this.slides[this.slideIndex].id;

        if (currentSlideId === LASTSLIDE) {
            this.changeSlideIndex(lastSlideIndex);
        }

        if (currentSlideId === FIRSTSLIDE) {
            this.changeSlideIndex(FIRSTSLIDE_INDEX);
        }
    }

    changeSlideIndex(index) {
        this.slideIndex = index;
        this.moveSlides(this.slideIndex);
    }

    setCardBtns() {
        this.cardBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.moveSlides(index + 1);
            })
        })
    }



}

