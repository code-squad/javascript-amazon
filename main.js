const setCarouselSlider = () => {
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

    return new CarouselSlider(carouselOption.sliderInfo);
}

const createCarouselCardMenu = (carouselSlider) => {
    // const option = {
    //     carouselSlider,
    //     selectorName: {
    //         CARD: '.card-menu__card',
    //         CARD_BTN: '.card-menu__card button',
    //         SELECTED: 'card-menu__selected'
    //     }
    // }

    return new CarouselCardMenu(carouselSlider,carouselOption.cardMenuInfo);
}

const createSliderBtn = (carouselSlider, carouselCardMenu) => {
    // const option = {
    //     carouselSlider,
    //     carouselCardMenu,
    //     selectorName: {
    //         SLIDER_BTNS: '#slider__btn button',
    //     }
    // }

    return new CarouselSliderBtn(carouselSlider,carouselCardMenu,carouselOption.sliderBtnInfo);
}

const $ = (selector, all) => {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}

// window.addEventListener('DOMContentLoaded', init);
