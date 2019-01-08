import { throttle, debounce } from './setThrottleDebounce.js';

export default class Carousel {
  constructor(layer) {
    this.carousel = {
      ulLayer: layer.carousel,
      showLayer: layer.parentCarousel,
      item: layer.a_CarouselItem,
      lastItem: layer.a_CarouselLastItem,
      allItems: layer.a_CarouselList,
      prev: layer.prev,
      next: layer.next,
      classShow: layer.classShow,
    }

    this.SHOWING_CLASS = "show";
    this.classShow = document.querySelector(`.${this.SHOWING_CLASS}`);
    this.firstItem = this.carousel.ulLayer.firstElementChild;

    this.requestID = null;
    this.reactAuto;
  }

  init() {
    this.clickEvent();
    this.autoMoveEvent();
    this.xmlRequest();
  }

  setCarouselShow() {
    this.carousel.ulLayer.firstElementChild.classList.add(`${this.SHOWING_CLASS}`);
  }

  xmlRequest(regURL) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const responseObj = JSON.parse(xhr.responseText);
        responseObj.map(element => {
          this.createHTMLTemplate(element)
        });
        this.setCarouselShow.call(this);
      }
    });

    xhr.open('GET', regURL);
    xhr.send();
  }

  createHTMLTemplate({ src, alt, id }) {
    return this.carousel.ulLayer.innerHTML += `
    <li class="a-carousel-item">
    <a href="#" class="a-link-category">
    <img src="${src}" alt="${alt}", id="${id}">
    </a>
    </li>
    `.trim();
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

    console.log(this.carousel.firstItem)
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
      const setMilSecTime = 3000;
      let bProgressTime = (timestamp - startTime) >= setMilSecTime;

      if (bProgressTime) {
        console.log(this.classShow, this.carousel);
        if (this.classShow) moveFn();
        else this.carousel.firstItem.classList.add(this.SHOWING_CLASS);
        startTime = 0; // Timer Reset
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