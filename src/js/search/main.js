import ControlSearch from './control/controlSearch.js';
import SearchBarView from './view/SearchBarView.js';
import SearchModel from './model/searchModel.js';


const searchBarView = new SearchBarView(),
      searchModel = new SearchModel(),
      instances = {searchBarView, searchModel},
      controlSearch = new ControlSearch(instances);

controlSearch.storeCurrentInput();


