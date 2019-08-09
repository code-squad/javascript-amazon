import config from './config.js';
import stateUpdater from './stateUpdater.js';
import StateManager from './StateManager.js';
import Main from '../component/Main/MainView.js';
import Nav from '../component/Nav/NavView.js';

const initCarousel = () => {
  StateManager.getUpdatedStateFrom = stateUpdater;
  const stateManager = new StateManager();
  const main = new Main(config);
  const nav = new Nav(config);

  stateManager.addObserver(main, nav);
  main.addSubjet(stateManager);
  nav.addSubjet(stateManager);

  main.init();
  nav.init();
};

export default initCarousel;
