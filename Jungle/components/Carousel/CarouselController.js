import MyFetch from "../../../Grenutil/MyFetch/index.js";

export default class CarouselController {
  constructor({ view }) {
    this.view = view;

    view.on("prev", () => console.log("prev"));
    view.on("next", () => console.log("next"));

    this.createCarousel();
  }

  createCarousel() {
    MyFetch("../../../data/localData.json").then(data => this.view.render(data));
  }
}
