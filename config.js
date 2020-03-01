export const fetchOption = {
    DATA_URL: 'http://127.0.0.1:8080/',
    LOCAL_STORAGE_KEY: 'carouselData',
}

export const SearchModelOption = {
    DATA_URL: 'http://127.0.0.1:8080/search/',
    LOCAL_STORAGE_KEY: 'searchData',
}

export const carouselOption = {
    sliderInfo: {
        transitionProperty: {
            NAME: 'all',
            DURATION: '.3s',
            TIMING_FUNC: 'ease-in-out'
        },

        selector: {
            SLIDES: '.slider__list',
            FIRST_CLONE: 'slider-firstClone',
            LAST_CLONE: 'slider-lastClone',
            SLIDE_ITEM: '.slider__item',
        },
    },

    cardMenuInfo: {
        selector: {
            CARD: '.card-menu__card',
            CARD_BTN: '.card-menu__card button',
            SELECTED: 'card-menu__selected'
        },
    },

    sliderBtnInfo: {
        selector: {
            SLIDER_BTNS: '#slider__btn button',
        },
    },
}

export const templateOption = {
    DATA_AREA: '#carousel'
}