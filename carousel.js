class Carousel {
  constructor() {
    //DOM
    this.container = document.querySelector(".container");
    this.nav = this.container.querySelector(".nav");
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
    this.infiinite = true;
    this.nextObj = {
      start: 1,
      end: this.itemLength,
      getId: () => this.currentItem + 1
    };
    this.prevObj = {
      start: this.itemLength,
      end: 1,
      getId: () => this.currentItem - 1
    };
    this.selectObj = {
      getId: index => index + 1
    };
  }

  init() {
    this.cardWrapper.style.width = `${this.itemWidth}px`;
    this.attatchEvent();
    if (this.infiinite) {
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
    this.prevButton.addEventListener(
      "click",
      this.move.bind(this, this.prevObj)
    );
    this.nextButton.addEventListener(
      "click",
      this.move.bind(this, this.nextObj)
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
    if (this.infiinite) return;
    this.prevButton.disabled = this.currentItem === 1 ? true : false;
    this.nextButton.disabled =
      this.currentItem === this.itemLength ? true : false;
  }

  move({ start, end, getId }) {
    const id = this.infiinite && this.currentItem === end ? start : getId();
    this.offset = this.infiinite
      ? -(this.itemWidth * id)
      : -(this.itemWidth * (id - 1));
    this.currentItem = id;
    this.isMovable();
    this.cardSlider.style.transform = `translateX(${this.offset}px)`;
  }
}

export default Carousel;
