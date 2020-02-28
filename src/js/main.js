import options from './slide/options.js';
import DataRender from './slide/dataRender.js';
import Slide from './slide/slide.js';
import NavCard from './slide/navCard.js';
import SearchBar from './search/searchBar.js';
import SearchList from './search/searchList.js';

(function main() {
    startSlideService();
    startSeachBarSevice();
})();


function startSlideService() {
    const dataRender = new DataRender();
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