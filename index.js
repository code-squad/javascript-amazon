import { DataFetch } from "./fetch.js";
import { carouselFetch } from "./config.js";
import { SliderTemplate } from "./template/slider.js";
import { CardMenuTemplate } from "./template/cardMenu.js";
import { initCarouselCardSlider } from "./carousel/main.js";
import { initSearch } from "./search/main.js";
import { _$ } from "./util.js";

export function init() {
  const carouselService = new DataFetch(carouselFetch);
  carouselService
    .fetchData()
    .then(carouselData => initTemplate(carouselData))
    .then(() => startAmazonService())
    .catch(err => console.error(err));
}

function initTemplate(carouselData) {
  const CAROUSEL_AREA = "#carousel";
  const dataArea = _$(CAROUSEL_AREA);
  const cardMenuData = new CardMenuTemplate(carouselData.menuData);
  const sliderData = new SliderTemplate(carouselData.contentData);

  let data = "";
  data += cardMenuData.render();
  data += sliderData.render();
  dataArea.innerHTML = data;
}

function startAmazonService() {
  initCarouselCardSlider();
  initSearch();
}

window.addEventListener("DOMContentLoaded", init);
