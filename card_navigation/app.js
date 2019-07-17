import Templater from './templater.js'
import StateManager from './src/state_manager.js'
import Carousel from './src/carousel.js'
import Pagination from './src/pagination.js'
import { getJsonData } from '../utils/allenibrary.js'

const startIdx = 0;
const quantityToSlide = 1;

const templater = new Templater();

export const initCarousel = () => {
  const data = getJsonData('./card_navigation/localData.json');
  data
    .then(data => templater.insertCards(data))
    .then(data => {
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
    })
};
