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
        this.slideLength = this.slideItems.length;
        return [this.slideItems, this.slideLength];
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
        this.slides.style.transform = 'translateX(' + (-this.slideSize * this.slideIndex) + 'px)';
    }

    addTransition() {
        const { name, duration, timingFunc } = this.transitionProperty;

        this.slides.style.transition = `${name} ${duration} ${timingFunc}`;
        this.moveSlides();
        this.checkCurrentSlideId();
    }

    checkCurrentSlideId() {
        this.slides.addEventListener('transitionend', () => {
            const FIRSTSLIDE_INDEX = 1,
                LASTSLIDE_INDEX = 2

            const lastSlideIndex = this.slideLength - LASTSLIDE_INDEX,
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

class CarouselCardMenu {
    constructor(carouselSlider, selectorName) {
        this.slider = carouselSlider;
        this.selectorName = selectorName;
        this.cards = $(this.selectorName.CARD, true);
    }

    setCardBtns() {
        const cardBtns = $(this.selectorName.CARD_BTN, true);

        this.setCardBtnIndex();
        return cardBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.slider.slideIndex = index + 1;
                this.addScaleEffect(btn);
                this.slider.addTransition();
            })
        })
    }

    setCardBtnIndex() {
        const FIRSTINDEX = 0,
            lastCardIndex = this.cards.length - 1,
            lastSlideIndex = this.slider.slideLength - 1;
        this.cardIndices = [];

        this.slider.slideItems.forEach((_, index) => {
            if (index === FIRSTINDEX) {
                this.cardIndices[index] = lastCardIndex;
            } else if (index === lastSlideIndex) {
                this.cardIndices[index] = FIRSTINDEX
            }
            else {
                this.cardIndices[index] = index - 1
            }
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
    constructor(carouselSlider, carouselCardMenu, selectorName) {
        this.slider = carouselSlider;
        this.cardMenu = carouselCardMenu;
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

            this.slider.addTransition();
            this.cardMenu.addScaleEffect();
        })
    }

    setNextBtn(nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (this.slider.slideIndex >= this.slider.slideLength - 1) return;
            this.slider.slideIndex++;
            console.log(this.slider.slideIndex)
            this.slider.addTransition();
            this.cardMenu.addScaleEffect();
        })
    }
}












