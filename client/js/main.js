import { Carousel } from "./carousel.js";
import { TemplateData } from "./templateData.js";

const jsonFileUrl = "http://localhost:8080/users";
const data = localStorage.getItem("mockData");

const carousel = { slideAll: document.querySelector(".slider") };
const arrowButtons = { buttons: document.querySelectorAll(".slide-btn > button") };
const width = { MAX_PANEL_SIZE: 760 };
let currentIndex = { START_CAROUSEL_INDEX: 1 };
let maxIndex = { MAX_CAROUSEL_SIZE: 5 };

const config = Object.assign(carousel, arrowButtons, width, currentIndex, maxIndex);

const run = () => {
  fetch(jsonFileUrl)
    .then(response => response.json())
    .then(mockData => {
      localStorage.setItem("mockData", JSON.stringify(mockData));
    })
    .then(() => {
      const templateData = new TemplateData(JSON.parse(data));
    })
    .then(() => {
      const carousel = new Carousel(config);
    });
};

run();
