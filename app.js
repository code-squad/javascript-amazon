import Carousel from "./carousel.js";
import Pagination from "./pagination.js";

const carousel = new Carousel(".carousel", {
  infinite: true,
  speed: 1000
});

const pagination = new Pagination();
carousel.init(pagination);
pagination.init(carousel);
