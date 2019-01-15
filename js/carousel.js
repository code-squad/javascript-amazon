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
    this.offset = -this.itemLayer.item.offsetWidth;
    this.moveWithoutAnimation();
  }

  setCarouselShow() {
    this.insertClone();
    this.offset -= this.itemLayer.item.offsetWidth;
    this.carousel.ulLayer.classList.add(`${this.SHOWING_CLASS}`);
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

  moveToLeft() {
    this.offset += this.itemLayer.item.offsetWidth;
    this.move();
    this.currentItem--;
    if (this.isClone()) {
      this.offset -= this.itemLayer.listItems.length * this.itemLayer.item.offsetWidth;
      this.carousel.ulLayer.addEventListener("transitionend", this.moveWithoutAnimation());
      this.currentItem = this.currentItem + this.itemLayer.listItems.length;
    }
  }

  moveToRight() {
    this.offset -= this.itemLayer.item.offsetWidth;
    this.move();
    this.currentItem++;
    if (this.isClone()) {
      this.offset += this.itemLayer.listItems.length * this.itemLayer.item.offsetWidth;
      console.log(this.offset, this.itemLayer.item.offsetWidth)
      // this.carousel.ulLayer.addEventListener("transitionend", this.moveWithoutAnimation());
      // setTimeout(() => this.moveWithoutAnimation(), 200);
      this.currentItem = this.currentItem - this.itemLayer.listItems.length;
    }
  }

  move() {
    // this.carousel.ulLayer.classList.remove("noneActive");
    this.carousel.ulLayer.style.transition = `transform 1000ms ease-out`;
    this.carousel.ulLayer.style.transform = `translateX(${this.offset}px)`;
    // this.carousel.ulLayer.classList.add("active");
  }

  moveWithoutAnimation() {
    // this.carousel.ulLayer.classList.remove("active");

    this.carousel.ulLayer.style.transition = 'none';
    this.carousel.ulLayer.style.transform = `translateX(${this.offset}px)`;
    // this.carousel.ulLayer.classList.add("noneActive");
  }

  isClone() {
    return this.currentItem === 0 || this.currentItem === this.itemLayer.listItems.length + 1;
  }

  xmlHttpRequest(regURL) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const responseObj = JSON.parse(xhr.responseText);
        responseObj.map(element => this.createHTMLTemplate(element));
        this.searchItemLayer();
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

  insertClone() {
    const firstItem = this.itemLayer.listItems[0];
    const lastItem = this.itemLayer.listItems[this.itemLayer.listItems.length - 1];

    this.carousel.ulLayer.insertBefore(lastItem.cloneNode(true), this.carousel.ulLayer.firstChild);
    this.carousel.ulLayer.appendChild(firstItem.cloneNode(true));
  }

}