// import { asyncFetch } from '../../../PLib/index.js';

class Model {
  constructor() {
    // this.suggesionData = asyncFetch(srcUrl);
    this.recentQueryList = new Set();
  }

  getRecentQueryList() {
    return Array.from(this.recentQueryList);
  }

  addRecentQuery(query) {
    if (query.trim() === '') return;
    this.recentQueryList.add(query);
  }
}

export default Model;
