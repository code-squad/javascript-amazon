import Carousel from "./Jungle/components/Carousel/Carousel.js";
//TODO: Carousel.js를 index.js로 바꾸기.

window.addEventListener("DOMContentLoaded", () => {
  //DOM
  const carousel_div = document.querySelector(".carousel");

  new Carousel({ carouselElement: carousel_div });
});
