import { SearchModelOption } from '/config.js';
import { SearchModel } from './model.js';
import { SearchController } from './controller.js';
import { SearchAutoCompleteView } from './autoCompleteView.js';

export function SearchInit() {
    const model = new SearchModel(SearchModelOption);
    // const inputView = new SearchInputView(viewOption.input);
    const autoCompleteView = new SearchAutoCompleteView();
    //c찾아서 단어 수정
    const controller = new SearchController({ model, autoCompleteView });
    // inputView, autoCompleteView, controllerOption 
    controller.onAutoCompleteEvent();
}
SearchInit() 