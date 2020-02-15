const init = () => {
    const carouselSlider = createCarouselSlider(),
        carouselSliderBtn = createSliderBtn(carouselSlider),
        carouselCardMenu = createCarouselCardMenu(carouselSlider);

    carouselSlider.getSliderInfo();
    carouselSlider.cloneSlide();
    carouselSliderBtn.setSliderBtns();
    carouselCardMenu.setCardBtns();
};

const createCarouselSlider = () => {
    const SLIDES = '.slider__list';

    const slides = $(SLIDES),
        sliderData = {
            slides: slides,
            slideIndex: 1,
        },

        transitionProperty = {
            name: 'all',
            duration: '.4s',
            timingFunc: 'ease-in-out'
        },

        selectorName = {
            FIRSTCLONE: 'slider-firstClone',
            LASTCLONE: 'slider-lastClone',
            SLIDE_ITEM: '.slider__item',
        }

    return new CarouselSlider(sliderData, transitionProperty, selectorName);
}

const createSliderBtn = (carouselSlider) => {
    const selectorName = {
        SLIDER_BTNS: '#slider__btn button',
    }
    return new CarouselSliderBtn(carouselSlider, selectorName);
}

const createCarouselCardMenu = (carouselSlider) => {
    const selectorName = {
        CARD_BTN: '.card button',
    }

    return new CarouselCardMenu(carouselSlider, selectorName);
}

const $ = (selector, all) => {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}
window.addEventListener('DOMContentLoaded', init);
