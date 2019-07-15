import { makeHTMLString } from '../template/index.js';
import { qs } from '../../JinUtil/index.js';

export default class AutoCompleteInput {
  constructor({ container, onChange, onBlur, onFocus }) {
    this.container = qs(container);
    this.onChange = onChange;
    this.onBlur = onBlur;
    this.onFocus = onFocus;
  }

  init() {
    this.setInitialUI();
    this.attatchEvent();
  }

  setInitialUI() {
    const autoInput = makeHTMLString({ type: 'autoInput' });
    this.container.insertAdjacentHTML('afterbegin', autoInput);
    this.searchInput = this.container.qs('#auto-search');
  }

  attatchEvent() {
    this.searchInput.addEventListener('keyup', e => this.onChange(e));
    this.searchInput.addEventListener('blur', _ => this.onBlur());
    this.searchInput.addEventListener('focus', _ => this.onFocus());
  }

  render(state) {
    this.searchInput.value = state.query;
  }
}
