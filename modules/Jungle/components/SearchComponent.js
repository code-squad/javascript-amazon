import { SearchInput, AutoMatchedList, AutoRecentList } from '../views/index.js';
import Store from '../store/index.js';

import { mergeConfig, qs } from '../../JinUtil/index.js';

export default class SearchComponent {
  constructor({ classNameObj, options }) {
    this.container = qs(classNameObj.container);

    this.store = this.getStore({});

    classNameObj.parentNode = '.auto-wrapper';
    this.input = this.getView(classNameObj, 'searchInput');
    this.autoMatched = this.getView(classNameObj, 'autoMatchedList');
    this.autoRecent = this.getView(classNameObj, 'autoRecentList');
  }

  getStore({}) {
    return new Store({
      isWriting: false,
      query: '',
      recentQueries: ['hello', 'recent'],
      matchedQueries: {
        i: ['iphone', 'icon', 'infinite', 'input', 'instagram'],
        ip: ['ipad', 'ipconfig', 'iphone', 'iptime', 'ip'],
        iph: ['iphone', 'iphone11', 'iphone xs', 'iphone wallpaper', 'iphone mockup'],
        ipho: ['iphone', 'iphone11', 'iphone xs', 'iphone wallpaper', 'iphone se', 'iphone se2'],
        iphon: ['iphone', 'iphone11', 'iphone xs', 'iphone wallpaper', 'iphone se2', 'iphone xr'],
        iphone: ['iphone', 'iphone11', 'iphone xs', 'iphone xr', 'iphone mockup', 'iphone x']
      }
    });
  }

  getView(classNameObj, type) {
    let returnObject;

    if (type === 'autoMatchedList') {
      returnObject = this.getAutoMathedList(classNameObj);
    }
    if (type === 'searchInput') {
      returnObject = this.getSearchInput(classNameObj);
    }
    if (type === 'autoRecentList') {
      returnObject = this.getAutoRecentList(classNameObj);
    }

    this.store.on(returnObject);
    returnObject.init();

    return returnObject;
  }

  getSearchInput(classNameObj) {
    return new SearchInput({
      container: classNameObj.container,
      onChange: this.inputChangeHandler.bind(this),
      onBlur: this.inputBlurHandler.bind(this),
      onFocus: this.inputFocusHandler.bind(this),
      onClick: this.inputButtonClickHandler.bind(this)
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

  inputChangeHandler(e, input) {
    if (e.keyCode == 38 || e.keyCode == 40) {
      // moveCursorToEnd(input);
      return;
    }
    // function moveCursorToEnd(el) {
    //   if (typeof el.selectionStart == 'number') {
    //     el.selectionStart = el.selectionEnd = el.value.length;
    //   } else if (typeof el.createTextRange != 'undefined') {
    //     el.focus();
    //     var range = el.createTextRange();
    //     range.collapse(false);
    //     range.select();
    //   }
    // }
    const { state } = this.store;
    const { value } = e.target;

    this.store.setState({
      ...state,
      isWriting: true,
      query: value
    });
  }

  inputBlurHandler() {
    const { state } = this.store;

    this.store.setState({
      ...state,
      isWriting: false
    });
  }

  inputFocusHandler() {
    const { state } = this.store;

    this.store.setState({
      ...state,
      isWriting: true
    });
  }

  inputButtonClickHandler(e, value) {
    if (!value) return;

    const { state } = this.store;
    const { recentQueries } = state;
    const newQueries = this.getNewRecentQuries(recentQueries, value);

    this.store.setState({
      ...state,
      isWriting: false,
      recentQueries: newQueries
    });
  }

  getNewRecentQuries(list, value) {
    if (list.includes(value)) {
      return list;
    }

    if (list.length === 5) {
      return [...list.splice(1, 4), value];
    }

    return list.concat(value);
  }
}
