import { $, delegate } from '../../utils/allenibrary.js'
import Subscriber from '../../utils/subscriber.js'
import { WIDTH_IN_PERCENT } from './constants.js'

export default class Carousel extends Subscriber {
  constructor({ stateManager, config }) {
    super();
    this.btnWrapper = $(config.btnWrapperSelector);
    this.viewport = $(config.carouselSelector);
    this.prevBtnCssClass = config.prevBtnCssClass;
    this.nextBtnCssClass = config.nextBtnCssClass;
    this.option = this.mergeOption(config.option);
    this.subscribe('carousel', stateManager);
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
    this.cacheElements();
    if (this.option.infinite) {
      this.addClone();
      this.toggleAnimate('off');
      this.setInitialOffset();
      setTimeout(() => this.toggleAnimate('on'), 0);
    }
    else {
      this.getBtns(this.prevBtnCssClass, this.nextBtnCssClass);
      this.checkMovable(this.option.startIdx);
    }
    this.addCarouselClass();
    this.setNoAnimateTransform(this.option.startIdx)
    this.delegateBtnEvt(this.prevBtnCssClass, this.nextBtnCssClass);
  }

  cacheElements() {
    this.camera = this.viewport.firstElementChild;
    this.panels = this.camera.children;
    this.maxIdx = this.panels.length;
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

  delegateBtnEvt(prevBtnClass, nextBtnClass) {
    const funcMap = {
      [prevBtnClass]: () => this.handleBtnClick('prev'),
      [nextBtnClass]: () => this.handleBtnClick('next')
    }
    delegate(this.btnWrapper, 'click', 'classList', funcMap);
  }

  handleBtnClick(direction) {
    this.publisher.setState({ direction });
  }

  move({ targetIdx }) {
    this.setTransform(targetIdx);
    if (this.isCloneItem(targetIdx) && this.option.infinite) {
      setTimeout(() => {
        this.setNoAnimateTransform(targetIdx - this.maxIdx)
      }, this.option.duration)

    }
    if (!this.option.infinite) this.checkMovable(targetIdx);
  }

  isCloneItem(idx) {
    return idx === -1 || idx === this.maxIdx;
  }

  setTransform(idx) {
    idx = idx < -1 ? this.maxIdx - 1 : idx;
    this.camera.style.cssText = `transform: translateX(${-WIDTH_IN_PERCENT * idx}%); transition: transform ${this.option.duration}ms`
  }

  setNoAnimateTransform(idx) {
    idx = idx < -1 ? this.maxIdx - 1 : idx;
    this.camera.style.cssText = `transform: translateX(${-WIDTH_IN_PERCENT * idx}%); transition: none`
  }

  render(state) {
    const { targetIdx } = state;
    this.move({ targetIdx });
  }
}