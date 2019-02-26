import helper from './helper';
export default class PlansLayer {
  constructor() {
    this.io = new IntersectionObserver(this.handleIntersect.bind(this));
  }
  init() {
    const primeBtn = helper.qs('.main__btn');
    this.io.observe(primeBtn);
  }
  handleIntersect(entries, observer) {
    const plans = helper.qs('.plans');
    entries.forEach(entry => this.togglePlansClass(entry, plans))
  }
  togglePlansClass(entry, plans) {
    if (entry.isIntersecting) {
      helper.removeClass(plans, 'plans--scroll');
    } else {
      helper.addClass(plans, 'plans--scroll');
    }
  }
}
