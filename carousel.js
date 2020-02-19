class CarouselSlider {
    constructor(sliderInfo) {
        this.slides = sliderInfo.sliderData.slides;
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

class CarouselCardMenu {
    constructor(option) {
        this.slider = option.carouselSlider;
        this.selectorName = option.selectorName;
        this.cards = $(this.selectorName.CARD, true);
    }

    setCardBtns() {
        const cardBtns = $(this.selectorName.CARD_BTN, true);

        this.setCardBtnIndex();
        cardBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.slider.slideIndex = index + 1;
                this.addScaleEffect(btn);
                this.slider.addTransition();
            })
        })
    }

    setCardBtnIndex() {
        const FIRST_INDEX = 0,
            lastCardIndex = this.cards.length - 1;

        this.cardIndices = [];

        this.slider.slideItems.forEach((_, index) => {
            if (index === FIRST_INDEX) this.cardIndices[index] = lastCardIndex;
            else if (index === this.slider.lastSlideIndex) this.cardIndices[index] = FIRST_INDEX;
            else this.cardIndices[index] = index - 1;
        })
    }

    addScaleEffect() {
        const selected = $(`.${this.selectorName.SELECTED}`),
            selectedCardIndex = this.cardIndices[this.slider.slideIndex];

        selected.classList.remove(this.selectorName.SELECTED);
        this.cards[selectedCardIndex].classList.add(this.selectorName.SELECTED);
    }
}

class CarouselSliderBtn {
    constructor(option) {
        this.slider = option.carouselSlider;
        this.cardMenu = option.carouselCardMenu;
        this.selectorName = option.selectorName;
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
            this.slider.addTransition();
            this.cardMenu.addScaleEffect();
        })
    }

    setNextBtn(nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (this.slider.slideIndex >= this.slider.lastSlideIndex) return;
            this.slider.slideIndex++;
            this.slider.addTransition();
            this.cardMenu.addScaleEffect();
        })
    }
}
