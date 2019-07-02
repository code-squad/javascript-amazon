import $ from './allenibrary.js'
import Subscriber from './subscriber.js'

export default class Pagination extends Subscriber {
  constructor(publisher, paginationSelector) {
    super();
    this.paginations = $(paginationSelector).children;
    this.init();
    this.subscribe('pagination', publisher);
  }

  init() {
    this.addPaginationEvent(this.paginations);
    this.toggleActive(0, this.paginations);
  }

  eventHandler(evt) {
    const targetIdx = Number(evt.target.dataset.idx);
    this.publisher.setState({ targetIdx });;
  }

  addPaginationEvent(paginations) {
    Array.from(paginations).forEach((el, i) => {
      el.dataset.idx = i;
      el.addEventListener("click", this.eventHandler.bind(this));
    })
  }

  toggleActive(idx, paginations) {
    Array.from(paginations).forEach((el, i) => {
      if (el.classList.contains('active')) el.classList.remove('active');
      if (i === idx) el.classList.add('active');
    })
  }

  render(state) {
    const { targetIdx } = state;
    this.toggleActive(targetIdx, this.paginations);
  }
}