import { $, delegate } from '../../utils/allenibrary.js'
import Subscriber from '../../utils/subscriber.js'

export default class Pagination extends Subscriber {
  constructor(publisher, paginationSelector, startIdx) {
    super();
    this.startIdx = startIdx;
    this.wrapper = $(paginationSelector);
    this.paginations = this.wrapper.children;
    this.init();
    this.subscribe('pagination', publisher);
  }

  init() {
    this.addIdx(this.paginations);
    this.toggleActive(this.startIdx, this.paginations);
    this.delegateEvt(this.paginations.item((this.startIdx + 1) % this.paginations.length).className);
  }

  addIdx(paginations) {
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