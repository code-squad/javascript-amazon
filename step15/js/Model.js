import { asyncFetch } from '../../PLib/index.js';
import { model as config } from './config.js';

class Model {
  constructor() {
    this.suggesionData = asyncFetch(config.srcUrl);
    this.recentQueryList = new Set();
  }

  addRecentQuery(query) {
    if (query.trim() === '') return;
    this.recentQueryList.add(query);
  }
}

export default Model;
