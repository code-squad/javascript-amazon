import options from './options.js';
import DataRender from './dataRender.js';
import Slide from './slide.js';
import NavCard from './navCard.js';
import search from './search.js';

function main() {
    const realMadridData = localStorage.getItem('REAL-MADRID');
    if (realMadridData) {
        startSlideService(JSON.parse(realMadridData));
    } else {
        fetch("http://localhost:8080/json/localData.json")
            .then(response => response.json())
            .then(json => {
                localStorage.setItem('REAL-MADRID', JSON.stringify(json));
                startSlideService(json);
            });
    }
}

function startSlideService(data) {
    const dataRender = new DataRender(data);
    dataRender.setNav();
    dataRender.setSlide();

    options.slideOption.curItem = Math.floor(Math.random() * options.slideOption.itemsCount);

    const navCard = new NavCard();
    const slide = new Slide([navCard]);
    slide.run();
}

main();
search();