const carouselOption = {
    sliderInfo: {
        sliderData: {
            slides: '.slider__list',
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
    },

    cardMenuInfo: {
        selectorName: {
            CARD: '.card-menu__card',
            CARD_BTN: '.card-menu__card button',
            SELECTED: 'card-menu__selected'
        }
    },

    sliderBtnInfo: {
        selectorName: {
            SLIDER_BTNS: '#slider__btn button',
        }
    }
}

const templateOption = {
    DATA_AREA: '#carousel-wrap'
}