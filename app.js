import Carousel from "./carousel.js";
import Pagination from "./pagination.js";

class Manager {
  constructor(obj) {
    this.carousel = obj.carousel;
    this.pagination = obj.pagination;
  }

  initComponent() {
    carousel.getJsonData("./resources/data/carouselData.json");
  }
}

const carousel = new Carousel(".carousel");
const pagination = new Pagination();
const manager = new Manager({ carousel, pagination });

window.addEventListener("DOMContentLoaded", () => {
  manager.initComponent();
});
