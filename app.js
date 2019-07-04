import MakeTemplate from "./template.js";
import Carousel from "./carousel.js";
import Pagination from "./pagination.js";

const makeTemplate = new MakeTemplate();

const carousel = new Carousel(".carousel", {
  infinite: true,
  speed: 1000
});

const pagination = new Pagination();

makeTemplate.init();
carousel.init(pagination);
pagination.init(carousel);
