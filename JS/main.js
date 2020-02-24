import CarouselAnimation from "./carouselanimation.js";
import navAnimation from "./navanimation.js";
import library from "./library.js";

const carouselDom = {
  carouselSlide: library.$(".carousel_slide"),
  items: library.$$(".item"),
  itemWidth: library.$(".item").clientWidth
};

const navItems = library.$$(".nav_item");

const CarouselAnimationCall = new CarouselAnimation(carouselDom);

const navAnimationCall = new navAnimation(navItems);

const itemsList = library.$$(".item");
const mainDom = {
  counter: 1,
  items: itemsList,
  prev: library.$(".button_prev"),
  next: library.$(".button_next"),
  carouselSlide: carouselDom.carouselSlide,
  totalNavItems: navItems,
  maxCounter: itemsList.length - 1,
  minCounter: 0
};
console.log(mainDom.totalNavItems);

//console.log(mainDom.maxCounter);

class Main {
  constructor(mainDom) {
    this.counter = mainDom.counter;
    this.carouselSlide = mainDom.carouselSlide;
    this.items = mainDom.items;
    this.navItems = mainDom.totalNavItems;
    this.prev = mainDom.prev;
    this.next = mainDom.next;

    this.maxCounter = mainDom.maxCounter;
    this.minCounter = mainDom.minCounter;
  }
  nextEvent() {
    this.next.addEventListener("click", () => {
      CarouselAnimationCall.transform();
      this.counter++;
      CarouselAnimationCall.CalculationCarouselSlideTranslateX(this.counter);
      navAnimationCall.nextScale(this.counter, this.maxCounter);
    });
  }
  prevEvent() {
    this.prev.addEventListener("click", () => {
      CarouselAnimationCall.transform();
      this.counter--;
      CarouselAnimationCall.CalculationCarouselSlideTranslateX(this.counter);
      navAnimationCall.prevScale(this.counter, this.minCounter);
    });
  }

  chooseNavBar() {
    // this 의 값에 변화를 주는 아이 불가피한가 ?
    this.navItems.forEach((el, index) => {
      el.addEventListener("click", () => {
        let beforePointer = this.counter - 1;
        this.counter = index + 1;
        this.navItems[beforePointer].style.transform = "none";
        this.navItems[this.counter - 1].style.transform = "scale(1.1)";
        CarouselAnimationCall.transform();
        CarouselAnimationCall.CalculationCarouselSlideTranslateX(this.counter);
      });
    });
  }

  transitionEndEvent() {
    let firstCounter = 1;
    let lastCounter = this.items.length - 2;

    this.carouselSlide.addEventListener("transitionend", () => {
      if (this.items[this.counter].id === "last") {
        CarouselAnimationCall.transformNone();
        this.counter = firstCounter;
        CarouselAnimationCall.CalculationCarouselSlideTranslateX(this.counter);
      }
      if (this.items[this.counter].id === "first") {
        CarouselAnimationCall.transformNone();
        this.counter = lastCounter;
        CarouselAnimationCall.CalculationCarouselSlideTranslateX(this.counter);
      }
    });
  }
  render() {
    this.chooseNavBar(this.counter);
    this.nextEvent();
    this.prevEvent();
    this.transitionEndEvent();
  }
}

const test = new Main(mainDom);
test.render();
