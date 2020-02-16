import { setting } from "./slideSetting.js";
import { NavigationBar } from "./navigationBar.js";
import { Carousel } from "./carousel.js";

class Main {
  constructor() {
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
