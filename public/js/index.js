import MainUI from './uiMain.js';
import Slider from './slider.js';

const apiServer = 'http://localhost:8081';
fetch(apiServer)
    .then(res => res.text())
    .then(body => {
        const card = new MainUI(JSON.parse(body));
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
    });
