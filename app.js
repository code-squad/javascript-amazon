import Jungle from './Jungle/index.js';
import { makeElements } from './template.js';

const getData = async () =>
  await fetch('./resources/localData.json').then(response => response.json());

const addCardsToDOM = cards => {
  const cardElements = makeElements(cards, 'card');
  const navItemElements = makeElements(cards, 'navItem');

  document.querySelector('.container').insertAdjacentHTML('afterbegin', cardElements);
  document.querySelector('.nav').insertAdjacentHTML('afterbegin', navItemElements);
};

const makeCarousel = () => {
  const jungle = new Jungle();
  return jungle.createCarousel({
    elClassNameObj: {
      container: '.container',
      slider: '.card-slider',
      nav: '.nav'
    }
  });
};

window.addEventListener('DOMContentLoaded', () => {
  const data = getData();
  let carousel;

  // prettier-ignore
  data
    .then(cards => addCardsToDOM(cards))
    .then(_ => carousel = makeCarousel());
});
