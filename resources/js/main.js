import { Carousel } from "./carousel.js";
import { Templating } from "./templating.js";

window.addEventListener("DOMContentLoaded", () => {
  fetch("../data/localData.json")
    .then(res => res.json())
    .then(data => {
      const cardClass = `card`;
      const sliderClass = `slider`;
      const btnClass = `btn`;

      const templating = new Templating(data, {
        size: 4,
        cardClassName: cardClass,
        sliderClassName: sliderClass,
        btnClassName: btnClass,
      });

      const carousel = new Carousel(`.${sliderClass}-list`, `.${btnClass}`, {
        cardBtn: `.${cardClass}-item`,
        index: 2,
        useRandomIndex: false,
      });
    });
});
