import { throttle, debounce } from './setThrottleDebounce.js';

export default class Carousel {
  constructor(state) {
    this.carousel = {
      ulLayer: state.carousel,
      showLayer: state.parentCarousel,
      prev: state.prev,
      next: state.next,
    }

    // request Animation을 담기 위한 값
    this.requestID = null;
    // pause시 재작동을 위한 값
    this.reactAuto;

    // set Timer(React / Auto act)
    this.setAutoActTimer = state.autoActTime;
    this.setReactTimer = state.reactTime;

    // Auto Act Method On/ Off
    this.autoAct = state.switchAutoMove;

    // click Pause AutoAct Method On/ Off
    this.pauseAct = state.switchPause;
  }

  init() {
    this.clickEvent();
    if (this.autoAct) this.autoMoveEvent();
  }

  autoMoveEvent() {
    this.carousel.ulLayer.addEventListener("load", this.autoSlideRenderer());
  }

  clickEvent() {
    this.carousel.prev.addEventListener("click", () => {
      this.moveToLeft();
      if (this.pauseAct) this.pauseAutoSlide();
    });
    this.carousel.next.addEventListener("click", () => {
      this.moveToRight();
      if (this.pauseAct) this.pauseAutoSlide();
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
        // offsetWidth * n(<li> Length)개 = Total Value: <ul> width (px);
        this.setUlLayerWidth();
      }
    });

    xhr.open("GET", regURL);
    xhr.send();
  }

  setUlLayerWidth() {
    const width = this.carousel.ulLayer.offsetWidth * this.carousel.ulLayer.children.length;
    this.carousel.ulLayer.style.setProperty("width", `${width}px`);
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
    const setMilSecTime = this.setAutoActTimer;

    function slide(timestamp) {
      if (!startTime) startTime = timestamp;
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
    if (!this.reactAuto) this.reactAuto = debounce(this.autoSlideRenderer, this.setReactTimer).bind(this);
    this.reactAuto();
  }
}