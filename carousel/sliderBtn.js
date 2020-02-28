import { _$ } from '/util.js';

export class CarouselSliderBtn {
    constructor({ carouselSlider, carouselCardMenu, sliderBtnInfo }) {
        this.slider = carouselSlider;
        this.cardMenu = carouselCardMenu;
        this.selector = sliderBtnInfo.selector;
    }

    setSliderBtns() {
        const [previousBtn, nextBtn] = _$(this.selector.SLIDER_BTNS, true);

        previousBtn.addEventListener('click', this.setPreviousBtn.bind(this))
        nextBtn.addEventListener('click', this.setNextBtn.bind(this))
    }

    setPreviousBtn() {
        if (this.slider.slideIndex <= 0) return;
        this.slider.slideIndex--;
        this.slider.addTransition();
        this.cardMenu.addScaleEffect();
    }

    setNextBtn() {
        if (this.slider.slideIndex >= this.slider.lastSlideIndex) return;
        this.slider.slideIndex++;
        this.slider.addTransition();
        this.cardMenu.addScaleEffect();
    }
}
