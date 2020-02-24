// 객체 타입으로 전달 예정입니다.
import CarouselDataControlloer from "./carouselinner.js";
import library from "./library.js";

const carouselSlide = library.$(".carousel_slide");
const CarouselDataControlloerCall = new CarouselDataControlloer(carouselSlide);
CarouselDataControlloerCall.render();

class Carouselanimation {
  constructor(domCallUp) {
    this.carouselSlide = domCallUp.carouselSlide;
    this.items = domCallUp.items;
    this.itemWidth = domCallUp.itemWidth;
  }

  transform() {
    this.carouselSlide.style.transition = "transform 0.4s ease-in-out";
  }
  transformNone() {
    this.carouselSlide.style.transition = "none";
  }

  CalculationCarouselSlideTranslateX(counter) {
    this.carouselSlide.style.transform = `translateX(${-(
      this.itemWidth * counter
    )}px)`;
  }
  transitionEndEvent(counter) {
    this.carouselSlide.addEventListener("transitionend", () => {
      if (this.items[counter].id === "last") {
        this.carouselSlide.style.transition = "none";
      }
    });
  }

  render() {}
}

export default Carouselanimation;
