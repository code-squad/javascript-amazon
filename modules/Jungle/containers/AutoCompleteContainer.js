import { AutoInput, AutoMatchedList, AutoRecentList } from '../components/index.js';
import Store from '../store/index.js';

import { mergeConfig, qs } from '../../JinUtil/index.js';

export default class AutoCompleteContainer {
  constructor({ classNameObj, options }) {
    this.container = qs(classNameObj.container);

    this.store = this.getStore({});

    classNameObj.parentNode = '.auto-wrapper';
    this.autoInput = this.getView(classNameObj, 'autoInput');
    this.autoMatched = this.getView(classNameObj, 'autoMatchedList');
    this.autoRecent = this.getView(classNameObj, 'autoRecentList');
  }

  getStore({}) {
    return new Store({
      isWriting: false,
      query: '',
      recentQueries: ['hello', 'recent'],
      matchedQueries: []
    });
  }

  getView(classNameObj, type) {
    let returnObject;

    if (type === 'autoMatchedList') {
      returnObject = this.getAutoMathedList(classNameObj);
    }
    if (type === 'autoInput') {
      returnObject = this.getAutoInput(classNameObj);
    }
    if (type === 'autoRecentList') {
      returnObject = this.getAutoRecentList(classNameObj);
    }

    this.store.on(returnObject);
    returnObject.init();

    return returnObject;
  }

  getAutoInput(classNameObj) {
    return new AutoInput({
      container: classNameObj.container,
      onChange: this.autoInputChangeHandler.bind(this),
      onBlur: this.autoInputBlurHandler.bind(this),
      onFocus: this.autoInputFocusHandler.bind(this)
    });
  }

  getAutoMathedList(classNameObj) {
    return new AutoMatchedList({
      container: classNameObj.container,
      parentNode: classNameObj.parentNode
    });
  }

  getAutoRecentList(classNameObj) {
    return new AutoRecentList({
      container: classNameObj.container,
      parentNode: classNameObj.parentNode
    });
  }

  autoInputChangeHandler({ target }) {
    const { state } = this.store;
    const { value } = target;

    this.store.setState({
      ...state,
      isWriting: true,
      query: value
    });
  }

  autoInputBlurHandler() {
    const { state } = this.store;

    this.store.setState({
      ...state,
      isWriting: false
    });
  }

  autoInputFocusHandler() {
    const { state } = this.store;

    this.store.setState({
      ...state,
      isWriting: true
    });
  }
}
