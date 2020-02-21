import { OPTION_DATA } from './data.js';
import DataAppend from './dataAppend.js';
import Slide, { NavCard } from './slide.js';

const dataJsonURL = "http://localhost:8080/json/localData.json";

function startSlideService() {
    fetch(dataJsonURL)
        .then(response => response.json())
        .then(json => {
            const dataAppend = new DataAppend(OPTION_DATA, json);
            dataAppend.setNav();
            dataAppend.setSlide();

            OPTION_DATA.slideOption.FIRST_ITEM_INDEX = Math.floor(Math.random() * OPTION_DATA.slideOption.ITEM_COUNT);

            const navCard = new NavCard(OPTION_DATA.slideOption);
            const slide = new Slide(OPTION_DATA.slideOption, [navCard]);
            slide.run();
        });
}

startSlideService();