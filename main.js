import Carousel from "./Jungle/components/Carousel/index.js";

window.addEventListener("DOMContentLoaded", () => {
  //DOM
  const carousel_div = document.querySelector(".carousel");

  new Carousel({
    carouselElement: carousel_div,
    options: {
      width: 700,
      height: 300,
      duration: 300
    }
  });
});
