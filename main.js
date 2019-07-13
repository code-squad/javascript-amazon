import Carousel from "./Jungle/components/Carousel/index.js";
import Navigation from "./Jungle/components/Navigation/index.js";

window.addEventListener("DOMContentLoaded", () => {
  //DOM
  const carousel_div = document.querySelector(".carousel");
  const navigation_div = document.querySelector(".navigation");

  new Carousel({
    carouselElement: carousel_div,
    options: {
      width: 700,
      height: 300,
      duration: 300,
      navigation: true
    }
  });
});
