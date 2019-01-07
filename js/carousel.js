import { throttle, debounce } from './setThrottleDebounce.js';

export default class Carousel {
  constructor(layer) {
    this.carousel = {
      ulLayer: layer.carousel,
      showLayer: layer.parentCarousel,
      item: layer.a_CarouselItem,
      firstItem: layer.a_CarouselFirstItem,
      lastItem: layer.a_CarouselLastItem,
      allItems: layer.a_CarouselList,
      prev: layer.prev,
      next: layer.next,
      classShow: layer.classShow,
    }

    this.SHOWING_CLASS = "show";
    this.classShow = document.querySelector(`.${this.SHOWING_CLASS}`);

    this.requestID = null;
    this.reactAuto;
    this.timer; // clear setTimeout Method
  }

  init() {
    this.clickEvent();
    this.autoMoveEvent();
  }

  autoMoveEvent() {
    this.carousel.ulLayer.addEventListener("load", this.autoSlideRenderer());
  }

  clickEvent() {
    this.carousel.prev.addEventListener('click', () => {
      this.moveToPrev();
      this.pauseAutoSlide();
    });
    this.carousel.next.addEventListener('click', () => {
      this.moveToNext();
      this.pauseAutoSlide();
    });
  }

  moveToPrev() {
    const showSlide = document.querySelector(`.${this.SHOWING_CLASS}`);

    showSlide.classList.remove(this.SHOWING_CLASS);
    const prevSlide = showSlide.previousElementSibling;

    this.setPrevShow(prevSlide);
  }

  moveToNext() {
    const showSlide = document.querySelector(`.${this.SHOWING_CLASS}`);

    showSlide.classList.remove(this.SHOWING_CLASS);
    const nextSlide = showSlide.nextElementSibling

    this.setNextShow(nextSlide);
  }

  setPrevShow(prevSlide) {
    if (prevSlide) prevSlide.classList.add(this.SHOWING_CLASS);
    else this.carousel.lastItem.classList.add(this.SHOWING_CLASS);
  }

  setNextShow(nextSlide) {
    if (nextSlide) nextSlide.classList.add(this.SHOWING_CLASS);
    else this.carousel.firstItem.classList.add(this.SHOWING_CLASS);
  }

  autoSlideRenderer() {
    const moveFn = this.moveToNext.bind(this);
    let startTime = 0;

    function slide(timestamp) {
      if (!startTime) startTime = timestamp;
      let progressTime = timestamp - startTime;

      if (progressTime >= 3000) {
        if (this.classShow) moveFn();
        else this.carousel.firstItem.classList.add(this.SHOWING_CLASS);
        startTime = 0;
      }
      this.requestID = requestAnimationFrame(slide.bind(this))
    }
    this.requestID = requestAnimationFrame(slide.bind(this));
  }

  pauseAutoSlide() {
    cancelAnimationFrame(this.requestID);

    if (!this.reactAuto) this.reactAuto = debounce(this.autoSlideRenderer, 5000).bind(this);
    this.reactAuto();
  }
}