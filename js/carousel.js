export default class Carousel {
  constructor(layer) {
    this.layer = {
      carousel: layer.carousel,
      innerCarousel: layer.innerCarousel,
      carouselItem: layer.a_CarouselItem,
      allCarousel: layer.a_CarouselList,
      prevIMG: layer.prev,
      nextIMG: layer.next,
    }
    this.itemWidth = this.layer.carouselItem.offsetWidth;
    this.itemHeight = this.layer.carouselItem.offsetHeight;
    this.itemLength = this.layer.allCarousel;
    console.log(this.itemLength);

    this.offset = 0;
    this.currentItem = 1;
  }

  init() {
    this.setCarouselStyle();
    this.moveToPrev();
    this.moveToNext();
    this.attachEvent();
  }

  setCarouselStyle() {
    this.layer.innerCarousel.style.width = this.itemWidth + 'px';
    this.layer.innerCarousel.style.height = this.itemHeight + 'px';
    this.layer.innerCarousel.style.opacity = 0;
  }

  attachEvent() {
    this.layer.prevIMG.addEventListener("click", this.moveToPrev.bind(this));
    this.layer.nextIMG.addEventListener("click", this.moveToNext.bind(this));
  }

  moveToPrev() {

  }

  moveToNext() {

  }

  move() {
    this.layer.innerCarousel.style.transition = `transform ${this.config.duration}ms ${this.config.easing}`;
    this.layer.innerCarousel.style.transform = `translate3D(0px, 0 ,0)`;
  }
}