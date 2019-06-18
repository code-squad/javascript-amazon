import className from "./carouselClassName.js";

class Carousel {
  constructor(config) {
    //DOM
    this.container = document.querySelector(className.container);
    this.navItems = this.container.querySelectorAll(className.navItem);
    this.cardSlider = this.container.querySelector(className.cardSlider);
    this.prevButton = this.container.querySelector(className.prev);
    this.nextButton = this.container.querySelector(className.next);

    // values
    this.initIndex = 0;
    this.itemWidth = this.cardSlider.firstElementChild.getBoundingClientRect().width;
    this.offset = 0;
    this.currentItem = this.initIndex + 1;
    this.itemLength = this.cardSlider.children.length;

    this.defaultConfig = {
      infinite: true,
      duration: 500
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
    const cardWrapper = this.container.querySelector(className.cardWrapper);

    cardWrapper.style.width = `${this.itemWidth}px`;
    this.attatchEvent();

    if (this.config.infinite) {
      this.cloneVirtualCard();
      this.moveWithoutTransition()
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
      this.move({ getId: () => this.currentItem - 1 })
    );
    this.nextButton.addEventListener("click", () =>
      this.move({ getId: () => this.currentItem + 1 })
    );
    this.navItems.forEach((item, index) => {
      item.addEventListener("click", () =>
        this.move({ getId: () => index + 1 })
      );
    });

    this.cardSlider.addEventListener("transitionend", () => {
      if (this.isEndOfCards()) {
        this.moveWithoutTransition()
      }
    });
  }

  isMovable() {
    if (this.config.infinite) return;

    this.prevButton.disabled = !!this.currentItem;
    this.nextButton.disabled = !!(this.currentItem === this.itemLength);
  }

  move({ getId }) {
    const id = getId();
    const dist = this.config.infinite
      ? -(this.itemWidth * id)
      : -(this.itemWidth * (id - 1));

    this.currentItem = id;
    this.isMovable();
    this.selectNav();
    this.moveSlider(dist);
  }

  moveWithoutTransition() {
    this.setTransition(this.cardSlider, false);
    this.move({
      getId: () => (this.currentItem === 0 ? this.itemLength : 1)
    });
    setTimeout(() => {
      this.setTransition(this.cardSlider, true);
    }, 0);
  }

  moveSlider(dist) {
    this.cardSlider.style.transform = `translateX(${dist}px)`;
  }

  isEndOfCards() {
    // debugger;
    return (
      this.config.infinite &&
      (this.currentItem === 0 || this.currentItem === this.itemLength + 1)
    );
  }

  setTransition(el, val) {
    val
      ? (el.style.transition = `transform ${this.config.duration}ms`)
      : (el.style.transition = `none`);
  }

  selectNav() {
    this.navItems.forEach((item, index, array) => {
      if (index + 1 === this.currentItem) {
        item.classList.add(className.selected);
      } else if (this.currentItem === 0) {
        array[this.currentItem].classList.remove(className.selected);
        array[this.itemLength - 1].classList.add(className.selected);
      } else if (this.currentItem === this.itemLength + 1) {
        array[this.itemLength - 1].classList.remove(className.selected);
        array[0].classList.add(className.selected);
      } else {
        item.classList.remove(className.selected);
      }
    });
  }
}

export default Carousel;
