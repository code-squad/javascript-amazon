import Carousel from './carousel.js'
import StateManager from './state_manager.js'
import Pagination from './pagination.js'

const startIdx = 0;
const quantityToSlide = 1;

const initCarousel = (data) => {
  const panelQuantity = data.length;

  const stateManager = new StateManager({ startIdx, quantityToSlide, panelQuantity });
  const pagination = new Pagination(stateManager, ".benefit-list", startIdx);
  const carousel = new Carousel(stateManager, ".benefit-content", {
    infinite: true,
    btnWrapper: ".content-wrapper",
    prevBtn: 'arrow-left',
    nextBtn: 'arrow-right',
    startIdx: startIdx
  });
}

export default initCarousel;