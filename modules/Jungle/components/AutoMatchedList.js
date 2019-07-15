import { makeHTMLString } from '../template/index.js';
import { qs } from '../../JinUtil/index.js';

export default class AutoMatchedList {
  constructor({ container, parentNode }) {
    this.container = qs(container);
    this.parentNode = this.container.qs(parentNode);
    this.matchedList;
  }

  init() {
    this.setInitialUI();
    this.attatchEvent();
  }

  setInitialUI() {
    const matchedList = makeHTMLString({ type: 'autoMatchedArea' });
    this.parentNode.insertAdjacentHTML('beforeend', matchedList);

    this.matchedList = this.parentNode.qs('.auto-area.matched');
  }

  attatchEvent() {}

  render(state) {
    if (!state.isWriting || !state.query) {
      this.matchedList.style.display = 'none';
      return;
    }

    this.matchedList.style.display = 'block';
  }
}
