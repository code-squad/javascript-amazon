const $ = (selector, all) => {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}

window.addEventListener('DOMContentLoaded', () => {
    const carousel = createCarousel();
    const carouselSlider = createCarouselSlider(carousel);
    const carouselCardMenu = createCarouselCardMenu(carousel);

    carouselSlider.getSliderInfo();
    carouselSlider.cloneSlide();
    carouselSlider.setSliderBtns();
    carouselCardMenu.setCardBtns();
});

const createCarousel = () => {
    const SLIDES = '.slider__list';
    const slides = $(SLIDES);

    return new Carousel({
        slides: slides,
        slideIndex: 1,
    });
}

const createCarouselSlider = (carousel) => {
    const constant = {
        FIRSTCLONE: 'slider-firstClone',
        LASTCLONE: 'slider-lastClone',
        SLIDES: '.slider__list',
        SLIDE_ITEM: '.slider__item',
        SLIDER_BTNS: '#slider__btn button',
        FIRSTSLIDE_INDEX: 1,
        LASTSLIDE_INDEX: 2,
    }

    return new CarouselSlider(carousel, constant);
}

const createCarouselCardMenu = (carousel) => {
    const constant = {
        CARD_BTN: '.card button',
    }

    return new CarouselCardMenu(carousel, constant);
}

class Carousel {
    constructor(sliderData) {
        this.slides = sliderData.slides;
        this.slideIndex = sliderData.slideIndex;
        this.slideSize = this.slides.firstElementChild.clientWidth;
    }

    moveSlides(slideIndex) {
        return this.slides.style.transform = 'translateX(' + (-this.slideSize * slideIndex) + 'px)';
    }
}

class CarouselSlider {
    constructor(carousel, constant) {
        this.carousel = carousel,
            this.constant = constant
    }

    getSliderInfo() {
        this.slideItems = $(this.constant.SLIDE_ITEM, true);
        this.slideItemlength = this.slideItems.length;
        return [this.slideItems, this.slideItemlength];
    }

    cloneSlide() {
        const firstSlide = this.carousel.slides.firstElementChild;
        const lastSlide = this.carousel.slides.lastElementChild;
        const firstClone = firstSlide.cloneNode(true);
        const lastClone = lastSlide.cloneNode(true);

        firstClone.id = this.constant.FIRSTCLONE;
        lastClone.id = this.constant.LASTCLONE;
        this.carousel.slides.append(firstClone);
        this.carousel.slides.prepend(lastClone);
        this.getSliderInfo();
        this.carousel.moveSlides(this.carousel.slideIndex);
        return [firstClone, lastClone];
    }

    setSliderBtns() {
        const [previousBtn, nextBtn] = $(this.constant.SLIDER_BTNS, true);

        this.setClickEvent(previousBtn);
        this.setClickEvent(nextBtn, 'plus');
        return [previousBtn, nextBtn];
    }

    setClickEvent(sliderBtn, plusIndex) {
        return sliderBtn.addEventListener('click', () => {
            plusIndex ? this.carousel.slideIndex++ : this.carousel.slideIndex--;
            this.carousel.moveSlides(this.carousel.slideIndex);
            this.checkBothEndsSlide();
        });
    }

    checkBothEndsSlide() {
        const lastSlideIndex = this.slideItemlength - this.constant.LASTSLIDE_INDEX;
        const currentSlideId = this.slideItems[this.carousel.slideIndex].id;

        if (currentSlideId === this.constant.LASTCLONE) {
            this.changeSlideIndex(lastSlideIndex);
        }

        if (currentSlideId === this.constant.FIRSTCLONE) {
            this.changeSlideIndex(this.constant.FIRSTSLIDE_INDEX);
        }
        return currentSlideId;
    }

    changeSlideIndex(index) {
        this.carousel.slideIndex = index;
        this.carousel.moveSlides(this.carousel.slideIndex);
        return this.carousel.slideIndex;
    }
}

class CarouselCardMenu {
    constructor(carousel, constant) {
        this.carousel = carousel,
            this.constant = constant
    }

    setCardBtns() {
        const cardBtns = $(this.constant.CARD_BTN, true);

        return cardBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.carousel.moveSlides(index + 1);
            })
        })
    }
}











