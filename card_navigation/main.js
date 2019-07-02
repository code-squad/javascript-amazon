import initCarousel from './carouselUI/carousel_initiator.js'
import Templater from './templater.js'

const templater = new Templater();

const getJsonData = url => fetch(url).then(res => res.json());

const init = _ => {
  const data = getJsonData('localData.json');
  data
    .then(data => templater.insertCards(data))
    .then(data => initCarousel(data))
};

window.addEventListener("DOMContentLoaded", _ => init());