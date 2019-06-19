import Jungle from "./Jungle.js";

const jungle = new Jungle();

window.onload = () => {
  const carousel = jungle.Carousel({container : ".container", slider: ".card-slider"});
};
