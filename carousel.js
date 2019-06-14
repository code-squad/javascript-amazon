class Carousel {
  constructor() {
    //DOM
    this.container = document.querySelector(".container");
    this.navItems = this.container.querySelectorAll(".nav-item");
    this.cardWrapper = this.container.querySelector(".card-wrapper");
    this.cardSlider = this.container.querySelector(".card-slider");
    this.card = this.cardSlider.querySelector(".card");
    this.prevButton = this.container.querySelector(".prev");
    this.nextButton = this.container.querySelector(".next");

    // values
    this.initIndex = 0;
    this.itemWidth = this.card.getBoundingClientRect().width;
    this.offset = 0;
    this.currentItem = 1;
    this.itemLength = this.cardSlider.querySelectorAll(".card").length;
    this.infinite = true;
  }

  init() {
    this.cardWrapper.style.width = `${this.itemWidth}px`;
    this.attatchEvent();
    if (this.infinite) {
      this.cloneVirtualCard();
      this.move({
        getId: () => this.initIndex + 1
      });
    } else {
      this.isMovable();
    }
    this.container.style.opacity = 1;
  }

  cloneVirtualCard() {
    const firstCard = this.cardSlider.firstElementChild.cloneNode(true);
    const lastCard = this.cardSlider.lastElementChild.cloneNode(true);
    this.cardSlider.insertAdjacentElement("afterbegin", lastCard);
    this.cardSlider.insertAdjacentElement("beforeend", firstCard);
  }

  attatchEvent() {
    this.prevButton.addEventListener("click", () =>
      this.move({
        to: this.itemLength,
        from: 1,
        getId: () => this.currentItem - 1
      })
    );
    this.nextButton.addEventListener("click", () =>
      this.move({
        to: 1,
        from: this.itemLength,
        getId: () => this.currentItem + 1
      })
    );
    [...this.navItems].map((item, index) => {
      item.addEventListener("click", () =>
        this.move({
          getId: () => index + 1
        })
      );
    });
  }

  isMovable() {
    if (this.infinite) return;
    this.prevButton.disabled = this.currentItem === 1 ? true : false;
    this.nextButton.disabled =
      this.currentItem === this.itemLength ? true : false;
  }

  move({ to, from, getId }) {
    const id = this.isEndOfCards(from) ? to : getId();
    this.offset = this.infinite
      ? -(this.itemWidth * id)
      : -(this.itemWidth * (id - 1));
    this.currentItem = id;
    this.isMovable();
    this.moveSlider();
  }

  moveSlider() {
    this.cardSlider.style.transform = `translateX(${this.offset}px)`;
  }

  isEndOfCards(from) {
    return this.infinite && this.currentItem === from;
  }
}

export default Carousel;
