import Carousel from "./components/Carousel.js";
import Navigation from "./components/Navigation.js";

class Jungle {
  constructor() {

  }
  createCarousel(classes, options) {
    const carousel = new Carousel(classes, options);
    carousel.init();
    if("nav" in classes) {
      const nav = this.createNavigation({nav: classes.nav});
    }
    return carousel;

  }

  createNavigation(classes) {
    const navigation = new Navigation(classes);
    navigation.init();
    return navigation;
  }
}

export default Jungle;