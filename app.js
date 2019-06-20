import Jungle from "./Jungle.js";

const jungle = new Jungle();

window.onload = () => {
  const carousel = jungle.createCarousel({container : ".container", slider: ".card-slider"});
  const navigation = jungle.createNavigation({nav: ".nav-item"});
};