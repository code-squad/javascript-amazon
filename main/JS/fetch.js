import util from "./util.js";

import CarouselElement from "./carouselElement.js";
import CarouselAnimation from "./carouselAnimation.js";

import NavElement from "./navElement.js";
import NavAnimation from "./navAnimation.js";

import MainUI from "./mainUI.js";

const carouselSlide = util.$(".carousel_slide");
const nav = util.$(".nav");

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
