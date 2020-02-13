const $ = (selector, all) => {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
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
        this.carousel = carousel,

            this.constant = {
                FIRSTCLONE: 'slider-firstClone',
                LASTCLONE: 'slider-lastClone',
                SLIDES: '.slider__list',
                SLIDE_ITEM: '.slider__item',
                SLIDER_BTNS: '#slider__btn button',
                FIRSTSLIDE_INDEX: 1,
                LASTSLIDE_INDEX: 2,
            }
    }

    getSliderInfo() {
        this.slideItems = $(this.constant.SLIDE_ITEM, true);
        return this.slideItemlength = this.slideItems.length;
    }

    cloneSlide() {
        const firstSlide = this.carousel.slides.firstElementChild;
        //위에서 구해놓은 this.slideItems[0]이 좋은지 firstElementChild로 의미를 명확하게 하는게 좋은지
        const lastSlide = this.carousel.slides.lastElementChild;
        const firstClone = firstSlide.cloneNode(true);
        firstClone.id = this.constant.FIRSTCLONE;
        const lastClone = lastSlide.cloneNode(true);
        lastClone.id = this.constant.LASTCLONE;
        this.carousel.slides.append(firstClone);
        this.carousel.slides.prepend(lastClone);
        this.getSliderInfo();
        return this.carousel.moveSlides(this.carousel.slideIndex);
    }

    setSliderBtns() {
        const [previousBtn, nextBtn] = $(this.constant.SLIDER_BTNS, true);

        this.setClickEvent(previousBtn);
        return this.setClickEvent(nextBtn, true);
    }

    setClickEvent(sliderBtn, plusIndex) {
        sliderBtn.addEventListener('click', () => {
            plusIndex ? this.carousel.slideIndex++ : this.carousel.slideIndex--;
            this.carousel.moveSlides(this.carousel.slideIndex);
            this.checkBothEndsSlide();
        });
        return;
    }

    checkBothEndsSlide() {
        const lastSlideIndex = this.slideItemlength - this.constant.LASTSLIDE_INDEX;
        let currentSlideId = this.slideItems[this.carousel.slideIndex].id;

        if (currentSlideId === this.constant.LASTCLONE) {
            this.changeSlideIndex(lastSlideIndex);
        }

        if (currentSlideId === this.constant.FIRSTCLONE) {
            this.changeSlideIndex(this.constant.FIRSTSLIDE_INDEX);
        }
        return;
    }

    changeSlideIndex(index) {
        this.carousel.slideIndex = index;
        return this.carousel.moveSlides(this.carousel.slideIndex);
    }
}

class CarouselCardMenu {
    constructor(carousel) {
        this.carousel = carousel,

            this.constant = {
                CARD_BTN: '.card button',
            }
    }

    setCardBtns() {
        const cardBtns = $(this.constant.CARD_BTN, true);
        cardBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.carousel.moveSlides(index + 1);
            })
        })
        return;
    }
}











