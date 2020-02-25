import { setting } from "./config.js";
import { NavigationBar } from "./navigationBar.js";
import { Carousel } from "./carousel.js";
import { fetchData } from "./fetchData.js";

class Main {
  constructor() {
    fetchData();
    this.run();
  }

  run() {
    window.addEventListener("DOMContentLoaded", () => {
      const navigationBar = new NavigationBar(setting);
      const carousel = new Carousel(setting);
    });
  }
}

const main = new Main();
