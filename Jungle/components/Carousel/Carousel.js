import CarouselController from "./CarouselController.js";
import CarouselView from "./CarouselView.js";

export default class Carousel {
  constructor({ carouselElement }) {
    this.view = new CarouselView({ carouselElement });
    this.controller = new CarouselController({ view: this.view });
  }
}
