import controller from "./controller.js";

class Carousel {
  constructor({container, slider}, config) {
    //DOM
    this.container = document.querySelector(container);
    this.cardSlider = this.container.querySelector(slider);

    this.prevButton = this.container.querySelector(".prev");
    this.nextButton = this.container.querySelector(".next");

    // values
    this.initIndex = 0;
    this.itemWidth = this.cardSlider.firstElementChild.getBoundingClientRect().width;
    this.offset = 0;
    this.currentItem = this.initIndex + 1;
    this.itemLength = this.cardSlider.children.length;
    this.isMoving = false;

    this.defaultConfig = {
      infinite: true,
      duration: 300,
      animation: 'cubic-bezier(0.240, -0.010, 0.400, 1.650)'
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
      this.moveWithoutTransition();
    } else {
      this.isMovable();
    }

    controller.carousel.regist(this.move.bind(this));

    this.setOpacity(this.container, 1);
  }

  cloneVirtualCard() {
    const firstCard = this.cardSlider.firstElementChild.cloneNode(true);
    const lastCard = this.cardSlider.lastElementChild.cloneNode(true);

    this.cardSlider.insertAdjacentElement("afterbegin", lastCard);
    this.cardSlider.insertAdjacentElement("beforeend", firstCard);
  }

  attatchEvent() {
    this.prevButton.addEventListener("click", () => {
      this.move({ getId: () => this.currentItem - 1 });
      const id = this.isFirst() ? this.itemLength : this.currentItem;
      controller.carousel.sendId(id);
    }
    );
    this.nextButton.addEventListener("click", () => {
      this.move({ getId: () => this.currentItem + 1 });
      const id = this.isLast() ? 1 : this.currentItem;
      controller.carousel.sendId(id);
    });

    this.cardSlider.addEventListener("transitionend", () => {
      this.isMoving = false;
      if (this.isEndOfCards()) {
        this.moveWithoutTransition();
      }
    });
  }

  isMovable() {
    if (this.config.infinite) return;

    this.prevButton.disabled = !!this.currentItem;
    this.nextButton.disabled = !!(this.currentItem === this.itemLength);
  }

  move({ getId }) {
    if (this.isMoving) return;
    this.isMoving = true;

    const id = getId();
    const dist = this.config.infinite
      ? -(this.itemWidth * id)
      : -(this.itemWidth * (id - 1));
    this.currentItem = id;

    this.isMovable();
    this.moveSlider(dist);
  }

  moveWithoutTransition() {
    this.setTransition(this.cardSlider, false);
    this.move({
      getId: () => (this.currentItem === 0 ? this.itemLength : 1)
    });
    setTimeout(() => {
      this.isMoving = false;
      this.setTransition(this.cardSlider, true);
    }, 0);
  }

  moveSlider(dist) {
    this.cardSlider.style.transform = `translateX(${dist}px)`;
  }

  isEndOfCards() {
    return this.isFirst() || this.isLast();
  }

  isFirst() {
    return this.currentItem === 0;
  }

  isLast() {
    return this.currentItem === this.itemLength + 1;
  }

  setTransition(el, val) {
    val
      ? (el.style.transition = `transform ${this.config.duration}ms ${this.config.animation}`)
      : (el.style.transition = `none`);
  }

  getChangingIndex() {
    return this.isFirst()
      ? { addIndex: this.itemLength - 1, removeIndex: this.currentItem }
      : { addIndex: 0, removeIndex: this.itemLength - 1 };
  }
}

export default Carousel;
