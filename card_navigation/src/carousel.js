import { $, delegate } from '../../utils/allenibrary.js'
import Subscriber from '../../utils/subscriber.js'

export default class Carousel extends Subscriber {
  constructor(publisher, viewportSelector, option) {
    super();
    this.viewport = $(viewportSelector);
    this.camera = this.viewport.firstElementChild;
    this.panels = this.camera.children;
    this.maxIdx = this.panels.length;
    this.option = this.mergeOption(option);
    this.btnWrapper = $(this.option.btnWrapper);
    this.init();
    this.subscribe('carousel', publisher);
  }

  mergeOption(option) {
    const default_option = {
      duration: "200",
      infinite: false,
      startIdx: 0
    };
    return { ...default_option, ...option };
  }

  init() {
    if (this.option.infinite) {
      this.addClone();
      this.toggleAnimate('off');
      this.setInitialOffset();
      setTimeout(() => this.toggleAnimate('on'), 0);
    }
    else {
      this.getBtns(this.option.prevBtn, this.option.nextBtn);
      this.checkMovable(this.option.startIdx);
    }
    this.addCarouselClass();
    this.setNoAnimateTransform(this.option.startIdx)
    this.delegateBtnEvt(this.option.prevBtn, this.option.nextBtn);
  }

  addClone() {
    const firstItem = this.panels[0];
    const lastItem = this.panels[this.maxIdx - 1];
    this.camera.insertBefore(lastItem.cloneNode(true), this.camera.firstChild);
    this.camera.appendChild(firstItem.cloneNode(true));
  }

  setInitialOffset() {
    this.camera.classList.add('infinite-camera');
  }

  toggleAnimate(onoff) {
    const action = onoff === 'on' ? 'remove' : 'add';
    this.camera.classList[action]('no-animation');
  }

  getBtns(prevBtn, nextBtn) {
    Array.from(this.btnWrapper.children).forEach(el => {
      if (el.classList.contains(prevBtn)) this.prevBtn = el;
      if (el.classList.contains(nextBtn)) this.nextBtn = el;
    })
  }

  checkMovable(idx) {
    if (idx == 0)
      this.prevBtn.classList.add('arrow-disable');
    else if (idx == this.maxIdx - 1)
      this.nextBtn.classList.add('arrow-disable');
    else {
      this.prevBtn.classList.remove('arrow-disable');
      this.nextBtn.classList.remove('arrow-disable');
    }
  }

  addCarouselClass() {
    this.viewport.classList.add("viewport");
    this.camera.classList.add("camera");
    Array.from(this.panels).forEach(el => el.classList.add('panel'));
  }

  delegateBtnEvt(prevBtn, nextBtn) {
    const funcMap = {
      [prevBtn]: () => this.handleBtnClick('prev'),
      [nextBtn]: () => this.handleBtnClick('next')
    }
    delegate(this.btnWrapper, 'click', 'classList', funcMap);
  }

  handleBtnClick(direction) {
    this.publisher.setState({ direction });
  }

  async move({ targetIdx }) {
    this.setTransform(targetIdx);
    if (this.isCloneItem(targetIdx) && this.option.infinite) {
      // await this.sleep(this.option.duration - 50);
      // this.setNoAnimateTransform(targetIdx - this.maxIdx);
      setTimeout(() => {
        this.setNoAnimateTransform(targetIdx - this.maxIdx)
      }, this.option.duration - 50)

    }
    if (!this.option.infinite) this.checkMovable(targetIdx);
  }

  isCloneItem(idx) {
    return idx === -1 || idx === this.maxIdx;
  }

  setTransform(idx) {
    idx = idx < -1 ? this.maxIdx - 1 : idx;
    this.camera.style.cssText = `transform: translateX(${-100 * idx}%); transition: transform ${this.option.duration}ms`
  }

  setNoAnimateTransform(idx) {
    idx = idx < -1 ? this.maxIdx - 1 : idx;
    this.camera.style.cssText = `transform: translateX(${-100 * idx}%); transition: none`
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  render(state) {
    const { targetIdx } = state;
    this.move({ targetIdx });
  }
}