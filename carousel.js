class CarouselSlider {
    constructor(sliderData, selectorName) {
        this.slides = sliderData.slides,
            this.slideIndex = sliderData.slideIndex,
            this.slideSize = this.slides.firstElementChild.clientWidth,
            this.selectorName = selectorName
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
        return [firstClone, lastClone];
    }

    moveSlides(slideIndex) {
        return this.slides.style.transform = 'translateX(' + (-this.slideSize * slideIndex) + 'px)';
    }

    setSliderBtns() {
        const [previousBtn, nextBtn] = $(this.selectorName.SLIDER_BTNS, true);

        this.setClickEvent(previousBtn);
        this.setClickEvent(nextBtn, 'plus');
        return [previousBtn, nextBtn];
    }

    setClickEvent(sliderBtn, plusIndex) {
        return sliderBtn.addEventListener('click', () => {
            plusIndex ? this.slideIndex++ : this.slideIndex--;
            this.moveSlides(this.slideIndex);
            this.getCurrentSlideId();
        });
    }

    getCurrentSlideId() {
        const FIRSTSLIDE_INDEX = 1,
            LASTSLIDE_INDEX = 2

        const lastSlideIndex = this.slideItemlength - LASTSLIDE_INDEX,
            currentSlideId = this.slideItems[this.slideIndex].id;

        if (currentSlideId === this.selectorName.LASTCLONE) {
            this.changeSlideIndex(lastSlideIndex);
        }

        if (currentSlideId === this.selectorName.FIRSTCLONE) {
            this.changeSlideIndex(FIRSTSLIDE_INDEX);
        }
        return currentSlideId;
    }

    changeSlideIndex(index) {
        this.slideIndex = index;
        this.moveSlides(this.slideIndex);
        return this.slideIndex;
    }
}

class CarouselCardMenu {
    constructor(sliderData, selectorName) {
        this.sliderData = sliderData,
            this.selectorName = selectorName
    }

    setCardBtns() {
        const cardBtns = $(this.selectorName.CARD_BTN, true);

        return cardBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.sliderData.moveSlides(index + 1);
            })
        })
    }
}











