import options from './slide/options.js';
import DataRender from './slide/dataRender.js';
import Slide from './slide/slide.js';
import NavCard from './slide/navCard.js';
import SearchBar from './search/searchBar.js';
import SearchList from './search/searchList.js';

const realMadridDataKey = "REAL-MADRID";

function main() {
    slideDataParse();
    startSeachBarSevice();
}

main();


function startSlideService(data) {
    const dataRender = new DataRender(data);
    dataRender.setNav();
    dataRender.setSlide();

    options.slideOption.curItem = Math.floor(Math.random() * options.slideOption.itemsCount);

    const navCard = new NavCard();
    const slide = new Slide(navCard);
    slide.run();
}

function slideDataParse() {
    const realMadridData = localStorage.getItem(realMadridDataKey);
    if (realMadridData) {
        startSlideService(JSON.parse(realMadridData));
    } else {
        fetch("http://localhost:8080/json/localData.json")
            .then(response => response.json())
            .then(json => {
                localStorage.setItem(realMadridDataKey, JSON.stringify(json));
                startSlideService(json);
            });
    }
}

function startSeachBarSevice() {
    const searchList = new SearchList();
    const searchBar = new SearchBar(searchList);
    searchBar.run();
}