class Carousel {
  constructor(option) {
    this.item = document.querySelector(option.item);
    this.offset = this.item.firstElementChild.offsetWidth;
    this.size = this.item.childElementCount - 1;
    this.index = option.random ? Math.floor(Math.random() * (this.size + 1)) : 0;
    this.button = document.querySelector(option.button);
    [this.button.prev, this.button.next] = this.button.children;
    this.card = document.querySelectorAll(option.card);
    this.slideItem();
    this.clickButton();
    this.clickCard();
  }

  slideItem() {
    this.item.style.transform = `translateX(-${this.index * this.offset}px)`;
  }

  clickButton() {
    this.button.prev.addEventListener("click", () => {
      this.index -= 1;
    });

    this.button.next.addEventListener("click", () => {
      this.index += 1;
    });

    this.button.addEventListener("click", () => {
      this.checkSize(this.index);
      this.slideItem();
    });
  }

  clickCard() {
    this.card.forEach((eachCard, index) => {
      eachCard.addEventListener("click", () => {
        this.index = index;
        this.slideItem();
      });
    });
  }

  checkSize(currentIndex) {
    if (currentIndex < 0) this.index = this.size;
    else if (currentIndex > this.size) this.index = 0;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const carousel = new Carousel({
    item: ".slider__list",
    button: ".slider__btn",
    card: ".card-category__card",
    random: true,
  });
});
