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
      duration: 300
    }
  });

  new Navigation({
    navigationElement: navigation_div,
    options: {
      width: 650,
      height: 100,
      duration: 200
    }
  });
});
