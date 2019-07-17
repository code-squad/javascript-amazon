import { makeHTMLString } from '../template/index.js';
import { qs, removeNodes, setCSS } from '../../JinUtil/index.js';

export default class AutoComplete {
  constructor({ container, parentNode }) {
    this.container = qs(container);
    this.parentNode = this.container.qs(parentNode);
    this.recentArea;
  }

  init() {
    this.setInitialUI();
    this.attatchEvent();
  }

  setInitialUI() {
    const recentAreaHTML = makeHTMLString({ type: 'autoRecentArea' });
    this.parentNode.insertAdjacentHTML('beforeend', recentAreaHTML);

    this.recentArea = this.parentNode.qs('.auto-area.recent');
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

    if (-1 < state.currentItem && state.currentItem < state.itemLength) {
      const targetItem = this.recentArea.children[state.currentItem];
      targetItem.classList.add('selected');
    }

    setCSS(this.recentArea, 'display', 'block');
  }
}
