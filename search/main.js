import { modelConfig, autoCompleteConfig } from './config.js';
import { SearchModel } from './model.js';
import { SearchController } from './controller.js';
import { SearchAutoCompleteView } from './autoCompleteView.js';
// const inputView = new SearchInputView(viewOption.input);
// inputView, controllerOption 

export function initSearch() {
    const model = new SearchModel(modelConfig);
    const autoCompleteView = new SearchAutoCompleteView(autoCompleteConfig);
    const controller = new SearchController({ model, autoCompleteView });
    controller.onAutoCompleteEvent();
}

initSearch() 