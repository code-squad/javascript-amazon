// prettier-ignore
/*eslint-disable */

import config from './src/js/config.js';
import stateUpdater from './src/js/stateUpdater.js';
import StateManager from './src/js/StateManager.js';
import Main from './src/component/Main/Main.js';
import Nav from './src/component/Nav/Nav.js';
import carouselTemplate from './src/component/carousel.js';
import renderHTML from './src/js/render.js';

window.addEventListener('DOMContentLoaded', () => {
  renderHTML({
    currentVersion: 1,
    url: 'http://127.0.0.1:5500/data.json',
    templateFunc: carouselTemplate,
  }).then(_ => {
    StateManager.getUpdatedStateFrom = stateUpdater;
    const stateManager = new StateManager();
    const main = new Main(config);
    const nav = new Nav(config);

    stateManager.addObserver(main, nav);
    main.addSubjet(stateManager);
    nav.addSubjet(stateManager);

    main.init();
    nav.init();
  });
});
