import { makeHTMLString } from '../template/index.js';
import { qs } from '../../JinUtil/index.js';

export default class AutoCompleteFrame {
  constructor({ container }) {
    this.container = qs(container);
    this.matchedList;
  }

  init() {
    this.setInitialUI();
    this.attatchEvent();
  }

  setInitialUI() {
    const matchedList = makeHTMLString({ type: 'autoMatchedArea' });
    this.container.insertAdjacentHTML('afterbegin', matchedList);

    this.matchedList = this.container.qs('.auto-area.matched');
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
