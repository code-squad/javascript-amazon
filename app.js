"use strict";

import Carousel from "./carousel.js";
import Pagination from "./pagination.js";

const carousel = new Carousel(".carousel", {
  infinite: true
});

const pagination = new Pagination(carousel);
carousel.init(pagination);
pagination.init();
