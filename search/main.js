import { SearchModel } from './model.js';
import { SearchController } from './controller.js';
import { SearchAutoCompleteView } from './autoCompleteView.js';
// import { SearchBarView } from './SearchBarView.js';

export function initSearch() {
    const model = new SearchModel();
    const autoCompleteView = new SearchAutoCompleteView();
    // const searchBarView = new SearchBarView(autoCompleteView);
    const searchController = new SearchController({ model, autoCompleteView });

    searchController.onAutoCompleteEvent();
}

initSearch() 