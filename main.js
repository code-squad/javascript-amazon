import SlideService from './Slide/SlideService.js';
import SearchController from './Search/SearchController.js'
import SearchView from './Search/SearchView.js'
import SearchModel from './Search/SearchModel.js'

window.addEventListener('DOMContentLoaded', () => {
    const url = 'https://us-central1-example-29f86.cloudfunctions.net/api1/';

    const searchView = new SearchView();
    const searchModel = new SearchModel(searchView);

    const searchController = new SearchController(searchModel, searchView);
    const slideService = new SlideService(url);
});