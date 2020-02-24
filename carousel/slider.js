import { $ } from '/util.js';

export class CarouselSlider {
    constructor(sliderInfo) {
        this.slides = $(sliderInfo.sliderData.slides);
        this.slideIndex = sliderInfo.sliderData.slideIndex;
        this.slideSize = this.slides.firstElementChild.clientWidth;
        this.transitionProperty = sliderInfo.transitionProperty;
        this.selectorName = sliderInfo.selectorName;
    }

    getSliderInfo() {
        this.slideItems = $(this.selectorName.SLIDE_ITEM, true);
        this.slideLength = this.slideItems.length;
        this.lastSlideIndex = this.slideItems.length - 1
    }

    cloneSlide() {
        const { firstElementChild, lastElementChild } = this.slides,
            firstClone = firstElementChild.cloneNode(true),
            lastClone = lastElementChild.cloneNode(true);

        firstClone.id = this.selectorName.FIRST_CLONE;
        lastClone.id = this.selectorName.LAST_CLONE;
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
            const FIRST_SLIDE_INDEX = 1,
                LAST_SLIDE_INDEX = 2

            const lastSlideIndex = this.slideLength - LAST_SLIDE_INDEX,
                currentSlideId = this.slideItems[this.slideIndex].id;

            if (currentSlideId === this.selectorName.LAST_CLONE)
                this.removeTransition(lastSlideIndex);

            if (currentSlideId === this.selectorName.FIRST_CLONE)
                this.removeTransition(FIRST_SLIDE_INDEX);
        })
    }

    removeTransition(index) {
        this.slides.style.transition = 'none';
        this.slideIndex = index;
        this.moveSlides();
    }
}