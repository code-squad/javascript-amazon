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
    this.itemWidth = this.card.offsetWidth;
  }

  init() {
    this.cardWrapper.style.width = `${this.itemWidth}px`;
  }
}

export default Carousel;
