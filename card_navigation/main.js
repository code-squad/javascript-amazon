import $ from './allenibrary.js'
import Carousel from './carousel.js'
import StateManager from './state_manager.js'
import Pagination from './pagination.js'

const getDescLists = (descLists) => {
  return descLists.reduce((acc, curr) => acc + `<li>${curr}</li>`, '')
}

const insertCards = (data) => {
  let tpl = data.reduce((acc, curr) => {
    const { id, title, desc, imgURL } = curr;
    return acc + `<li class='benefit-card' id=${id} style='background-image:url(${imgURL})'>
                <div class='benefit-desc'>
                  <h4 class='benefit-title'>${title}</h4>
                  <ul class='desc-list'>
                    ${getDescLists(desc)}
                    </ul>
                </div>
                </li>`
  }, '')

  const cardWrapper = $('.card-wrapper');
  cardWrapper.insertAdjacentHTML('beforeend', tpl);
}

const getJsonData = url => fetch(url).then(res => res.json());

const initCarousel = () => {
  const startIdx = 0;
  const quantityToSlide = 1;
  const panelQuantity = 4;
  const stateManager = new StateManager({ startIdx, quantityToSlide, panelQuantity });
  const pagination = new Pagination(stateManager, ".benefit-list");
  const carousel = new Carousel(stateManager, ".benefit-content", {
    infinite: true,
    prevBtn: ".arrow-left",
    nextBtn: ".arrow-right",
  });
}

const init = _ => {
  const data = getJsonData('localData.json');
  data
    .then(data => insertCards(data))
    .then(() => initCarousel())
};

window.addEventListener("DOMContentLoaded", _ => init());