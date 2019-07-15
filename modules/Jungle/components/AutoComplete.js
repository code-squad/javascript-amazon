import { makeHTMLString } from '../template/index.js';
import { qs } from '../../JinUtil/index.js';

export default class AutoComplete {
  constructor({ container }) {
    this.container = qs(container);
  }

  init() {
    this.setInitialUI();
  }

  setInitialUI() {
    const autoComplete = makeHTMLString({ type: 'autoComplete' });
    this.container.insertAdjacentHTML('afterbegin', autoComplete);
  }
}
