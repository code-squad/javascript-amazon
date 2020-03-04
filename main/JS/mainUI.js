import util from "./util.js";

import CarouselElement from "./carouselElement.js";
import CarouselAnimation from "./carouselAnimation.js";

import NavElement from "./navElement.js";
import NavAnimation from "./navAnimation.js";

const carouselSlide = util.$(".carousel_slide");
const nav = util.$(".nav");

class MainUI {
  constructor(mainObj) {
    this.counter = mainObj.counter;
    this.carouselSlide = mainObj.carouselSlide;
    this.items = mainObj.items;
    this.navItems = mainObj.totalNavItems;
    this.prev = mainObj.prev;
    this.next = mainObj.next;
    this.maxCounter = mainObj.maxCounter;
    this.minCounter = mainObj.minCounter;

    this.navAnimation = mainObj.navAnimation;
    this.carouselAnimation = mainObj.carouselAnimation;
  }

  onNextEvent() {
    this.next.addEventListener("click", () => {
      this.carouselAnimation.setTransition();
      this.counter++;
      this.carouselAnimation.moveCarouselSlideTranslateX(this.counter);
      this.navAnimation.moveNextScale(this.counter, this.maxCounter);
    });
  }
  onPrevEvent() {
    this.prev.addEventListener("click", () => {
      this.carouselAnimation.setTransition();
      this.counter--;
      this.carouselAnimation.moveCarouselSlideTranslateX(this.counter);
      this.navAnimation.movePrevScale(this.counter, this.minCounter);
    });
  }
  onTransitionEndEvent() {
    const firstIndex = 1;
    const lastIndex = this.items.length - 2;

    this.carouselSlide.addEventListener("transitionend", () => {
      if (this.items[this.counter].id === "last") {
        this.carouselAnimation.removeTransition();
        this.counter = firstIndex;
        this.carouselAnimation.moveCarouselSlideTranslateX(this.counter);
      }
      if (this.items[this.counter].id === "first") {
        this.carouselAnimation.removeTransition();
        this.counter = lastIndex;
        this.carouselAnimation.moveCarouselSlideTranslateX(this.counter);
      }
    });
  }

  clickNavItems() {
    this.navItems.forEach((el, index) => {
      el.addEventListener("click", () => {
        let beforeIndex = this.counter - 1;
        this.counter = index + 1;
        this.navItems[beforeIndex].style.transform = "none";
        this.navItems[this.counter - 1].style.transform = "scale(1.1)";
        this.carouselAnimation.setTransition();
        this.carouselAnimation.moveCarouselSlideTranslateX(this.counter);
      });
    });
  }

  render() {
    this.onNextEvent();
    this.onPrevEvent();
    this.onTransitionEndEvent();
    this.clickNavItems();
  }
}

function fetchData(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const carouselElement = new CarouselElement(carouselSlide);
      const navElement = new NavElement(nav);

      navElement.createNavElement(data);
      carouselElement.createCarouselElement(data);

      const navItems = util.$$(".nav_item");
      const carouselObj = {
        carouselSlide: carouselSlide,
        items: util.$$(".item"),
        itemWidth: util.$(".item").clientWidth
      };

      const mainObj = {
        counter: 1,
        items: util.$$(".item"),
        prev: util.$(".button_prev"),
        next: util.$(".button_next"),
        carouselSlide: carouselSlide,
        totalNavItems: navItems,
        maxCounter: util.$$(".item").length - 1,
        minCounter: 0,
        navAnimation: new NavAnimation(navItems),
        carouselAnimation: new CarouselAnimation(carouselObj)
      };

      const test = new MainUI(mainObj);
      test.render();
    });
}
fetchData("http://localhost:8080/JSON/localData.json");
