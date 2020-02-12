class Carousel {
  constructor(elem) {
    this.elem = document.querySelector(elem);
    this.offset = this.elem.firstElementChild.offsetWidth;
    this.size = this.elem.childElementCount - 1;
    this.index = 0;
  }

  move(count) {
    this.index += count;
    this.checkSize(this.index);
    this.elem.style.transform = `translateX(-${this.index * this.offset}px)`;
  }

  checkSize(index) {
    if (index < 0) this.index = this.size;
    else if (index > this.size) this.index = 0;
  }
}

class Button {
  constructor(prevBtn, nextBtn) {
    this.prevBtn = document.querySelector(prevBtn);
    this.nextBtn = document.querySelector(nextBtn);
  }

  clickPrev() {
    return -1;
  }

  clickNext() {
    return 1;
  }
}

class Card {
  constructor() {}
}

window.addEventListener("DOMContentLoaded", event => {
  const carousel = new Carousel(".slider__list");
  const button = new Button(".btn__previous", ".btn__next");

  button.prevBtn.addEventListener("click", e => {
    carousel.move(button.clickPrev());
  });

  button.nextBtn.addEventListener("click", e => {
    carousel.move(button.clickNext());
  });
});
