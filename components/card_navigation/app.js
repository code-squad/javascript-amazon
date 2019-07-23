import { getJsonData } from '../../utils/allenibrary.js'
import Templater from './templater.js'
import StateManager from './state_manager.js'
import Carousel from './carousel.js'
import Pagination from './pagination.js'
import config from './config.js'

const templater = new Templater();
const stateManager = new StateManager({ config });
const pagination = new Pagination({ stateManager, config });
const carousel = new Carousel({ stateManager, config });

export const initCarousel = () => {
  const data = getJsonData(config.url);
  data.then(data => templater.insertCards(data))
    .then(data => {
      const panelQuantity = data.length;
      stateManager.init(panelQuantity);
      pagination.init();
      carousel.init();
    })
};