class Carousel {
  constructor(config) {
    //DOM
    this.container = document.querySelector(".container");
    this.navItems = this.container.querySelectorAll(".nav-item");
    this.cardSlider = this.container.querySelector(".card-slider");
    this.prevButton = this.container.querySelector(".prev");
    this.nextButton = this.container.querySelector(".next");

    // values
    this.initIndex = 0;
    this.itemWidth = this.cardSlider.firstElementChild.getBoundingClientRect().width;
    this.offset = 0;
    this.currentItem = this.initIndex + 1;
    this.itemLength = this.cardSlider.querySelectorAll(".card").length;

    this.defaultConfig = {
      infinite: true
    };

    this.config = this.mergeConfig(config);
  }

  mergeConfig(config) {
    return Object.assign(this.defaultConfig, config);
  }

  setOpacity(el, val) {
    el.style.opacity = val;
  }

  init() {
    const cardWrapper = this.container.querySelector(".card-wrapper");
    cardWrapper.style.width = `${this.itemWidth}px`;
    this.attatchEvent();
    if (this.config.infinite) {
      this.cloneVirtualCard();
      this.move({
        getId: () => this.initIndex + 1
      });
    } else {
      this.isMovable();
    }
    this.setOpacity(this.container, 1);
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
    this.navItems.forEach((item, index) => {
      item.addEventListener("click", () =>
        this.move({
          getId: () => index + 1
        })
      );
    });
  }

  isMovable() {
    if (this.config.infinite) return;
    this.prevButton.disabled = !!this.currentItem;
    this.nextButton.disabled = !!(this.currentItem === this.itemLength)
  }

  move({ to, from, getId }) {
    const id = this.isEndOfCards(from) ? to : getId();
    this.offset = this.config.infinite
      ? -(this.itemWidth * id)
      : -(this.itemWidth * (id - 1));
    this.currentItem = id;
    this.isMovable();
    this.selectNav();
    this.moveSlider();
  }

  moveSlider() {
    this.cardSlider.style.transform = `translateX(${this.offset}px)`;
  }

  isEndOfCards(from) {
    return this.config.infinite && this.currentItem === from;
  }

  selectNav() {
    this.navItems.forEach((item, index) => {
      if (index + 1 === this.currentItem) item.classList.add("selected");
      else item.classList.remove("selected");
    });
  }
}

export default Carousel;
