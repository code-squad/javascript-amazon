import Jungle from './Jungle/index.js';

const jungle = new Jungle();

const getData = async () =>
  await fetch('./resources/localData.json').then(response => response.json());

const makeCard = data => {
  return `
    <div class="card" key=${data._id}>
      <div class="thumb">
      <img src="${data.imgURL}" alt="card-thumbnail" />
      </div>
      <div class="content">
        <h2>${data.title}</h2>
        <ul>
          ${data.desc.reduce((acc, cur) => {
            const li = `<li>${cur}</li>`;
            acc += li;
            return acc;
          }, '')}
        </ul>
      </div>
    </div>`;
};

const makeNavItem = data => {
  return `
    <div class="nav-item ${data.color}">${data.title}</div>
  `;
};

window.addEventListener('DOMContentLoaded', () => {
  const data = getData();

  data
    .then(cards => {
      const cardElement = cards.reduce((acc, cur) => {
        acc += makeCard(cur);
        return acc;
      }, '');

      const navItemElement = cards.reduce((acc, cur) => {
        acc += makeNavItem(cur);
        return acc;
      }, '');

      document.querySelector('.card-slider').insertAdjacentHTML('afterbegin', cardElement);
      document.querySelector('.nav').insertAdjacentHTML('afterbegin', navItemElement);
    })
    .then(_ => {
      jungle.createCarousel({
        elClassNameObj: {
          container: '.container',
          slider: '.card-slider',
          nav: '.nav'
        }
      });
    });
});
