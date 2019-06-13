class Carousel {
  constructor() {
    //DOM
    this.container = document.querySelector(".container");
    this.nav = this.container.querySelector(".nav");
    this.cardWrapper = this.container.querySelector(".card-wrapper");
    this.cardSlider = this.container.querySelector(".card-slider");
    this.card = this.cardSlider.querySelector(".card");
    this.prevButton = this.container.querySelector(".prev");
    this.nextButton = this.container.querySelector(".next");
    this.itemWidth = this.card.offsetWidth;
    this.offset = 0;
    this.currentItem = 1;
    this.itemLength = this.cardSlider.querySelectorAll(".card").length;
  }

  init() {
    this.cardWrapper.style.width = `${this.itemWidth}px`;
    this.attatchEvent();
    this.isMovable();
    this.container.style.opacity = 1;
  }

  attatchEvent() {
    this.prevButton.addEventListener("click", this.moveToPrev.bind(this));
    this.nextButton.addEventListener("click", this.moveToNext.bind(this));
  }

  moveToPrev() {
    this.offset += this.itemWidth;
    this.currentItem -= 1;
    this.isMovable();
    this.move();
  }

  moveToNext() {
    this.offset -= this.itemWidth;
    this.currentItem += 1;
    this.isMovable();
    this.move();
  }

  isMovable() {
    this.prevButton.disabled = this.currentItem === 1 ? true : false;
    this.nextButton.disabled =
      this.currentItem === this.itemLength ? true : false;
  }

  move() {
    this.cardSlider.style.transform = `translateX(${this.offset}px)`;

    // debugger;
  }
}

export default Carousel;
