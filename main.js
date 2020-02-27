import SlideService from './Slide/SlideService.js';
import SearchController from './Search/SearchController.js'
import SearchView from './Search/SearchView.js'
import SearchModel from './Search/SearchModel.js'

window.addEventListener('DOMContentLoaded', () => {
    const url = 'https://ello.dlinkddns.com:8080';

    const searchView = new SearchView();
    const searchModel = new SearchModel(searchView);

    const searchController = new SearchController(searchModel, searchView);
    const slideService = new SlideService(url);
});