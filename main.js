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
    const SLIDES_CLASS_NAME = '.slider__list';
    const slides = $(SLIDES_CLASS_NAME);

    const sliderInfo = {
        sliderData: {
            slides: slides,
            slideIndex: 1,
        },

        transitionProperty: {
            NAME: 'all',
            DURATION: '.4s',
            TIMING_FUNC: 'ease-in-out'
        },

        selectorName: {
            FIRST_CLONE: 'slider-firstClone',
            LAST_CLONE: 'slider-lastClone',
            SLIDE_ITEM: '.slider__item',
        }
    }

    return new CarouselSlider(sliderInfo);
}

const createCarouselCardMenu = (carouselSlider) => {
    const option = {
        carouselSlider,
        selectorName: {
            CARD: '.card-menu__card',
            CARD_BTN: '.card-menu__card button',
            SELECTED: 'card-menu__selected'
        }
    }

    return new CarouselCardMenu(option);
}

const createSliderBtn = (carouselSlider, carouselCardMenu) => {
    const option = {
        carouselSlider,
        carouselCardMenu,
        selectorName: {
            SLIDER_BTNS: '#slider__btn button',
        }
    }

    return new CarouselSliderBtn(option);
}

const $ = (selector, all) => {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}
window.addEventListener('DOMContentLoaded', init);
