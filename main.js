const init = () => {
    const carouselSlider = createCarouselSlider(),
        carouselCardMenu = createCarouselCardMenu(carouselSlider),
        carouselSliderBtn = createSliderBtn(carouselSlider, carouselCardMenu);

    carouselSlider.getSliderInfo();
    carouselSlider.cloneSlide();
    carouselCardMenu.setCardBtns();
    carouselSliderBtn.setSliderBtns();
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

const createCarouselCardMenu = (carouselSlider) => {
    const selectorName = {
        CARD: '.card-menu__card',
        CARD_BTN: '.card-menu__card button',
        SELECTED: 'card-menu__selected'
    }

    return new CarouselCardMenu(carouselSlider, selectorName);
}

const createSliderBtn = (carouselSlider, carouselCardMenu) => {
    const selectorName = {
        SLIDER_BTNS: '#slider__btn button',
    }

    return new CarouselSliderBtn(carouselSlider, carouselCardMenu, selectorName);
}

const $ = (selector, all) => {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}
window.addEventListener('DOMContentLoaded', init);
