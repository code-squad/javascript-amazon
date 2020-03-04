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
    this.carouselSlide.style.transform = `translateX(${-(
      this.itemWidth * counter
    )}px)`;
  }
}

export default CarouselAnimation;
