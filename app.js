import Jungle from "./Jungle.js";

const jungle = new Jungle();

window.onload = () => {
  const carousel = jungle.createCarousel({container : ".container", slider: ".card-slider", nav: ".nav-item"});
};