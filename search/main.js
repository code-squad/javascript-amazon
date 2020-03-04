import { modelConfig, autoCompleteConfig,controllerConfig } from './config.js';
import { SearchModel } from './model.js';
import { SearchController } from './controller.js';
import { SearchAutoCompleteView } from './autoCompleteView.js';
// import { _$, _$e, _$c, __$ } from '../util.js';

// const inputView = new SearchInputView(viewOption.input);
// inputView, controllerOption 

export function initSearch() {
    const model = new SearchModel(modelConfig);
    const autoCompleteView = new SearchAutoCompleteView(autoCompleteConfig);
    const controller = new SearchController({ model, autoCompleteView,controllerConfig });
    controller.onAutoCompleteEvent();
}

initSearch() 