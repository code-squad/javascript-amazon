class CarouselAnimation {
  constructor(domObj) {
    this.carouselSlide = domObj.carouselSlide;
    this.items = domObj.items;
    this.itemWidth = domObj.itemWidth;
  }

  setTransition() {
    this.carouselSlide.style.transition = "transform 0.4s ease-in-out";
  }

  removeTransition() {
    this.carouselSlide.style.transition = "none";
  }

  moveCarouselSlideTranslateX(counter) {
    const moveTranslateXValue = this.itemWidth * counter;
    this.carouselSlide.style.transform = `translateX(${-moveTranslateXValue}px)`;
  }
}

export default CarouselAnimation;
