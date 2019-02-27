import './assets/sass/main.scss';
import PlansLayer from './js/PlansLayer.js';

if (module.hot) {
  module.hot.accept()
}

document.addEventListener("DOMContentLoaded", () => {
  const layer = new PlansLayer();
  layer.init();
});
