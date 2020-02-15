class CarouselSlider {
    constructor(sliderData, transitionProperty, selectorName) {
        this.slides = sliderData.slides;
        this.slideIndex = sliderData.slideIndex;
        this.slideSize = this.slides.firstElementChild.clientWidth;
        this.transitionProperty = transitionProperty;
        this.selectorName = selectorName;
    }

    getSliderInfo() {
        this.slideItems = $(this.selectorName.SLIDE_ITEM, true);
        this.slideItemlength = this.slideItems.length;
        return [this.slideItems, this.slideItemlength];
    }

    cloneSlide() {
        const { firstElementChild, lastElementChild } = this.slides,
            firstClone = firstElementChild.cloneNode(true),
            lastClone = lastElementChild.cloneNode(true);

        firstClone.id = this.selectorName.FIRSTCLONE;
        lastClone.id = this.selectorName.LASTCLONE;
        this.slides.append(firstClone);
        this.slides.prepend(lastClone);
        this.getSliderInfo();
        this.moveSlides(this.slideIndex);
    }

    moveSlides() {
        return this.slides.style.transform = 'translateX(' + (-this.slideSize * this.slideIndex) + 'px)';
    }

    setTransition() {
        const { name, duration, timingFunc } = this.transitionProperty;
        this.slides.style.transition = `${name} ${duration} ${timingFunc}`;
        this.moveSlides();
        this.checkCurrentSlideId();
    }

    checkCurrentSlideId() {
        this.slides.addEventListener('transitionend', () => {
            const FIRSTSLIDE_INDEX = 1,
                LASTSLIDE_INDEX = 2

            const lastSlideIndex = this.slideItemlength - LASTSLIDE_INDEX,
                currentSlideId = this.slideItems[this.slideIndex].id;

            if (currentSlideId === this.selectorName.LASTCLONE) {
                this.removeTransition(lastSlideIndex);
            }

            if (currentSlideId === this.selectorName.FIRSTCLONE) {
                this.removeTransition(FIRSTSLIDE_INDEX);
            }
            return currentSlideId;
        })
    }

    removeTransition(index) {
        this.slides.style.transition = 'none';
        this.slideIndex = index;
        this.moveSlides();
    }
}

class CarouselSliderBtn {
    constructor(carouselSlider, selectorName) {
        this.slider = carouselSlider;
        this.selectorName = selectorName;
    }

    setSliderBtns() {
        const [previousBtn, nextBtn] = $(this.selectorName.SLIDER_BTNS, true);
        this.setPreviousBtn(previousBtn);
        this.setNextBtn(nextBtn);
    }

    setPreviousBtn(previousBtn) {
        previousBtn.addEventListener('click', () => {
            if (this.slider.slideIndex <= 0) return;
            this.slider.slideIndex--;
            this.slider.setTransition();
        })
    }

    setNextBtn(nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (this.slider.slideIndex >= this.slider.slideItemlength - 1) return;
            this.slider.slideIndex++;
            this.slider.setTransition();
        })
    }
}
class CarouselCardMenu {
    constructor(carouselSlider, selectorName) {
        this.slider = carouselSlider;
        this.selectorName = selectorName;
    }

    setCardBtns() {
        const cardBtns = $(this.selectorName.CARD_BTN, true);

        return cardBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.slider.setTransition();
                this.slider.slideIndex = index + 1;
                this.slider.moveSlides();
            })
        })
    }
}











