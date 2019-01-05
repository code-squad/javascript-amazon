export default class Carousel {
  constructor(layer) {
    this.carousel = {
      ulLayer: layer.carousel,
      showLayer: layer.parentCarousel,
      item: layer.a_CarouselItem,
      firstItem: layer.a_CarouselFirstItem,
      lastItem: layer.a_CarouselLastItem,
      allItems: layer.a_CarouselList,
      prev: layer.prev,
      next: layer.next,
    }

    this.SHOWING_CLASS = "show";
    this.classShow = document.querySelector(`.${this.SHOWING_CLASS}`);
  }

  init() {
    this.setCarouselItem();
    this.attachEvent();
  }

  attachEvent() {
    this.clickEvent();
    this.audoMoveEvent();
  }

  setCarouselItem() {
    this.carousel.firstItem.classList.add(this.SHOWING_CLASS);
  }

  audoMoveEvent() {
    this.carousel.ulLayer.addEventListener("load", this.autoSlideRenderer());
  }

  clickEvent() {
    this.carousel.prev.addEventListener('click', (e) => this.moveToPrev(e));
    this.carousel.next.addEventListener('click', (e) => this.moveToNext(e))
  }

  moveToPrev() {
    const showSlide = document.querySelector(`.${this.SHOWING_CLASS}`);

    showSlide.classList.remove(this.SHOWING_CLASS);
    const prevSlide = showSlide.previousElementSibling;

    this.setPrevShow(prevSlide);
  }

  moveToNext() {
    // set ClassName(`.show`)가 set 되지 않은 상태
    const showSlide = document.querySelector(`.${this.SHOWING_CLASS}`);

    showSlide.classList.remove(this.SHOWING_CLASS);
    const nextSlide = showSlide.nextElementSibling;

    this.setNextShow(nextSlide);
  }

  setPrevShow(prevSlide) {
    if (prevSlide) prevSlide.classList.add(this.SHOWING_CLASS);
    else this.carousel.lastItem.classList.add(this.SHOWING_CLASS);
  }

  setNextShow(nextSlide) {
    if (nextSlide) nextSlide.classList.add(this.SHOWING_CLASS);
    else this.carousel.firstItem.classList.add(this.SHOWING_CLASS);
  }

  autoSlideRenderer() {
    function slide() {
      const showSlide = document.querySelector(`.${this.SHOWING_CLASS}`);

      if (showSlide) this.moveToNext();
      else this.carousel.firstItem.classList.add(this.SHOWING_CLASS);

      setTimeout(() => requestAnimationFrame(slide.bind(this)), 3000);
    }
    this.requestID = requestAnimationFrame(slide.bind(this));
  }

}