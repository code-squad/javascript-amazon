import CarouselController from "./CarouselController.js";
import CarouselView from "./CarouselView.js";

export default class Carousel {
  constructor({ carouselElement, options }) {
    this.view = new CarouselView({ carouselElement, options });
    this.controller = new CarouselController({ view: this.view });
  }
}
