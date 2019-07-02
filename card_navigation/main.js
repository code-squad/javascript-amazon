import $ from './carouselUI/allenibrary.js'
import initCarousel from './carouselUI/carousel_initiator.js'

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
  return data;
}

const getJsonData = url => fetch(url).then(res => res.json());

const init = _ => {
  const data = getJsonData('localData.json');
  data
    .then(data => insertCards(data))
    .then(data => initCarousel(data))
};

window.addEventListener("DOMContentLoaded", _ => init());