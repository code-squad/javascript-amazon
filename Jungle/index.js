import Carousel from "./components/Carousel.js";
import Navigation from "./components/Navigation.js";
import Observer from "./Observer.js";

class Jungle {
  createCarousel(classes, options, observer) {
    if (observer === undefined) {
      observer = new Observer();
    }

    const carousel = new Carousel(classes, observer, options);
    carousel.init();

    if("nav" in classes) {
      const nav = this.createNavigation({nav: classes.nav}, {}, observer);
      observer.register("carouselMove", nav.setItem, nav);
      observer.register("selectNav", carousel.move, carousel);
    }

    return carousel;

  }

  createNavigation(classes, options, observer) {
    if (observer === undefined) {
      observer = new Observer();
    }

    const navigation = new Navigation(classes, options, observer);
    navigation.init();
    return navigation;
  }
}

export default Jungle;