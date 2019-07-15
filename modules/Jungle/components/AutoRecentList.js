import { makeHTMLString } from '../template/index.js';
import { qs, removeNodes, setCSS } from '../../JinUtil/index.js';

export default class AutoComplete {
  constructor({ container, parentNode }) {
    this.container = qs(container);
    this.parentNode = parentNode;
    this.recentArea;
  }

  init() {
    this.setInitialUI();
    this.attatchEvent();
  }

  setInitialUI() {
    const recentAreaHTML = makeHTMLString({ type: 'autoRecentArea' });
    const parent = qs(this.parentNode);

    parent.insertAdjacentHTML('beforeend', recentAreaHTML);
    this.recentArea = parent.qs('.auto-area.recent');
  }

  attatchEvent() {}

  render(state) {
    if (!state.isWriting || !!state.query) {
      setCSS(this.recentArea, 'display', 'none');
      return;
    }

    removeNodes([...this.recentArea.children]);

    const autoListHTML = makeHTMLString({ type: 'autoList', data: state.recentQueries });
    this.recentArea.insertAdjacentHTML('beforeend', autoListHTML);
    setCSS(this.recentArea, 'display', 'block');
  }
}
