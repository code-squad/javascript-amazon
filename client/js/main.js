import { EventHandler } from "./eventHandler.js";
import { CarouselMovement } from "./carouselMovement.js";
import { TemplateData } from "./templateData.js";

const carousel = { slideAll: document.querySelector(".slider") };
const buttons = { buttons: document.querySelectorAll(".slide-btn > button") };
const width = { MAX_PANEL_SIZE: 760 };
let currentIndex = { START_CAROUSEL_INDEX: 1 };
let maxIndex = { MAX_CAROUSEL_SIZE: 5 };

const config = Object.assign(carousel, buttons, width, currentIndex, maxIndex);

const run = () => {
  fetch("http://localhost:8080/users")
    .then(response => response.json())
    .then(mockData => {
      const templateData = new TemplateData(mockData);
    })
    .then(() => {
      // const carouselMovement = new CarouselMovement(config);
      const eventHandler = new EventHandler(config);
    });
};

run();
