import Templater from './templater.js'
import StateManager from './state_manager.js'
import Carousel from './carousel.js'
import Pagination from './pagination.js'
import { getJsonData } from '../../utils/allenibrary.js'

//TODO: constants 분리하기
const startIdx = 0;
const quantityToSlide = 1;

const templater = new Templater();

export const initCarousel = () => {

  const data = getJsonData('./resource/localData.json');
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
