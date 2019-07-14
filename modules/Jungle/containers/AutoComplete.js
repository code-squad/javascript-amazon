import Store from '../store/index.js';

export default class AutoComplete {
  constructor({}) {
    this.store = this.getStore();
  }

  getStore({}) {
    return new Store({
      isWriting: false,
      query: '',
      recentQuery: [],
      matchedQuery: []
    });
  }
}
