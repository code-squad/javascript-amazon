import { Carousel } from "./carousel.js";
import { TemplateData } from "./templateData.js";

// const jsonFileUrl = "http://localhost:8080/carousel";
const jsonFileUrl = "../../../server/carouselData.json";
const data = localStorage.getItem("carouselData");

const carousel = { slideAll: document.querySelector(".slider") };
const arrowButtons = { buttons: document.querySelectorAll(".slide-btn > button") };
const width = { MAX_PANEL_SIZE: 760 };
let currentIndex = { START_CAROUSEL_INDEX: 1 };
let maxIndex = { MAX_CAROUSEL_SIZE: 5 };

const config = Object.assign(carousel, arrowButtons, width, currentIndex, maxIndex);

(() => {
  fetch(jsonFileUrl)
    .then(response => response.json())
    .then(carouselData => {
      localStorage.setItem("carouselData", JSON.stringify(carouselData));
    })
    .then(() => {
      const templateData = new TemplateData(JSON.parse(data));
    })
    .then(() => {
      const carousel = new Carousel(config);
    });
})();
