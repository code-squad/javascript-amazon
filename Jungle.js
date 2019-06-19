import Carousel from "./carousel.js";

class Jungle {
  Carousel(classes, options) {
    const carousel = new Carousel(classes, options);
    carousel.init();
    return carousel;
  }
}

export default Jungle;