import { $, $$ } from "./selector.js";

class Carousel {
  constructor(item, button, option) {
    this.item = $(item);
    this.button = $(button);
    this.card = $$(option.card);
    this.size = this.item.childElementCount - 1;
    this.index = this.setIndex(option.index, option.useRandomIndex);
    this.transition = {
      duration: option.transitionDuration,
      timingFunction: option.transitionTimingFunction,
    };
    this.setup();
  }

  setup() {
    this.slideItem();
    this.setAnimation(this.slideItem().offset, this.transition.duration, this.transition.timingFunction);
    this.addEventClickBtn();
    if (this.card) {
      this.displayActiveCard();
      this.addEventClickCard();
    }
  }

  setIndex(index = 0, randomIndexOption = false) {
    if (randomIndexOption) {
      return Math.floor(Math.random() * (this.size + 1));
    }
    if (index > this.size || index < 0) {
      return 0;
    }
    return index;
  }

  slideItem() {
    this.offset = this.index * this.item.firstElementChild.offsetWidth;
    this.item.style.transform = `translateX(-${this.offset}px)`;
    return { offset: `translateX(-${this.offset}px)` };
  }

  setAnimation(currentTransformOffset, duration = 0.5, timingFunction = `ease`) {
    if (this.item.style.transform === currentTransformOffset) {
      this.item.style.transition = `transform ${duration}s ${timingFunction}`;
    }
  }

  addEventClickBtn() {
    const [prevBtn, nextBtn] = this.button.children;
    prevBtn.addEventListener("click", () => {
      this.index -= 1;
    });
    nextBtn.addEventListener("click", () => {
      this.index += 1;
    });
    this.button.addEventListener("click", () => {
      this.goSideIndex(this.index);
      this.displayActiveCard();
    });
  }

  addEventClickCard() {
    this.card.forEach((eachCard, index) => {
      eachCard.addEventListener("click", () => {
        this.goCardIndex(index);
        this.displayActiveCard();
      });
    });
  }

  displayActiveCard() {
    this.card.forEach((eachCard, index) => {
      eachCard.classList.remove("active");
      if (this.index === index) eachCard.classList.add("active");
    });
  }

  goSideIndex(currentIndex) {
    if (currentIndex < 0) this.index = this.size;
    else if (currentIndex > this.size) this.index = 0;
    this.slideItem();
  }

  goCardIndex(index) {
    this.index = index;
    this.slideItem();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const carousel = new Carousel(".slider-list", ".slider-btn", {
    card: ".card-category-card",
    index: 1,
    useRandomIndex: false,
    transitionDuration: 1,
    transitionTimingFunction: `ease`,
  });
});
