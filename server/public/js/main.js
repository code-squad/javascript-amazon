import { OPTION_DATA } from './optionData.js';
import DataRender from './dataRender.js';
import Slide, { NavCard } from './slide.js';


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
    const dataRender = new DataRender(OPTION_DATA, data);
    dataRender.setNav();
    dataRender.setSlide();

    OPTION_DATA.slideOption.FIRST_ITEM_INDEX = Math.floor(Math.random() * OPTION_DATA.slideOption.ITEM_COUNT);

    const navCard = new NavCard(OPTION_DATA.slideOption);
    const slide = new Slide(OPTION_DATA.slideOption, [navCard]);
    slide.run();
}

main();