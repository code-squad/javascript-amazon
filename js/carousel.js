import { throttle, debounce } from './setThrottleDebounce.js';
import { $, $All } from "./docSelector.js";

export default class Carousel {
  constructor(layer) {
    this.carousel = {
      ulLayer: layer.carousel,
      showLayer: layer.parentCarousel,
      prev: layer.prev,
      next: layer.next,
    }

    this.currentItem = 1;
    this.offset = 0;

    this.SHOWING_CLASS = "show";

    this.requestID = null;
    this.reactAuto;
    this.itemLayer;
  }

  init() {
    this.clickEvent();
    // this.autoMoveEvent();
    this.xmlHttpRequest();
  }

  // moveToPrev() {
  //   const showSlide = $(`.${this.SHOWING_CLASS}`);

  //   showSlide.classList.remove(this.SHOWING_CLASS);
  //   const prevSlide = showSlide.previousElementSibling;

  //   this.setPrevShow(prevSlide);
  // }

  // moveToNext() {
  //   const showSlide = $(`.${this.SHOWING_CLASS}`);

  //   showSlide.classList.remove(this.SHOWING_CLASS);
  //   const nextSlide = showSlide.nextElementSibling

  //   this.setNextShow(nextSlide);
  // }

  // setPrevShow(prevSlide) {
  //   if (prevSlide) prevSlide.classList.add(this.SHOWING_CLASS);
  //   else this.itemLayer.lastItem.classList.add(this.SHOWING_CLASS);
  // }

  // setNextShow(nextSlide) {
  //   if (nextSlide) nextSlide.classList.add(this.SHOWING_CLASS);
  //   else this.itemLayer.firstItem.classList.add(this.SHOWING_CLASS);
  // }

  setCarouselShow() {
    this.carousel.ulLayer.firstElementChild.classList.add(`${this.SHOWING_CLASS}`);
  }

  autoMoveEvent() {
    this.carousel.ulLayer.addEventListener("load", this.autoSlideRenderer());
  }

  clickEvent() {
    this.carousel.prev.addEventListener('click', () => {
      this.moveToLeft();
      // this.moveToPrev();
      // this.pauseAutoSlide();
    });
    this.carousel.next.addEventListener('click', () => {
      this.moveToRight();
      // this.moveToNext();
      // this.pauseAutoSlide();
    });
  }

  xmlHttpRequest(regURL) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const responseObj = JSON.parse(xhr.responseText);
        responseObj.map(element => this.createHTMLTemplate(element));
        this.searchItemLayer();
        this.insertClone();
        this.setCarouselShow.call(this);
      }
    });

    xhr.open('GET', regURL);
    xhr.send();
  }

  searchItemLayer() {
    this.itemLayer = {
      item: $(".a-carousel-item"),
      firstItem: $(".a-carousel-item:first-child"),
      lastItem: $(".a-carousel-item:last-child"),
      listItems: $All(".a-carousel-item"),
      classShow: $(`.${this.SHOWING_CLASS}`),
    };
    console.log(this.itemLayer)
    return this.itemLayer;
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

  autoSlideRenderer() {
    const moveFn = this.moveToNext.bind(this);
    let startTime = 0;

    function slide(timestamp) {
      if (!startTime) startTime = timestamp;
      const setMilSecTime = 3000;
      let bProgressTime = (timestamp - startTime) >= setMilSecTime;

      if (bProgressTime) {
        if (this.itemLayer.classShow) moveFn();
        else this.itemLayer.firtstItem.classList.add(this.SHOWING_CLASS);
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

  isClone() {
    return this.currentItem === 0 || this.currentItem === this.itemLayer.listItems.length + 1;
  }

  insertClone() {
    console.log(this.itemLayer)
    const firstItem = this.itemLayer.listItems[0];
    const lastItem = this.itemLayer.listItems[this.itemLayer.listItems.length - 1];

    this.carousel.ulLayer.insertBefore(lastItem.cloneNode(true), this.carousel.ulLayer.firstChild);
    this.carousel.ulLayer.appendChild(firstItem.cloneNode(true));
  }

}