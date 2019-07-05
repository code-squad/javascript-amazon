import Carousel from "./carousel.js";
import Pagination from "./pagination.js";

class Manager {
  constructor(obj) {
    this.carousel = obj.carousel;
    this.pagination = obj.pagination;
    this.jsonData;

    this.MapData = {
      initDataCnt: 0,
      currentShowingIndex: 1,
      active: "active",
      clone: "clone",
      flex: "flex",
      scale: "scale",
      carouselAttr: "data-index",
      paginationAttr: "data-nav-index"
    };
  }

  getJsonData(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.initManager(data);
        this.initComponent();
      });
  }

  initManager(data) {
    this.jsonData = data;
    this.MapData["initDataCnt"] = this.jsonData.length;
  }

  initComponent() {
    this.carousel.initData(this.jsonData);
    this.pagination.initData(this.jsonData);

    this.carousel.initSetting(this.MapData, this.notify.bind(this));
    this.pagination.initSetting(this.MapData, this.notify.bind(this));
  }

  notify(el, newActiveIndex) {
    if (el.classList.contains("btn-prev")) {
      this.carousel.moveCarousel(1);
      this.pagination.scaleUp(newActiveIndex - 1);
    } else if (el.classList.contains("btn-next")) {
      this.carousel.moveCarousel(-1);
      this.pagination.scaleUp(newActiveIndex - 1);
    } else if (el.classList.contains(`item${newActiveIndex}`)) {
      let navPointer = -(this.carousel.width * newActiveIndex);
      let currentActiveIndex = this.carousel.getActiveItem();
      this.pagination.scaleUp(newActiveIndex - 1);
      this.carousel.updateActiveItem(currentActiveIndex, newActiveIndex, true);
      navPointer = -(this.carousel.width * newActiveIndex);
      this.carousel.moveCarousel(navPointer, true);
    }
  }
}

const carousel = new Carousel(".carousel");
const pagination = new Pagination(".navigation-list");
const manager = new Manager({ carousel, pagination });

window.addEventListener("DOMContentLoaded", () => {
  manager.getJsonData("./resources/data/carouselData.json");
});
