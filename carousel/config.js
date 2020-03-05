export const fetchInfo = {
    dataUrl: 'http://127.0.0.1:8080/',
    localStorageKey: 'carouselData',
    requestOption : {
        method: "GET",
     }
}

export const sliderInfo= {
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
    }

 export const cardMenuInfo= {
        selector: {
            card: '.card-menu__card',
            cardBtn: '.card-menu__card button',
            selected: 'card-menu__selected'
        },
    }

 export const sliderBtnInfo= {
        selector: {
            sliderBtns: '#slider__btn button',
        },
    }

export const templateInfo = {
    dataArea: '#carousel'
}
