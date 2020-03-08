import { _$ } from "/util.js";

export class CarouselSliderBtn {
  constructor({ carouselSlider, carouselCardMenu, selector }) {
    this.slider = carouselSlider;
    this.cardMenu = carouselCardMenu;
    this.selector = selector;
  }

  setSliderBtns() {
    const [previousBtn, nextBtn] = _$(this.selector.sliderBtns, true);

    previousBtn.addEventListener("click", this.setPreviousBtn.bind(this));
    nextBtn.addEventListener("click", this.setNextBtn.bind(this));
  }

  setPreviousBtn() {
    if (this.slider.slideIndex <= 0) return;
    this.slider.slideIndex--;
    this.slider.addTransition();
    this.cardMenu.addScaleEffect(true);
  }

  setNextBtn() {
    if (this.slider.slideIndex >= this.slider.lastSlideIndex) return;
    this.slider.slideIndex++;
    this.slider.addTransition();
    this.cardMenu.addScaleEffect(true);
  }
}
