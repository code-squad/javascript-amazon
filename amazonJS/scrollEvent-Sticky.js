import { qs } from "./util.js";

class ScrollEventSticky {
  constructor(elObj) {
    Object.assign(this, { elObj });
    this.init();
  }

  init() {
    this.makeIO();
    this.regBtnEvent()
  }

  regBtnEvent() {
    const closeBtn = qs(this.elObj.closeBtn, qs(this.elObj.hiddenLayer));
    const closeArrowBtn = qs(this.elObj.closeArrowBtn, qs(this.elObj.hiddenLayer));
    const openArrowBtn = qs(this.elObj.openArrowBtn, qs(this.elObj.stickyLayer));

    closeBtn.addEventListener("click", () => this.hideLayer());
    closeArrowBtn.addEventListener("click", () => this.hideLayer());
    openArrowBtn.addEventListener("click", () => this.showHiddenLayer());
  }

  makeIO() {
    const root = qs(this.elObj.header);
    const hiddenLayer = qs(this.elObj.hiddenLayer);
    const stickyLayer = qs(this.elObj.stickyLayer);
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) {
        stickyLayer.classList.add(this.elObj.topLayerActiveClass);
        hiddenLayer.classList.add(this.elObj.scrollActiveClass);
      } else {
        stickyLayer.classList.remove(this.elObj.topLayerActiveClass);
        hiddenLayer.classList.remove(this.elObj.scrollActiveClass);
      }
    });
    return io.observe(root);
  }

  showHiddenLayer() {
    qs(this.elObj.hiddenLayer).classList.add(this.elObj.btnActiveClass);
  }

  hideLayer() {
    qs(this.elObj.hiddenLayer).classList.remove(this.elObj.btnActiveClass);
  }
}

export { ScrollEventSticky };
