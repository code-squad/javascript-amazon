import MyFetch from "../../../Grenutil/MyFetch/index.js";

export default class CarouselController {
  constructor({ view }) {
    this.view = view;

    view.on("prev", () => {
      this.view.setItemSliderPosition({ dir: "prev" });
    });

    view.on("next", () => {
      this.view.setItemSliderPosition({ dir: "next" });
    });

    view.on("moveend", () => {
      this.view.isMoving = false;
      this.view.moveToCorrectPosition();
    });

    this.createCarousel();
  }

  loadCarsouelCss() {
    const head = document.getElementsByTagName("HEAD")[0];
    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "Jungle/components/Carousel/Carousel.css";

    head.appendChild(link);
  }

  createCarousel() {
    MyFetch("../../../data/localData.json")
      .then(data => {
        this.loadCarsouelCss();
        return data;
      })
      .then(data => this.view.initRender(data));
  }
}
