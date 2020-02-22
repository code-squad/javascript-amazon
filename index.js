import { $qs } from "./util.js";
import data from "./mock-data.js";
import Carousel from "./components/carousel.js";

const CARDWIDTH = 1080;

const renderSlider = () => {
  const carouselSlider = new Carousel(data, CARDWIDTH);
  $qs("#carousel-slider").innerHTML = carouselSlider.render();
  carouselSlider.activateSlideAnimation();
};

window.addEventListener("DOMContentLoaded", renderSlider);
