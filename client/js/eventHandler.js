import { CarouselMovement } from "./carouselMovement.js";
import { cssTransform, cssTransition } from "./util.js";

class EventHandler {
  constructor(config) {
    this.carouselMovement = new CarouselMovement(config);
    this.config = config;
    this.slideAll = config.slideAll;
    this.width = config.MAX_PANEL_SIZE;
    this.currentIndex = config.START_CAROUSEL_INDEX;
    this.isMoveFinished = config.isMoveFinished;
    this.nav = document.querySelectorAll(".slide-navigation > li");
    console.log("nnav", this.nav);

    this.init();
  }

  init() {
    this.buttonHandler();
    this.navigationHandler();
  }

  moveSlides(option) {
    cssTransform(this.slideAll, this.currentIndex, this.width);
    cssTransition(this.slideAll, option);
  }

  buttonHandler() {
    const buttons = this.config.buttons;
    cssTransform(this.slideAll, this.currentIndex, this.width);

    buttons.forEach((element, index) => {
      element.addEventListener("click", () => this.carouselMovement.clickEvent(index));
    });

    this.slideAll.addEventListener("transitionend", () =>
      this.carouselMovement.transitionendEvent()
    );
  }

  navigationHandler() {
    const transitionOption = `transform 0.4s ease-in-out`;
    cssTransform(this.slideAll, this.currentIndex, this.width);

    this.nav.forEach((el, index) => {
      el.addEventListener("click", () => {
        if (index + 1 === this.currentIndex) return;
        this.currentIndex = index + 1;
        console.log("index", this.currentIndex);
        this.moveSlides(transitionOption);
      });
    });
  }
}

export { EventHandler };
