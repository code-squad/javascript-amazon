import Jungle from "./Jungle/index.js";

const jungle = new Jungle();

window.onload = () => {
  const carousel = jungle.createCarousel({container : ".container", slider: ".card-slider", nav: ".nav"});

  const carousel2 = jungle.createCarousel({container : ".container2", slider: ".card-slider2"});
  const nav = jungle.createNavigation({nav: '.nav2'})
};