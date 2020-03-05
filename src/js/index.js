import DATA from './data.js';
import MainUI from './uiMain.js';
import Slider from './slider.js';

const card = new MainUI(DATA);
document.querySelector('#card').innerHTML = card.render();

const slider = new Slider({
    wrapEl: '#card',
    navEl: '.card-nav',
    contentsEl: '.card-contents',
    itemsEl: '.card-item',
    itemEl: '.card-item',
    prevEl: '.btn-prev',
    nextEl: '.btn-next',
    speed: 500,
    view: 1
});