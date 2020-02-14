class Carousel {
  constructor(item, button, option) {
    this.item = document.querySelector(item);
    this.size = this.item.childElementCount - 1;
    if (!option.index || option.index > this.size || option.index < 0) {
      this.index = 0;
    } else this.index = option.index;
    if (option.useRandomIndex) {
      this.index = Math.floor(Math.random() * (this.size + 1));
    }
    this.button = document.querySelector(button);
    this.card = document.querySelectorAll(option.card);
    this.slideItem();
    this.activeCard();
    this.clickButton();
    this.clickCard();
  }

  slideItem() {
    const offset = this.item.firstElementChild.offsetWidth;
    this.item.style.transform = `translateX(-${this.index * offset}px)`;
  }

  clickButton() {
    const [prevBtn, nextBtn] = this.button.children;
    prevBtn.addEventListener("click", () => {
      this.index -= 1;
    });
    nextBtn.addEventListener("click", () => {
      this.index += 1;
    });
    this.button.addEventListener("click", () => {
      this.goSideIndex(this.index);
      this.activeCard();
    });
  }

  clickCard() {
    this.card.forEach((eachCard, index) => {
      eachCard.addEventListener("click", () => {
        this.goCardIndex(index);
        this.activeCard();
      });
    });
  }

  activeCard() {
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
    useRandomIndex: false,
    index: 1,
  });
});
