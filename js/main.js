import { OPTION_DATA } from './optionData.js';
import DataRender from './dataRender.js';
import Slide from './slide.js';
import NavCard from './navCard.js';


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

    OPTION_DATA.slideOption.CUR_ITEM = Math.floor(Math.random() * OPTION_DATA.slideOption.ITEM_COUNT);

    const navCard = new NavCard();
    const slide = new Slide([navCard]);
    slide.run();
}

main();