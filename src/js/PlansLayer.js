import helper from './helper';
export default class PlansLayer {
  constructor() {
    this.observeEl = helper.qs('.main__btn');
    this.io = new IntersectionObserver(this.handleIntersect.bind(this));
  }
  init() {
    this.io.observe(this.observeEl);
    this.setClickEvent();
  }
  handleIntersect(entries, observer) {
    const plans = helper.qs('.plans');
    entries.forEach(entry => this.togglePlansNav(entry, plans))
  }
  togglePlansNav(entry, plans) {
    if (entry.isIntersecting) {
      helper.removeClass(plans, 'plans--scroll');
    } else {
      helper.addClass(plans, 'plans--scroll');
    }
  }
  setClickEvent() {
    const plans = helper.qs('.plans');
    plans.addEventListener("click", this.callClickEvent.bind(this));
  }
  callClickEvent(evt) {
    const target = evt.target;
    if (target.closest('.plans-header__btn')) {
      this.showPlans();
    } else if (target.closest('.plans-content__btn--close') || target.closest('.plans-content__btn--close-icon')) {
      this.closePlans();
    } else return;
  }
  showPlans() {
    const plans = helper.qs('.plans');
    this.io.unobserve(this.observeEl);
    helper.removeClass(plans, 'plans--scroll');
    helper.addClass(plans, 'plans--open');
  }
  closePlans() {
    const plans = helper.qs('.plans');
    helper.removeClass(plans, 'plans--open');
    this.io.observe(this.observeEl);
  }
}
