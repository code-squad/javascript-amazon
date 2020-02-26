import { $qs } from "./util.js";
import Carousel from "./components/carousel.js";

const CARD_WIDTH = 1080;
const PORT = 8080;
const URL = `http://localhost:${PORT}/amazon/slider.json`;

let dataForSlider = JSON.parse(localStorage.getItem("slider"));

const fetchData = () => {
  fetch(URL)
    .then(res => res.json())
    .then(data => {
      renderSlider(data);
      dataForSlider = data;
      localStorage.setItem("slider", JSON.stringify(data));
    })
    .catch(err => console.log(err));
};

const renderSlider = data => {
  const carouselSlider = new Carousel(data, CARD_WIDTH);
  $qs("#carousel-slider").innerHTML = carouselSlider.render();
  carouselSlider.activateSlideAnimation();
};

window.addEventListener("DOMContentLoaded", () => {
  dataForSlider ? renderSlider(dataForSlider) : fetchData();
});
