export const fetchOption = {
    dataUrl: 'http://127.0.0.1:8080/',
    localStorageKey: 'carouselData',
}

export const carouselOption = {
    sliderInfo: {
        transitionProperty: {
            name: 'all',
            duration: '.3s',
            timingFunc: 'ease-in-out'
        },

        selector: {
            slides: '.slider__list',
            firstClone: 'slider-firstClone',
            lastClone: 'slider-lastClone',
            slideItem: '.slider__item',
        },
    },

    cardMenuInfo: {
        selector: {
            card: '.card-menu__card',
            cardBtn: '.card-menu__card button',
            selected: 'card-menu__selected'
        },
    },

    sliderBtnInfo: {
        selector: {
            sliderBtns: '#slider__btn button',
        },
    },
}

export const templateOption = {
    dataArea: '#carousel'
}
