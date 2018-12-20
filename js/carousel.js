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
    this.itemLength = this.layer.allCarousel.length;
    console.log(this.layer.prevIMG, this.layer.nextIMG)

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
    this.layer.prevIMG.addEventListener("click", this.moveToPrev.bind(this));
    this.layer.nextIMG.addEventListener("click", this.moveToNext.bind(this));
  }

  moveToPrev() {
    this.offset += this.itemWidth;
    this.move();
    this.currentItem--;
  }

  moveToNext() {
    this.offset -= this.itemWidth;
    this.move();
    this.currentItem++;
  }
}