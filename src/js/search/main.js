import ControlSearch from './control/controlSearch.js';
import SearchBarView from './view/SearchBarView.js';
import SearchModel from './model/searchModel.js';
import AutocompleteView from './view/AutocompleteView.js';


const searchBarView = new SearchBarView(),
      searchModel = new SearchModel(),
      autocompleteView = new AutocompleteView(),
      instances = {searchBarView, searchModel, autocompleteView},
      controlSearch = new ControlSearch(instances, 6);

controlSearch.eventHandler();


