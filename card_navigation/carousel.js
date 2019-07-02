import $ from './allenibrary.js'

export default class Carousel {
  constructor(viewportSelector, option) {
    this.viewport = $(viewportSelector);
    this.camera = this.viewport.firstElementChild;
    this.panels = this.camera.children;
    this.option = this.mergeOption(option);
    this.prevBtn = $(this.option.prevBtn);
    this.nextBtn = $(this.option.nextBtn);
    this.pagenation = $(this.option.pagenation).children
    this.itemWidth = this.panels[0].offsetWidth;
    this.itemLength = this.panels.length;
    this.isTransiting = false;
    this.offset = 0;
    this.current = 0;

    this.init();
  }

  mergeOption(option) {
    const default_option = {
      disabledBtnClass: 'arrow-disable',
      prevBtn: ".btn_prev",
      nextBtn: ".btn_next",
      step: ".step-list",
      animate: true,
      easing: "ease-in-out",
      duration: "500",
      infinite: false
    };
    return { ...default_option, ...option };
  }

  init() {
    if (this.option.infinite) {
      this.addCloneItem();
      this.offset -= this.itemWidth;
      this.animateMove(false);
      this.current++;
    }
    this.attachBtnEvent();
    this.checkMovable();
  }

  addCloneItem() {
    let firstItem = this.panels[0];
    let lastItem = this.panels[this.itemLength - 1];
    this.camera.insertBefore(lastItem.cloneNode(true), this.camera.firstChild);
    this.camera.appendChild(firstItem.cloneNode(true));
  }

  isCloneItem() {
    return this.current === 0 || this.current === this.panels.length - 1
  }
  /*
  addCarouselClass() {
    this.camera.classList.add("carousel-camera");
    Array.from(this.panels).forEach(el => el.classList.add("carousel-item"));
  }
  */

  attachBtnEvent() {
    this.prevBtn.addEventListener("click", () => this.btnEventHandler("prev"));
    this.nextBtn.addEventListener("click", () => this.btnEventHandler("next"));

    this.camera.addEventListener("transitionend", () => this.isTransiting = false)

    Array.from(this.pagenation).forEach((el, i) => {
      el.dataset.id = (this.option.infinite) ? i + 1 : i;
      el.addEventListener("click", this.stepEventHandler.bind(this));
    })
  }

  btnEventHandler(direction) {
    direction = direction === "prev" ? -1 : 1;
    if (this.isTransiting) return;

    this.current += direction;

    this.offset -= this.itemWidth * direction;
    this.animateMove(true);
    if (this.option.infinite) {
      if (this.isCloneItem()) {
        this.offset += this.itemWidth * this.itemLength * direction;
        setTimeout(() => this.animateMove(false), this.option.duration);
        this.current -= this.itemLength * direction;
      }
    } else {
      this.checkMovable();
    }
    this.toggleStepClass();
  }

  animateMove(animate) {
    this.isTransiting = animate;
    this.camera.style.transform = `translate3D(${this.offset}px, 0, 0)`;
    this.camera.style.transition = (animate) ? `transform ${this.option.duration}ms ${this.option.easing}` : 'none';
  }

  stepEventHandler(evt) {
    let curId = Number(evt.target.dataset.id);

    this.offset = this.offset - (this.itemWidth * (curId - this.current));
    this.current = curId;
    this.animateMove(true);

    if (!this.option.infinite) {
      this.checkMovable();
    }
    this.toggleStepClass()
  }

  checkMovable() {
    if (this.current == 0) {
      this.prevBtn.classList.add(this.option.disabledBtnClass);
    } else if (this.current == this.itemLength - 1) {
      this.nextBtn.classList.add(this.option.disabledBtnClass);
    } else {
      this.prevBtn.classList.remove(this.option.disabledBtnClass);
      this.nextBtn.classList.remove(this.option.disabledBtnClass);
    }
  }

  toggleStepClass() {
    Array.from(this.pagenation).forEach(el => {
      el.classList.remove("active");
    })
    this.pagenation[(this.option.infinite) ? this.current - 1 : this.current].classList.add("active")
  }
}