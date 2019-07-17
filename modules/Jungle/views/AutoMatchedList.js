import { makeHTMLString } from '../template/index.js';
import { qs, removeNodes, setCSS } from '../../JinUtil/index.js';

export default class AutoMatchedList {
  constructor({ container, parentNode }) {
    this.container = qs(container);
    this.parentNode = this.container.qs(parentNode);
    this.matchedArea;
  }

  init() {
    this.setInitialUI();
    this.attatchEvent();
  }

  setInitialUI() {
    const matchedList = makeHTMLString({ type: 'autoMatchedArea' });
    this.parentNode.insertAdjacentHTML('beforeend', matchedList);

    this.matchedArea = this.parentNode.qs('.auto-area.matched');
  }

  attatchEvent() {}

  render(state) {
    if (!state.isWriting || !state.query) {
      setCSS(this.matchedArea, 'display', 'none');
      return;
    }

    removeNodes([...this.matchedArea.children]);

    const autoListHTML = makeHTMLString({
      type: 'autoList',
      data: state.matchedQueries,
      prefix: state.query
    });

    this.matchedArea.insertAdjacentHTML('beforeend', autoListHTML);

    if (-1 < state.currentItem && state.currentItem < state.itemLength) {
      const targetItem = this.matchedArea.children[state.currentItem];
      targetItem.classList.add('selected');
    }

    setCSS(this.matchedArea, 'display', 'block');
  }
}
