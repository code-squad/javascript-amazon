import { makeHTMLString } from '../template/index.js';
import { qs } from '../../JinUtil/index.js';

export default class AutoComplete {
  constructor({ container, parentNode }) {
    this.container = qs(container);
    this.parentNode = parentNode;
  }

  init() {
    this.setInitialUI();
    this.attatchEvent();
  }

  setInitialUI() {
    const autoRecent = makeHTMLString({ type: 'autoRecent' });
    qs(this.parentNode).insertAdjacentHTML('beforeend', autoRecent);
  }

  attatchEvent() {}

  render(state) {}
}
