import { setTranslateX, setTransition, changeScale } from "../lib/util.js";

class Carousel {
  constructor(config) {
    this.config = config;
    this.slideAll = config.slideAll;
    this.width = config.MAX_PANEL_SIZE;
    this.currentIndex = config.START_CAROUSEL_INDEX;
    this.maxScale = 1.1;
    this.minScale = 1.0;
    this.isMoveFinished = config.isMoveFinished;
    this.nav = document.querySelectorAll(".slide-navigation > li");
    this.init();
  }

  init() {
    this.buttonHandler();
    this.navigationHandler();
    changeScale(this.nav[this.currentIndex - 1], this.maxScale);
  }

  moveSlides(option) {
    setTranslateX(this.slideAll, this.currentIndex, this.width);
    setTransition(this.slideAll, option);
    changeScale(this.nav[this.currentIndex - 1], this.maxScale);
  }

  clickEvent(index) {
    if (this.isMoveFinished === false) return;
    this.isMoveFinished = false;
    changeScale(this.nav[this.currentIndex - 1], this.minScale);

    const transitionOption = `transform 0.4s ease-in-out`;
    const leftBtnIndex = 0;
    let prevIndex = this.currentIndex - 1;
    let nextIndex = this.currentIndex + 1;
    this.currentIndex = index === leftBtnIndex ? prevIndex : nextIndex;
    this.moveSlides(transitionOption);
  }

  transitionendEvent() {
    const transitionOption = "none";
    const minIndex = this.config.START_CAROUSEL_INDEX;
    const maxIndex = this.config.MAX_CAROUSEL_SIZE;

    if (this.currentIndex === minIndex - 1) {
      this.currentIndex = maxIndex - 1;
      this.moveSlides(transitionOption);
    } else if (this.currentIndex === maxIndex) {
      this.currentIndex = minIndex;
      this.moveSlides(transitionOption);
    }
    this.isMoveFinished = true;
  }

  buttonHandler() {
    const buttons = this.config.buttons;
    setTranslateX(this.slideAll, this.currentIndex, this.width);

    buttons.forEach((element, index) => {
      element.addEventListener("click", () => this.clickEvent(index));
    });

    this.slideAll.addEventListener("transitionend", () => this.transitionendEvent());
  }

  navigationHandler() {
    const transitionOption = `transform 0.4s ease-in-out`;
    setTranslateX(this.slideAll, this.currentIndex, this.width);

    this.nav.forEach((el, index) => {
      let nextIndex = index + 1;

      el.addEventListener("click", () => {
        if (nextIndex === this.currentIndex) return;
        changeScale(this.nav[this.currentIndex - 1], this.minScale);
        this.currentIndex = nextIndex;
        this.moveSlides(transitionOption);
      });
    });
  }
}

export { Carousel };
