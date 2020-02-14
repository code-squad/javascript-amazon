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