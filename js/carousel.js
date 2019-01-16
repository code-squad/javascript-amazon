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
  }

  init() {
    this.clickEvent();
    this.autoMoveEvent();
    this.xmlHttpRequest();
  }


  autoMoveEvent() {
    this.carousel.ulLayer.addEventListener("load", this.autoSlideRenderer());
  }

  clickEvent() {
    this.carousel.prev.addEventListener('click', () => {
      this.moveToLeft();
      this.pauseAutoSlide();
    });
    this.carousel.next.addEventListener('click', () => {
      this.moveToRight();
      this.pauseAutoSlide();
    });
  }

  moveToLeft() {
    this.carousel.ulLayer.classList.add("slideLeft");
    this.carousel.ulLayer.removeEventListener("transitionend", this.setRightSlide);
    this.carousel.ulLayer.addEventListener("transitionend", this.setLeftSlide);
  }

  moveToRight() {
    this.carousel.ulLayer.classList.add("slideRight");
    this.carousel.ulLayer.removeEventListener("transitionend", this.setLeftSlide);
    this.carousel.ulLayer.addEventListener("transitionend", this.setRightSlide);
  }

  setRightSlide() {
    // 여기서 this를 쓰는 것보다 탐색한 자료(this.itemLayer)를 기준점으로 적용한다면 Issue가 덜 발생되지 않을 까??(this의 적용 시점이 나의 의도와는 달라지게 되었을 때와 다른사람들에게도 나의 의도를 읽지 못하게 되었을 시점에 대해 예상이 들었음..)
    const firstChild = this.firstElementChild;

    this.insertBefore(firstChild, null);
    this.classList.remove("slideRight");
  }

  setLeftSlide() {
    const prevChild = this.lastElementChild;

    this.insertAdjacentElement("afterbegin", prevChild);
    this.classList.remove("slideLeft");
  }

  xmlHttpRequest(regURL) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const responseObj = JSON.parse(xhr.responseText);
        responseObj.map(element => this.createHTMLTemplate(element));
        this.searchItemLayer();
      }
    });

    xhr.open('GET', regURL);
    xhr.send();
  }

  searchItemLayer() {
    this.itemLayer = {
      item: $(".a-carousel-item"),
      firstItem: $(".a-carousel:first-child"),
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
    const moveFn = this.moveToRight.bind(this);
    let startTime = 0;

    function slide(timestamp) {
      if (!startTime) startTime = timestamp;
      const setMilSecTime = 3000;
      let bProgressTime = (timestamp - startTime) >= setMilSecTime;

      if (bProgressTime) {
        moveFn(); // acting Slide Right Fn Method
        startTime = 0; // Timer Reset
      }
      this.requestID = requestAnimationFrame(slide.bind(this))
    }
    this.requestID = requestAnimationFrame(slide.bind(this));
  }

  pauseAutoSlide() {
    cancelAnimationFrame(this.requestID);
    const setReactTimer = 3000;
    if (!this.reactAuto) this.reactAuto = debounce(this.autoSlideRenderer, setReactTimer).bind(this);
    this.reactAuto();
  }
}