import { AutoCompleteFrame, AutoCompleteInput, AutoCompleteRecent } from '../components/index.js';
import Store from '../store/index.js';

import { mergeConfig, qs } from '../../JinUtil/index.js';

export default class AutoCompleteContainer {
  constructor({ classNameObj, options }) {
    this.container = qs(classNameObj.container);

    this.store = this.getStore({});
    this.autoFrame = this.getView(classNameObj, 'autoFrame');
    this.autoInput = this.getView(classNameObj, 'autoInput');
    this.autoRecent = this.getView(classNameObj, 'autoRecent');
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

    if (type === 'autoFrame') {
      returnObject = this.getAutoFrame(classNameObj);
    }
    if (type === 'autoRecent') {
      returnObject = this.getAutoRecent(classNameObj);
    }
    if (type === 'autoInput') {
      returnObject = this.getAutoInput(classNameObj);
    }

    this.store.on(returnObject);
    returnObject.init();

    return returnObject;
  }

  getAutoFrame(classNameObj) {
    return new AutoCompleteFrame({
      container: classNameObj.container
    });
  }

  getAutoInput(classNameObj) {
    return new AutoCompleteInput({
      container: classNameObj.container,
      onChange: this.autoCmpChangeHandler.bind(this),
      onBlur: this.autoCmpBlurHandler.bind(this)
    });
  }

  getAutoRecent(classNameObj) {
    return new AutoCompleteRecent({
      container: classNameObj.container
    });
  }

  autoCmpChangeHandler({ target }) {
    const { state } = this.store;
    const { value } = target;
    if (!value) return;

    this.store.setState({
      ...state,
      isWriting: true,
      query: value
    });
  }

  autoCmpBlurHandler() {
    const { state } = this.store;

    this.store.setState({
      ...state,
      isWriting: false
    });
  }
}
