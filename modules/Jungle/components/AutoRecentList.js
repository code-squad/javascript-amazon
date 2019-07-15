import { makeHTMLString } from '../template/index.js';
import { qs } from '../../JinUtil/index.js';

export default class AutoComplete {
  constructor({ container, parentNode }) {
    this.container = qs(container);
    this.parentNode = parentNode;
    this.recentList;
  }

  init() {
    this.setInitialUI();
    this.attatchEvent();
  }

  setInitialUI() {
    const autoRecentList = makeHTMLString({ type: 'autoRecentList' });
    const parent = qs(this.parentNode);

    parent.insertAdjacentHTML('beforeend', autoRecentList);
    this.recentList = parent.qs('.auto-area.recent');
  }

  attatchEvent() {}

  render(state) {
    if (state.isWriting && !state.query) {
      this.recentList.style.display = 'block';
    } else {
      this.recentList.style.display = 'none';
    }
  }
}
