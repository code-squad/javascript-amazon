const $ = (selector, all) => {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}

window.addEventListener('DOMContentLoaded', () => {
    const carouselSlider = createCarouselSlider(),
        carouselCardMenu = createCarouselCardMenu(carouselSlider);

    carouselSlider.getSliderInfo();
    carouselSlider.cloneSlide();
    carouselSlider.setSliderBtns();
    carouselCardMenu.setCardBtns();
});

const createCarouselSlider = () => {
    const SLIDES = '.slider__list';

    const slides = $(SLIDES);
    const sliderData = {
        slides: slides,
        slideIndex: 1,
    }

    const selectorNames = {
        FIRSTCLONE: 'slider-firstClone',
        LASTCLONE: 'slider-lastClone',
        SLIDE_ITEM: '.slider__item',
        SLIDER_BTNS: '#slider__btn button',
    }

    return new CarouselSlider(sliderData, selectorNames);
}

const createCarouselCardMenu = (carouselSliderData) => {
    const selectorNames = {
        CARD_BTN: '.card button',
    }

    return new CarouselCardMenu(carouselSliderData, selectorNames);
}