import options from './slide/options.js';
import DataRender from './slide/dataRender.js';
import Slide from './slide/slide.js';
import NavCard from './slide/navCard.js';
import SearchBar from './search/searchBar.js';
import SearchList from './search/searchList.js';

const SLIDE_DATA_KEY = "SLIDE_DATA_RM";

function main() {
    slideDataParse();
    startSeachBarSevice();
}

main();


function slideDataParse() {
    const data = localStorage.getItem(SLIDE_DATA_KEY);
    if (data) {
        startSlideService(JSON.parse(data));
    } else {
        fetch("http://localhost:8080/json/localData.json")
            .then(response => response.json())
            .then(data => {
                localStorage.setItem(SLIDE_DATA_KEY, JSON.stringify(data));
                startSlideService(data);
            });
    }
}

function startSlideService(data) {
    const dataRender = new DataRender(data);
    dataRender.setNav();
    dataRender.setSlide();

    options.slideOption.curItem = Math.floor(Math.random() * options.slideOption.itemsCount);

    const navCard = new NavCard();
    const slide = new Slide(navCard);
    slide.run();
}

function startSeachBarSevice() {
    const searchList = new SearchList();
    const searchBar = new SearchBar(searchList);
    searchBar.run();
}