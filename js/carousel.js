export default class Carousel {
  constructor(layer) {
    this.layer = {
      carousel: layer.carousel,
      innerCarousel: layer.innerCarousel,
      a_Carousel: layer.a_Carousel,
      a_CarouselList: layer.a_CarouselList,
      prevIMG: layer.prev,
      nextIMG: layer.next,
    };
  }

  init() {
    this.moveToPrev();
    this.moveToNext();
    this.attachEvent();
  }

  attachEvent() {
    this.layer.carousel.style.width = this.layer.a_Carousel.offsetWidth + 'px';
    this.layer.carousel.style.height = this.layer.a_Carousel.offsetHeight + 'px';
  }

  moveToPrev() {

  }

  moveToNext() {

  }
}