import { makeHTMLString } from '../template/index.js';
import { qs } from '../../JinUtil/index.js';

export default class AutoCompleteFrame {
  constructor({ container }) {
    this.container = qs(container);
    this.autoFrame;
  }

  init() {
    this.setInitialUI();
    this.attatchEvent();
  }

  setInitialUI() {
    const autoComplete = makeHTMLString({ type: 'autoFrame' });
    this.container.insertAdjacentHTML('afterbegin', autoComplete);

    this.autoFrame = this.container.qs('.auto-area.matched');
  }

  attatchEvent() {}

  render(state) {
    if (!state.isWriting) {
      this.autoFrame.style.display = 'none';
      return;
    }

    this.autoFrame.style.display = 'block';
  }
}
