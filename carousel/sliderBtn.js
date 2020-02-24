import { $ } from '/util.js';

export class CarouselSliderBtn {
    constructor({ carouselSlider, carouselCardMenu, sliderBtnInfo }) {
        this.slider = carouselSlider;
        this.cardMenu = carouselCardMenu;
        this.selectorName = sliderBtnInfo.selectorName;
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
