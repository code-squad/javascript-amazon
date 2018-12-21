export default class Carousel {
  constructor(layer) {
    this.carousel = {
      olLayer: layer.carousel,
      showLayer: layer.parentCarousel,
      item: layer.a_CarouselItem,
      allItems: layer.a_CarouselList,
      prev: layer.prev,
      next: layer.next,
    }

    this.itemWidth = this.carousel.item.offsetWidth;
    this.itemHeight = this.carousel.item.offsetHeight;
    this.itemLength = this.carousel.allItems.length;

    this.offset = 0;
    this.currentItem = 1;

    this.config = Carousel.mergeConfig(carousel);
  }

  static mergeConfig(config) {
    const defaultConfig = {
      selector: '.carousel',
      duration: 200,
      easing: 'ease-out',
      infinite: true,
    };

    return {
      ...defaultConfig,
      ...config
    };
  }

  init() {
    this.setCarouselStyle();
    this.moveController();
    this.attachEvent();
  }

  moveController() {
    if (this.config.infinite) {
      this.insertClone();
      this.offset = -this.itemWidth;
      this.moveWithoutAnimation();
    } else {
      this.checkMovable();
    }
  }

  setCarouselStyle() {
    this.carousel.showLayer.classList.add("show");
  }

  isClone() {
    return this.currentItem === 0 || this.currentItem === this.itemLength + 1;
  }

  delayMoveWithoutAnimation() {
    return setTimeout(() => this.moveWithoutAnimation(), 200);
  }

  move() {
    this.isTransiting = true;
    this.carousel.olLayer.style.transition = `transform ${this.config.duration}ms ${this.config.easing}`;
    this.carousel.olLayer.style.transform = `translate3D(${this.offset}px, 0, 0)`;
  }

  moveWithoutAnimation() {
    this.carousel.olLayer.style.transition = 'none';
    this.carousel.olLayer.style.transform = `translate3D(${this.offset}px, 0, 0)`;
  }

  moveToPrev() {
    this.offset += this.itemWidth;
    this.move();
    this.currentItem--;
    (this.config.infinite) ? this.setPrevMove() : this.checkMovable();
  }

  moveToNext() {
    this.offset -= this.itemWidth;
    this.move();
    this.currentItem++;
    (this.config.infinite) ? this.setNextMove() : this.checkMovable();
  }

  setPrevMove() {
    if (this.isClone()) {
      this.offset -= this.itemLength * this.itemWidth;
      this.delayMoveWithoutAnimation();
      this.currentItem = this.currentItem + this.itemLength;
    }
  }

  setNextMove() {
    if (this.isClone()) {
      this.offset += this.itemLength * this.itemWidth;
      this.delayMoveWithoutAnimation();
      this.currentItem = this.currentItem - this.itemLength;
    }
  }

  insertClone() {
    const firstItem = this.carousel.allItems[0];
    const lastItem = this.carousel.allItems[this.carousel.allItems.length - 1];

    this.carousel.olLayer.insertBefore(lastItem.cloneNode(true), this.carousel.olLayer.firstChild);
    this.carousel.olLayer.appendChild(firstItem.cloneNode(true));
  }

  checkMovable() {
    (this.currentItem === 1) ? this.carousel.prev.disabled = true : this.carousel.prev.disabled = false;
    (this.currentItem === this.itemLength) ? this.carousel.next.disabled = true : this.carousel.next.disabled = false;
  }

  attachEvent() {
    this.carousel.prev.addEventListener("click", this.moveToPrev.bind(this));
    this.carousel.next.addEventListener("click", this.moveToNext.bind(this));
  }
}