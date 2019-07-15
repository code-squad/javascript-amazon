import { makeHTMLString } from '../template/index.js';
import { qs } from '../../JinUtil/index.js';

export default class AutoComplete {
  constructor({ container, onChange, onBlur }) {
    this.container = qs(container);
    this.autoFrame;

    this.onChange = onChange;
    this.onBlur = onBlur;
  }

  init() {
    this.setInitialUI();
    this.attatchEvent();
  }

  setInitialUI() {
    const autoComplete = makeHTMLString({ type: 'autoComplete' });
    this.container.insertAdjacentHTML('afterbegin', autoComplete);

    this.searchInput = this.container.qs('#auto-search');
    this.autoFrame = this.container.qs('.auto-frame');
  }

  attatchEvent() {
    this.searchInput.addEventListener('keyup', e => this.onChange(e));
    this.searchInput.addEventListener('blur', _ => this.onBlur());
  }

  render(state) {
    if (!state.isWriting) {
      this.autoFrame.style.display = 'none';
      return;
    }

    this.autoFrame.style.display = 'block';
    this.searchInput.value = state.query;
  }
}
