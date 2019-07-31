import SearchModel from './model/searchModel.js';
import RecentSearchView from './view/RecentSearchView.js';
import AutocompleteView from './view/AutocompleteView.js';
import MainView from './view/MainView.js';
import ControlSearch from './control/controlSearch.js';
import { DELAYED_TIME, LIMITED_NUM  } from './helper/config.js';


const searchIcon = document.querySelector('.search__iconbox'),
      inputBox = document.querySelector('.input__box'),
      searchBar = inputBox.querySelector('.input__box--search-bar');


const searchModel = new SearchModel(LIMITED_NUM),
      recentSearchView = new RecentSearchView(),
      autocompleteView = new AutocompleteView(LIMITED_NUM),
      mainView = new MainView({ autocompleteView, recentSearchView, inputBox, searchBar }),
      controlSearch = new ControlSearch({ mainView, searchModel, searchIcon, DELAYED_TIME });


window.addEventListener('DOMContentLoaded', () => {
  controlSearch.eventHandler();
})


