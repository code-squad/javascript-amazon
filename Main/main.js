// prettier-ignore
/*eslint-disable */
import render from '../PLib/render.js';
import autoSugesstionInit from '../AutoSuggestion/src/js/initiator.js';
import initCarousel from '../Carousel/src/js/initiator.js';
import mainTpl from './src/mainTpl.js';
import renderHTML from '../PLib/render.js';

window.addEventListener('DOMContentLoaded', () => {
  renderHTML({
    currentVersion: 1,
    url: '../static/tpl-src-data.json',
    templateFunc: mainTpl
  }).then(_ => {
    autoSugesstionInit();
    initCarousel();
  });
});
