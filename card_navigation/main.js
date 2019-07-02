import $ from './allenibrary.js'
import Carousel from './carousel.js'

const getJsonData = url => fetch(url).then(res => res.json());

const initCarousel = () => {
  const carousel = new Carousel(".benefit-content", {
    infinite: true,
    prevBtn: ".arrow-left",
    nextBtn: ".arrow-right",
    stepList: ".benefit-list"
  });
}

const init = _ => {
  const data = getJsonData('localData.json');
  initCarousel();
};

window.addEventListener("DOMContentLoaded", _ => init());