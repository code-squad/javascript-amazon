class Carousel {
  constructor() {
    //DOM
    this.container = document.querySelector(".container");
    this.nav = this.container.querySelector(".nav");
    this.cardWrapper = this.container.querySelector(".card-wrapper");
    this.cardSlider = this.container.querySelector(".card-slider");
    this.card = this.cardSlider.querySelector(".card");
    this.prevButton = this.cardWrapper.querySelector(".prev");
    this.nextButton = this.cardWrapper.querySelector(".next");

    this.attachEvent();
  }

  attachEvent() {
    window.addEventListener("load", () => {
      this.cardWrapper.style.width = `${this.card.offsetWidth}px`;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const carousel = new Carousel();
});
