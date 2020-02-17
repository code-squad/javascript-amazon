import { $, $$ } from "./selector.js";

class Carousel {
  constructor(item, button, option) {
    this.item = $(item);
    this.button = $(button);
    this.cardBtn = $$(option.cardBtn);
    this.size = this.item.childElementCount - 2;
    this.index = this.setIndex(option.index, option.useRandomIndex);
    this.slide = {
      duration: option.slideDuration || 0.4,
      timingFunction: option.slideTimingFunction || `ease`,
    };
    this.slideTransition = `transform ${this.slide.duration}s ${this.slide.timingFunction}`;
    this.setup();
  }

  setup() {
    this.slideItem();
    this.addEventClickBtn();
    this.cycleCarousel();
    this.displayActiveCard();
    this.addEventClickCard();
  }

  setIndex(index = 1, randomIndexOption = false) {
    if (randomIndexOption) {
      return Math.floor(Math.random() * this.size) + 1;
    }
    if (index > this.size || index < 1) {
      return 1;
    }
    return index;
  }

  slideItem() {
    this.offset = this.index * this.item.firstElementChild.offsetWidth;
    this.item.style.transform = `translateX(-${this.offset}px)`;
  }

  addEventClickBtn() {
    const [prevBtn, nextBtn] = this.button.children;
    prevBtn.addEventListener("click", () => {
      this.index -= 1;
      if (this.index < 0) this.index = 0;
    });
    nextBtn.addEventListener("click", () => {
      this.index += 1;
      if (this.index > this.size + 1) this.index = this.size + 1;
    });
    this.button.addEventListener("click", () => {
      this.item.style.transition = this.slideTransition;
      this.slideItem();
    });
  }

  cycleCarousel() {
    this.item.addEventListener("transitionend", () => {
      if (this.item.children[this.index].id === "last-clone") {
        this.item.style.transition = "none";
        this.index = this.size;
        this.slideItem();
      }
      if (this.item.children[this.index].id === "first-clone") {
        this.item.style.transition = "none";
        this.index = 1;
        this.slideItem();
      }
      this.displayActiveCard();
    });
  }

  addEventClickCard() {
    if (!this.cardBtn) return;
    this.cardBtn.forEach((eachCard, index) => {
      eachCard.addEventListener("click", () => {
        this.index = index + 1;
        this.slideItem();
        this.item.style.transition = this.slideTransition;
      });
    });
  }

  displayActiveCard() {
    if (!this.cardBtn) return;
    const activeCardIndex = this.index - 1;
    this.cardBtn.forEach((eachCard, index) => {
      eachCard.classList.remove("active");
      if (activeCardIndex === index) {
        eachCard.classList.add("active");
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const carousel = new Carousel(".slider-list", ".slider-btn", {
    cardBtn: ".card-category-card",
    index: 2,
    useRandomIndex: false,
  });
});
