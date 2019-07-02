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
    this.subscribe(publisher)
  }

  mergeOption(option) {
    const default_option = {
      disabledBtnClass: 'arrow-disable',
      prevBtn: ".btn_prev",
      nextBtn: ".btn_next",
      easing: "ease-in-out",
      duration: "500",
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
    this.attachBtnEvent();
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
    // direction = direction === "prev" ? -1 : 1;
    // if (this.isTransiting) return;

    // currentIdx += direction;

    // this.offset -= this.itemWidth * direction;
    // this.animateMove(true);
    // if (this.option.infinite) {
    //   if (this.isCloneItem()) {
    //     this.offset += this.itemWidth * this.maxIdx * direction;
    //     setTimeout(() => this.animateMove(false), this.option.duration);
    //     currentIdx -= this.maxIdx * direction;
    //   }
    // } else {
    //   this.checkMovable(idx);
    // }
    // this.toggleStepClass();
  }

  async move({ targetIdx }) {
    this.setTransform(targetIdx);
    if (this.isCloneItem(targetIdx) && this.option.infinite) {
      await this.sleep(200);
      this.toggleAnimate('off');
      this.setTransform(targetIdx - this.maxIdx);
      await this.sleep(200);
      this.toggleAnimate('on');
    }
    if (!this.option.infinite) this.checkMovable(targetIdx);
  }

  isCloneItem(idx) {
    return idx === -1 || idx === this.maxIdx;
  }

  setInitialOffset() {
    this.camera.style.cssText = `position:relative; left:-100%`;
  }

  setTransform(idx) {
    idx = idx < -1 ? this.maxIdx - 1 : idx;
    this.camera.style.cssText = `transform:translateX(${-100 * idx}%); transition:transform ${this.option.duration}ms ${this.option.easing}`;
  }

  toggleAnimate(onoff) {
    const action = onoff === 'on' ? 'remove' : 'add';
    this.camera.classList[action]('no-animation');
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // animateMove(animate) {
  //   this.isTransiting = animate;
  //   this.camera.style.transform = `translate3D(${this.offset}px, 0, 0)`;
  //   this.camera.style.transition = (animate) ? `transform ${this.option.duration}ms ${this.option.easing}` : 'none';
  // }

  checkMovable(idx) {
    if (idx == 0)
      this.prevBtn.classList.add(this.option.disabledBtnClass);
    else if (idx == this.maxIdx - 1)
      this.nextBtn.classList.add(this.option.disabledBtnClass);
    else {
      this.prevBtn.classList.remove(this.option.disabledBtnClass);
      this.nextBtn.classList.remove(this.option.disabledBtnClass);
    }
  }

  render(state) {
    const { targetIdx } = state;
    this.move({ targetIdx });
  }
}