import Carousel from "./components/Carousel.js";

class Jungle {
  Carousel(classes, options) {
    const carousel = new Carousel(classes, options);
    carousel.init();
    return carousel;
  }
}

export default Jungle;