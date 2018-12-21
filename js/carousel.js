export default class Carousel {
  constructor(layer) {
    this.layer = {
      carousel: layer.carousel,
      innerCarousel: layer.innerCarousel,
      carouselItem: layer.a_CarouselItem,
      allCarousel: layer.a_CarouselList,
      prev: layer.prev,
      next: layer.next,
    }
    this.itemWidth = this.layer.carouselItem.offsetWidth;
    this.itemHeight = this.layer.carouselItem.offsetHeight;
    this.itemLength = this.layer.allCarousel.length;

    this.offset = 0;
    this.currentItem = 1;

    this.config = {
      duration: 200,
      easing: 'ease-out'
    };
  }

  init() {
    this.setCarouselStyle();
    this.moveToPrev();
    this.moveToNext();
    this.attachEvent();
  }

  setCarouselStyle() {
    this.layer.innerCarousel.classList.toggle("show");
  }

  move() {
    this.layer.carousel.style.transition = `transform ${this.config.duration}ms ${this.config.easing}`;
    this.layer.carousel.style.transform = `translate3D(${this.offset}px, 0, 0)`;
  }

  attachEvent() {
    this.layer.prev.addEventListener("click", this.moveToPrev.bind(this));
    this.layer.next.addEventListener("click", this.moveToNext.bind(this));
  }

  moveToPrev() {
    this.offset += this.itemWidth;
    this.move();
    this.currentItem--;
    this.checkMovable();
  }

  moveToNext() {
    this.offset -= this.itemWidth;
    this.move();
    this.currentItem++;
    this.checkMovable();
  }

  // prev, next 버튼 활성화/비활성화 결정
  checkMovable() {
    if (this.currentItem === 1) {
      this.layer.prev.disabled = true;
      this.layer.prev.classList.add('disabled');
    } else {
      this.layer.prev.disabled = false;
      this.layer.prev.classList.remove('disabled');
    }

    if (this.currentItem === this.itemLength) {
      this.layer.next.disabled = true;
      this.layer.next.classList.add('disabled');
    } else {
      this.layer.next.disabled = false;
      this.layer.next.classList.remove('disabled');
    }
  }
}