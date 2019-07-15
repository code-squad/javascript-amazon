import { makeHTMLString } from '../template/index.js';
import { qs } from '../../JinUtil/index.js';

export default class AutoCompleteInput {
  constructor({ container, parentNode, onChange, onBlur }) {
    this.container = qs(container);
    this.parentNode = parentNode;
    this.onChange = onChange;
    this.onBlur = onBlur;
  }

  init() {
    this.setInitialUI();
    this.attatchEvent();
  }

  setInitialUI() {
    const autoInput = makeHTMLString({ type: 'autoInput' });
    qs(this.parentNode).insertAdjacentHTML('afterbegin', autoInput);

    this.searchInput = this.container.qs('#auto-search');
  }

  attatchEvent() {
    this.searchInput.addEventListener('keyup', e => this.onChange(e));
    this.searchInput.addEventListener('blur', _ => this.onBlur());
  }

  render(state) {
    this.searchInput.value = state.query;
  }
}
