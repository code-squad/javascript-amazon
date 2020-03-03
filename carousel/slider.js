import { _$ } from '/util.js';

export class CarouselSlider {
    constructor(sliderInfo) {
        this.slideIndex = 1;
        this.selector = sliderInfo.selector;
        this.slides = _$(this.selector.slides);
        this.slideSize = this.slides.firstElementChild.clientWidth;
        this.transitionProperty = sliderInfo.transitionProperty;
    }

    getSliderInfo() {
        this.slideItems = _$(this.selector.slideItem, true);
        this.slideLength = this.slideItems.length;
        this.lastSlideIndex = this.slideItems.length - 1
    }

    cloneSlide() {
        const { firstElementChild, lastElementChild } = this.slides,
            firstClone = firstElementChild.cloneNode(true),
            lastClone = lastElementChild.cloneNode(true);

        firstClone.id = this.selector.firstClone;
        lastClone.id = this.selector.lastClone;
        this.slides.append(firstClone);
        this.slides.prepend(lastClone);
        this.getSliderInfo();
        this.moveSlides(this.slideIndex);
    }

    moveSlides() {
        return this.slides.style.transform = 'translateX(' + (-this.slideSize * this.slideIndex) + 'px)';
    }

    addTransition() {
        const { name, duration, timingFunc } = this.transitionProperty;

        this.slides.style.transition = `${name} ${duration} ${timingFunc}`;
        this.moveSlides();
        this.checkCurrentSlideId();
    }

    checkCurrentSlideId() {
        this.slides.addEventListener('transitionend', () => {
            const FIRST_SLIDE_INDEX = 1
            const currentSlideId = this.slideItems[this.slideIndex].id;

            let lastSlideIndex = 2;
            lastSlideIndex = this.slideLength - lastSlideIndex;

            if (currentSlideId === this.selector.lastClone)
                this.removeTransition(lastSlideIndex);

            if (currentSlideId === this.selector.firstClone)
                this.removeTransition(FIRST_SLIDE_INDEX);
        })
    }

    removeTransition(index) {
        this.slides.style.transition = 'none';
        this.slideIndex = index;
        this.moveSlides();
    }
}
