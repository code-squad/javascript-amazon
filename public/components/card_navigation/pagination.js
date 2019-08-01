import { $, delegate } from '../../utils/allenibrary.js'
import Subscriber from '../../utils/subscriber.js'

export default class Pagination extends Subscriber {
  constructor({ stateManager, config: { paginationSelector, option } }) {
    super();
    this.startIdx = option.startIdx || 0;
    this.wrapper = $(paginationSelector);
    this.paginations = this.wrapper.children;
    this.subscribe('pagination', stateManager);
  }

  init() {
    this.addDatasetIdx(this.paginations);
    this.toggleActive(this.startIdx, this.paginations);
    this.delegateEvt(this.paginations.item((this.startIdx + 1) % this.paginations.length).className);
  }

  addDatasetIdx(paginations) {
    Array.from(paginations).forEach((el, i) => {
      el.dataset.idx = i;
    })
  }

  toggleActive(idx, paginations) {
    Array.from(paginations).forEach((el, i) => {
      if (el.classList.contains('active')) el.classList.remove('active');
      if (i === idx) el.classList.add('active');
    })
  }

  delegateEvt(className) {
    const funcMap = {
      [className]: (target) => this.handleClick(target)
    };
    delegate(this.wrapper, 'click', 'className', funcMap);
  }

  handleClick(target) {
    const targetIdx = Number(target.dataset.idx);
    this.publisher.setState({ targetIdx });;
  }

  render(state) {
    const { targetIdx } = state;
    this.toggleActive(targetIdx, this.paginations);
  }
}