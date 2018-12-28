import { throttle, debounce } from './setThrottleDebounce.js';

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

  static mergeConfig(carouselConfig) {
    const defaultConfig = {
      infinite: true,
    };

    return {
      ...defaultConfig,
      ...carouselConfig
    };
  }

  init() {
    this.moveController();
    this.attachEvent();
  }

  attachEvent() {
    if (this.config.infinite) {
      // this.carousel.olLayer.addEventListener("load", this.setRAF(this.carousel, this.itemWidth));
    } else {

    }
    this.carousel.prev.addEventListener("click", this.moveToPrev.bind(this));
    this.carousel.next.addEventListener("click", this.moveToNext.bind(this));
  }

  setRAF(carousel, itemWidth) {
    let moveWidth = 0;
    this.move();
    function run() {
      console.log(moveWidth);
      carousel.olLayer.style.transform = `translate3D(${parseInt(0) + moveWidth}px, 0, 0)`;
      console.log(carousel.olLayer.style.transform);
      moveWidth = moveWidth - itemWidth;
      setTimeout(() => requestAnimationFrame(run), 3000);
    }
    requestAnimationFrame(run);
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

  isClone() {
    return this.currentItem === 0 || this.currentItem === this.itemLength + 1;
  }

  delayMoveWithoutAnimation() {
    // TODO: [] 빠르게 연속적으로 click event 발생시 미세한 event Animation Time의 격차 발생 수정 필요. (debounce? throttle 기능으로 가능?)
    return setTimeout(() => this.moveWithoutAnimation(), 200);
    // return debounce(200, this.moveWithoutAnimation()); // 문제있음..
  }

  move() {
    this.carousel.olLayer.classList.add("active");
    this.carousel.olLayer.style.transform = `translate3D(${this.offset}px, 0, 0)`;
  }

  moveWithoutAnimation() {
    this.carousel.olLayer.classList.remove("active");
    this.carousel.olLayer.style.transform = `translate3D(${this.offset}px, 0, 0)`;
  }

  moveToPrev() {
    this.offset += this.itemWidth;
    this.move();
    this.currentItem--;
    // (this.config.infinite) ? this.setPrevMove() : this.checkMovable();
    this.setPrevMove();
  }

  moveToNext() {
    this.offset -= this.itemWidth;
    this.move();
    this.currentItem++;
    // (this.config.infinite) ? this.setNextMove() : this.checkMovable();
    this.setNextMove();
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

  // checkMovable() {
  //   (this.currentItem === 1) ? this.carousel.prev.disabled = true : this.carousel.prev.disabled = false;
  //   (this.currentItem === this.itemLength) ? this.carousel.next.disabled = true : this.carousel.next.disabled = false;
  // }
}