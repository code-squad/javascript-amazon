import { _$ } from '/util.js';

export class CarouselSlider {
    constructor(sliderInfo) {
        this.slideIndex = 1;
        this.selector = sliderInfo.selector;
        this.slides = _$(this.selector.SLIDES);
        this.slideSize = this.slides.firstElementChild.clientWidth;
        this.transitionProperty = sliderInfo.transitionProperty;
    }

    getSliderInfo() {
        this.slideItems = _$(this.selector.SLIDE_ITEM, true);
        this.slideLength = this.slideItems.length;
        this.lastSlideIndex = this.slideItems.length - 1
    }

    cloneSlide() {
        const { firstElementChild, lastElementChild } = this.slides,
            firstClone = firstElementChild.cloneNode(true),
            lastClone = lastElementChild.cloneNode(true);

        firstClone.id = this.selector.FIRST_CLONE;
        lastClone.id = this.selector.LAST_CLONE;
        this.slides.append(firstClone);
        this.slides.prepend(lastClone);
        this.getSliderInfo();
        this.moveSlides(this.slideIndex);
    }

    moveSlides() {
        return this.slides.style.transform = 'translateX(' + (-this.slideSize * this.slideIndex) + 'px)';
    }

    addTransition() {
        const { NAME, DURATION, TIMING_FUNC } = this.transitionProperty;

        this.slides.style.transition = `${NAME} ${DURATION} ${TIMING_FUNC}`;
        this.moveSlides();
        this.checkCurrentSlideId();
    }

    checkCurrentSlideId() {
        this.slides.addEventListener('transitionend', () => {
            const FIRST_SLIDE_INDEX = 1
            const currentSlideId = this.slideItems[this.slideIndex].id;

            let lastSlideIndex = 2;
            lastSlideIndex = this.slideLength - lastSlideIndex;

            if (currentSlideId === this.selector.LAST_CLONE)
                this.removeTransition(lastSlideIndex);

            if (currentSlideId === this.selector.FIRST_CLONE)
                this.removeTransition(FIRST_SLIDE_INDEX);
        })
    }

    removeTransition(index) {
        this.slides.style.transition = 'none';
        this.slideIndex = index;
        this.moveSlides();
    }
}
