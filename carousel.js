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

        this.setPreviousBtn(previousBtn);
        this.setPNextBtn(nextBtn);
        return [previousBtn, nextBtn];
    }

    setPreviousBtn(previousBtn) {
        previousBtn.addEventListener('click', () => {
            if (this.slideIndex <= 0) return;
            this.slideIndex--;
            this.setClickEvent();
        })
    }

    setPNextBtn(nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (this.slideIndex >= this.slideItemlength - 1) return;
            this.slideIndex++;
            this.setClickEvent();
        })
    }


    setClickEvent(sliderBtn, plusIndex) {
        // return sliderBtn.addEventListener('click', () => {
        // plusIndex ? this.slideIndex++ : this.slideIndex--;
        this.slides.style.transition = 'all 0.4s ease-in-out';
        this.moveSlides(this.slideIndex);
        this.getCurrentSlideId();
        // });
    }

    getCurrentSlideId() {
        this.slides.addEventListener('transitionend', () => {
            const FIRSTSLIDE_INDEX = 1,
                LASTSLIDE_INDEX = 2

            const lastSlideIndex = this.slideItemlength - LASTSLIDE_INDEX,
                currentSlideId = this.slideItems[this.slideIndex].id;
            console.log(1, this.slideIndex)


            if (currentSlideId === this.selectorName.LASTCLONE) {
                this.changeSlideIndex(lastSlideIndex);
            }

            if (currentSlideId === this.selectorName.FIRSTCLONE) {
                this.changeSlideIndex(FIRSTSLIDE_INDEX);
            }
            return currentSlideId;
        })
    }


    changeSlideIndex(index) {
        this.slides.style.transition = 'none';
        this.slideIndex = index;
        console.log(2, this.slideIndex)
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











