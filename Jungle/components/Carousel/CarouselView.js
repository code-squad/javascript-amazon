import MyEventEmitter from "../../../Grenutil/MyEventEmitter/index.js";

export default class CarouselView extends MyEventEmitter {
  constructor({ carouselElement }) {
    super();

    this.carousel = carouselElement;
  }
}