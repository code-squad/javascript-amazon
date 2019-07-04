import $ from './allenibrary.js'
import Subscriber from './subscriber.js'

export default class Carousel extends Subscriber {
  constructor(publisher, viewportSelector, option) {
    super();
    this.viewport = $(viewportSelector);
    this.camera = this.viewport.firstElementChild;
    this.panels = this.camera.children;
    this.maxIdx = this.panels.length;
    this.option = this.mergeOption(option);
    this.prevBtn = $(this.option.prevBtn);
    this.nextBtn = $(this.option.nextBtn);
    this.init();
    this.subscribe('carousel', publisher)
  }

  mergeOption(option) {
    const default_option = {
      prevBtn: ".btn_prev",
      nextBtn: ".btn_next",
      // easing: "ease-in-out",
      // duration: "500",
      infinite: false
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
    else this.checkMovable(0);
    this.addCarouselClass();
    this.attachBtnEvent();
  }

  addCarouselClass() {
    this.viewport.classList.add("viewport");
    this.camera.classList.add("camera");
    Array.from(this.panels).forEach(el => el.classList.add('panel'));
  }

  addClone() {
    let firstItem = this.panels[0];
    let lastItem = this.panels[this.maxIdx - 1];
    this.camera.insertBefore(lastItem.cloneNode(true), this.camera.firstChild);
    this.camera.appendChild(firstItem.cloneNode(true));
  }

  attachBtnEvent() {
    this.prevBtn.addEventListener("click", () => this.eventHandler("prev"));
    this.nextBtn.addEventListener("click", () => this.eventHandler("next"));
  }

  eventHandler(direction) {
    this.publisher.setState({ direction })
  }

  async move({ targetIdx }) {
    this.setTransform(targetIdx);
    if (this.isCloneItem(targetIdx) && this.option.infinite) {
      //TODO: duration을 옵션으로 받으면서 sleep의 매직넘버없애기
      await this.sleep(250);
      this.toggleAnimate('off');
      this.setTransform(targetIdx - this.maxIdx);
      await this.sleep(250);
      this.toggleAnimate('on');
    }
    if (!this.option.infinite) this.checkMovable(targetIdx);
  }

  isCloneItem(idx) {
    return idx === -1 || idx === this.maxIdx;
  }

  setInitialOffset() {
    this.camera.classList.add('infinite-camera');
  }

  setTransform(idx) {
    idx = idx < -1 ? this.maxIdx - 1 : idx;
    this.camera.style.transform = `translateX(${-100 * idx}%`;
  }

  toggleAnimate(onoff) {
    const action = onoff === 'on' ? 'remove' : 'add';
    this.camera.classList[action]('no-animation');
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

  render(state) {
    const { targetIdx } = state;
    this.move({ targetIdx });
  }
}