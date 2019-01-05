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
    }

    this.SHOWING_CLASS = "show";
    this.classShow = document.querySelector(`.${this.SHOWING_CLASS}`);

    this.requestID = null;
    this.reactAuto;
  }

  init() {
    this.clickEvent();
    this.audoMoveEvent();
  }

  audoMoveEvent() {
    this.carousel.ulLayer.addEventListener("load", this.autoSlideRenderer());
  }

  clickEvent() {
    this.carousel.prev.addEventListener('click', () => {
      this.moveToPrev();
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
    const nextSlide = showSlide.nextElementSibling;

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
    function slide() {
      if (this.classShow) this.moveToNext();
      else this.carousel.firstItem.classList.add(this.SHOWING_CLASS);

      setTimeout(() => requestAnimationFrame(slide.bind(this)), 3000);
    }
    this.requestID = requestAnimationFrame(slide.bind(this));
  }

  pauseAutoSlide() {
    cancelAnimationFrame(this.requestID);

    if (!this.reactAuto) {
      this.reactAuto = debounce(this.autoSlideRenderer, 5000).bind(this);
    }
    this.reactAuto();
  }
}