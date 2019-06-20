import Carousel from "./components/Carousel.js";
import Navigation from "./components/Navigation.js";

class Jungle {
  createCarousel(classes, options) {
    const carousel = new Carousel(classes, options);
    carousel.init();
    return carousel;
  }

  createNavigation(classes) {
    const navigation = new Navigation(classes);
    navigation.init();
    return navigation;
  }
}

export default Jungle;