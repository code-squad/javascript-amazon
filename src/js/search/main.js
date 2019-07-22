import ControlSearch from './control/controlSearch.js';
// import SearchBarView from './view/SearchBarView.js';
import SearchModel from './model/searchModel.js';
import AutocompleteView from './view/AutocompleteView.js';
import RecentSearchView from './view/RecentSearchView.js';
import MainView from './view/MainView.js';


const searchIcon = document.querySelector('.search__iconbox'),
      inputBox = document.querySelector('.input__box'),
      searchBar = inputBox.querySelector('.input__box--search-bar'),
      delayedTime = 300,
      limitedNum = 5;

const searchModel = new SearchModel(limitedNum),
      recentSearchView = new RecentSearchView(),
      autocompleteView = new AutocompleteView(limitedNum),
      mainView = new MainView({autocompleteView, recentSearchView, inputBox, searchBar}),
      controlSearch = new ControlSearch({mainView, searchModel, searchIcon, delayedTime});


window.addEventListener('DOMContentLoaded', () => {
  controlSearch.eventHandler();
})


