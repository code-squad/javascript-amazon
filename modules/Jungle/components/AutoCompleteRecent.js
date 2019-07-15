import { makeHTMLString } from '../template/index.js';
import { qs } from '../../JinUtil/index.js';

export default class AutoComplete {
  constructor({ container }) {
    this.container = qs(container);
  }

  init() {
    this.setInitialUI();
    this.attatchEvent();
  }

  setInitialUI() {}

  attatchEvent() {}

  render(state) {}
}
