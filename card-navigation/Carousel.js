class Carousel {
  constructor(el, option) {
    this.el = document.querySelector(el);
    this.cover = this.el.firstElementChild;
    this.items = this.cover.children;
    this.item = this.items[0];
    this.option = Carousel.mergeOption(option);
    this.prevBtn = document.querySelector(this.option.prevBtn);
    this.nextBtn = document.querySelector(this.option.nextBtn);
    this.coverWidth = this.cover.scrollWidth;
    this.itemWidth = this.item.offsetWidth;
    this.itemHeight = this.item.offsetHeight;
    this.itemLength = this.items.length;
    this.isTransiting = false;
    this.offset = 0;
    this.current = 0;

    this.init();
  }
  
  static mergeOption(option) {
    const default_option = {
      gap: 10,
      prevBtn: ".btn_prev",
      nextBtn: ".btn_next",
      animate: true,
      easing: "ease-in-out",
      duration: "500",
      infinite: false
    };
    return { ...default_option, ...option };
  }

  init() {
    this.setCarouselSize();
    this.addCarouselClass();

    if (this.option.infinite) {
      this.offset -= this.addCloneItem();
      this.moveWithoutAnimation();
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

    return lastItem.offsetWidth;
  }

  isCloneItem() {
    return this.current === 0 || this.current === this.items.length - 1
  }

  setCarouselSize() {
    this.el.style.width = this.itemWidth;
    this.el.style.height = this.itemHeight;
  }
  
  setItemSize() { 
    this.itemWidth = this.item.offsetWidth;
    this.itemHeight = this.item.offsetHeight;
  }

  addCarouselClass() {
    this.cover.classList.add("carousel-cover");
    Array.from(this.items).map(el => el.classList.add("carousel-item"));
  }

  attachBtnEvent() {
    this.prevBtn.addEventListener("click", () => this.btnEventHandler("prev"));
    this.nextBtn.addEventListener("click", () => this.btnEventHandler("next"));

    this.cover.addEventListener("transitionend", () => this.isTransiting = false)
  }
  
  btnEventHandler(direction) {
    (direction == "prev") ? this.movePrev() : this.moveNext();
  }

  movePrev() {
    if(this.isTransiting) return;

    this.current--;
    this.setItemSize();
    this.setCarouselSize();
    
    this.offset += this.itemWidth;
    this.move();
    if (this.option.infinite) {
      if (this.isCloneItem()) {
        this.offset -= this.coverWidth;
        setTimeout(() => this.moveWithoutAnimation(), 500)
        this.current += this.itemLength;
      }
    } else {
      this.checkMovable();
    } 
  }

  moveNext() {
    if(this.isTransiting) return;

    this.current++;
    this.setItemSize();
    this.setCarouselSize();

    this.offset -= this.itemWidth;
    this.move();

    if (this.option.infinite) {
      if (this.isCloneItem()) {
        this.offset += this.coverWidth;
        setTimeout(() => this.moveWithoutAnimation(), 500)
        this.current -= this.itemLength;
      }
    } else {
      this.checkMovable();
    } 
  }

  move() {
    this.isTransiting = true;

    this.cover.style.transition = `transform ${this.option.duration}ms ${this.option.easing}`;
    this.cover.style.transform = `translate3D(${this.offset}px, 0, 0)`;
  }

  moveWithoutAnimation() {
    this.cover.style.transition = 'none';
    this.cover.style.transform = `translate3D(${this.offset}px, 0, 0)`;
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
}

const carousel = new Carousel(".benefit-content", {
  infinite: true,
  prevBtn: ".arrow-left",
  nextBtn: ".arrow-right"
});