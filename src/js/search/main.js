import ControlSearch from './control/controlSearch.js';
// import SearchBarView from './view/SearchBarView.js';
import SearchModel from './model/searchModel.js';
import AutocompleteView from './view/AutocompleteView.js';
import RecentSearchView from './view/RecentSearchView.js';
import MainView from './view/MainView.js';


const inputBox = document.querySelector('.input__box'),
      searchBar = inputBox.querySelector('.input__box--search-bar'),
      limitedNum = 6;

// const searchBarView = new SearchBarView(searchBar),
const searchModel = new SearchModel(limitedNum),
      recentSearchView = new RecentSearchView(),
      autocompleteView = new AutocompleteView(limitedNum),
      mainView = new MainView({autocompleteView, recentSearchView, inputBox, searchBar}),
      controlSearch = new ControlSearch({mainView, searchModel});


window.addEventListener('DOMContentLoaded', () => {
  controlSearch.eventHandler();
})


