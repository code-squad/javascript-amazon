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

  movetoIndex(count) {
    this.index = count;
    this.elem.style.transform = `translateX(-${this.index * this.offset}px)`;
  }

  checkSize(index) {
    if (index < 0) this.index = this.size;
    else if (index > this.size) this.index = 0;
  }
}

class Button {
  constructor(elem) {
    this.elem = document.querySelector(elem);
  }

  click(target) {
    if (target.id === "prev") return -1;
    else if (target.id === "next") return 1;
  }
}

class Card {
  constructor(elem) {
    this.elem = document.querySelectorAll(elem);
  }
}

window.addEventListener("DOMContentLoaded", event => {
  const carousel = new Carousel(".slider__list");
  const button = new Button(".slider__btn");
  const card = new Card(".card-category__card");

  button.elem.addEventListener("click", e => {
    carousel.move(button.click(e.target));
  });

  card.elem.forEach((target, index) => {
    card.elem[index].addEventListener("click", () => {
      carousel.movetoIndex(index);
    });
  });
});
