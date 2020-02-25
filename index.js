import { $qs } from "./util.js";
import Carousel from "./components/carousel.js";

const CARDWIDTH = 1080;
const URL = "http://localhost:8080/amazon/slider.json";

let dataForSlider = JSON.parse(localStorage.getItem("slider"));

if (!dataForSlider) {
  fetch(URL)
    .then(res => res.json())
    .then(data => {
      dataForSlider = data;
      localStorage.setItem("slider", JSON.stringify(data));
    })
    .catch(err => console.log(err));
}

const renderSlider = () => {
  const carouselSlider = new Carousel(dataForSlider, CARDWIDTH);
  $qs("#carousel-slider").innerHTML = carouselSlider.render();
  carouselSlider.activateSlideAnimation();
};

window.addEventListener("load", renderSlider);
