class CarouselClickEvent {
  constructor(carouselUl, carouselScrollArrowR, carouselScrollArrowL, xValue) {
    this.carouselUl = carouselUl;
    this.carouselScrollArrowR = carouselScrollArrowR;
    this.carouselScrollArrowL = carouselScrollArrowL;
    this.xValue = xValue;
  }

  swichCarouselL() {
    this.carouselScrollArrowL.addEventListener('click', function (event) {
      this.xValue === 0 ? this.xValue = -840 : this.xValue += +280;
      this.carouselUl.style.transform = `translateX(${this.xValue}px)`;
    }.bind(this));
  }

  swichCarouselR() {
    this.carouselScrollArrowR.addEventListener('click', function (event) {
      this.xValue === -840 ? this.xValue = 0 : this.xValue += -280;
      this.carouselUl.style.transform = `translateX(${this.xValue}px)`;
    }.bind(this));
  }
}

const carouselUl = document.querySelector(".carousel-ul");
const carouselScrollArrowR = document.querySelector(".scroll-right");
const carouselScrollArrowL = document.querySelector(".scroll-left");
let xValue = 0;

const carouselClickEvent = new CarouselClickEvent(carouselUl, carouselScrollArrowR, carouselScrollArrowL, xValue );

document.addEventListener("DOMContentLoaded", () => {
  carouselClickEvent.swichCarouselL();
  carouselClickEvent.swichCarouselR();
});



