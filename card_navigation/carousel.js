class Carousel {
  constructor(el, option) {
    this.el = document.querySelector(el);
    this.cover = this.el.firstElementChild;
    this.items = this.cover.children;
    this.option = Carousel.mergeOption(option);
    this.prevBtn = document.querySelector(this.option.prevBtn);
    this.nextBtn = document.querySelector(this.option.nextBtn);
    this.stepList = document.querySelector(this.option.stepList).children
    this.itemWidth = this.items[0].offsetWidth;
    this.itemLength = this.items.length;
    this.isTransiting = false;
    this.offset = 0;
    this.current = 0;

    this.init();
  }

  static mergeOption(option) {
    const default_option = {
      prevBtn: ".btn_prev",
      nextBtn: ".btn_next",
      step: ".step-list",
      animate: true,
      easing: "ease-in-out",
      duration: "500",
      infinite: false
    };
    return {
      ...default_option,
      ...option
    };
  }

  init() {
    // this.addCarouselClass(); 좀 더 라이브러리화 할때 변경 예정

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
    let firstItem = this.items[0];
    let lastItem = this.items[this.itemLength - 1];
    this.cover.insertBefore(lastItem.cloneNode(true), this.cover.firstChild);
    this.cover.appendChild(firstItem.cloneNode(true));
  }

  isCloneItem() {
    return this.current === 0 || this.current === this.items.length - 1
  }
  /*
  addCarouselClass() {
    this.cover.classList.add("carousel-cover");
    Array.from(this.items).forEach(el => el.classList.add("carousel-item"));
  }
  */

  attachBtnEvent() {
    this.prevBtn.addEventListener("click", () => this.btnEventHandler("prev"));
    this.nextBtn.addEventListener("click", () => this.btnEventHandler("next"));

    this.cover.addEventListener("transitionend", () => this.isTransiting = false)

    Array.from(this.stepList).forEach((el, i) => {
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
    this.cover.style.transform = `translate3D(${this.offset}px, 0, 0)`;
    this.cover.style.transition = (animate) ? `transform ${this.option.duration}ms ${this.option.easing}` : 'none';
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
      this.prevBtn.classList.add("arrow-disable");
    } else if (this.current == this.itemLength - 1) {
      this.nextBtn.classList.add("arrow-disable");
    } else {
      this.prevBtn.classList.remove("arrow-disable");
      this.nextBtn.classList.remove("arrow-disable");
    }
  }

  toggleStepClass() {
    Array.from(this.stepList).forEach(el => {
      el.classList.remove("active");
    })
    this.stepList[(this.option.infinite) ? this.current - 1 : this.current].classList.add("active")

  }
}