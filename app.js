import Jungle from "./Jungle/index.js";

const jungle = new Jungle();

window.onload = () => {
  const carousel = jungle.createCarousel({
    elClassNameObj: {
      container: ".container",
      slider: ".card-slider",
      nav: ".nav"
    }
  });

  const carousel2 = jungle.createCarousel({
    elClassNameObj: { container: ".container2", slider: ".card-slider2" },
    options: {
      duration: 100,
      animation: "ease-in",
      infinite: false
    }
  });
  const nav = jungle.createNavigation({ elClassNameObj: { nav: ".nav2" } });
};
