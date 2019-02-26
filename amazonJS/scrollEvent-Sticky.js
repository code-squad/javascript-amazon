import { qs } from "./util.js";

class ScrollEvent_sticky {
  constructor(elObj) {
    Object.assign(this, { elObj });
    this.init();
  }

  init() {
    const hiddenLayer = qs(this.elObj.hiddenLayer);
    const stickyLayer = qs(this.elObj.stickyLayer);

    this.makeIO(qs(this.elObj.header), hiddenLayer, stickyLayer);
    this.regBtnEvent(closeBtn, closeArrowBtn, openArrowBtn)
  }

  regBtnEvent() {
    const closeBtn = qs(this.elObj.closeBtn, hiddenLayer);
    const closeArrowBtn = qs(this.elObj.closeArrowBtn, hiddenLayer);
    const openArrowBtn = qs(this.elObj.openArrowBtn, stickyLayer);
    
    closeBtn.addEventListener("click", () => this.hideLayer());
    closeArrowBtn.addEventListener("click", () => this.hideLayer());
    openArrowBtn.addEventListener("click", () => this.showHiddenLayer());
  }

  makeIO(root, hiddenLayer, stickyLayer) {
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

export { ScrollEvent_sticky };
