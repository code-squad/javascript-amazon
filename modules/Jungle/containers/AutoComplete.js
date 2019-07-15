import { AutoComplete } from '../components/index.js';
import Store from '../store/index.js';

import { mergeConfig, qs } from '../../JinUtil/index.js';

export default class AutoCompleteContainer {
  constructor({ classNameObj, options }) {
    this.container = qs(classNameObj.container);

    this.store = this.getStore({});
    this.autoComplete = this.getView(classNameObj, 'autoComplete');
  }

  getStore({}) {
    return new Store({
      isWriting: false,
      query: '',
      recentQuery: [],
      matchedQuery: []
    });
  }

  getView(classNameObj, type) {
    let returnObject;

    if (type === 'autoComplete') {
      returnObject = this.getAutoComplete(classNameObj);
    }

    this.store.on(returnObject);
    returnObject.init();

    return returnObject;
  }

  getAutoComplete(classNameObj) {
    return new AutoComplete(classNameObj);
  }
}
