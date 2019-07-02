import Carousel from './carousel.js'
import StateManager from './state_manager.js'
import Pagination from './pagination.js'

const startIdx = 0;
const quantityToSlide = 1;
const panelQuantity = 4;

const stateManager = new StateManager({ startIdx, quantityToSlide, panelQuantity });
const pagination = new Pagination(stateManager, ".benefit-list");
const carousel = new Carousel(stateManager, ".benefit-content", {
  infinite: true,
  prevBtn: ".arrow-left",
  nextBtn: ".arrow-right",
});