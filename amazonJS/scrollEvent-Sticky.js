import { qs } from "./util.js";

class ScrollEvent_sticky {
  constructor(elObj) {
    Object.assign(this, { elObj })
    this.init();
  }
  
  init() {
    const hiddenLayer = qs(this.elObj.hiddenLayer);
    const stickyLayer = qs(this.elObj.stickyLayer);
    const closeBtn = qs(".close-button", hiddenLayer);
    const closeArrowBtn = qs(".close-button-foot", hiddenLayer);
    const openArrowBtn = qs(".top-layer-trigger-button", stickyLayer);
    
    this.makeIO(qs(this.elObj.header), hiddenLayer, stickyLayer);

    closeBtn.addEventListener("click", () => this.hideLayer());
    closeArrowBtn.addEventListener("click", () => this.hideLayer());
    openArrowBtn.addEventListener("click", () => this.showHiddenLayer());
  }

  makeIO(root, hiddenLayer, stickyLayer) {
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) {
        stickyLayer.classList.add("top-layer-active");
        hiddenLayer.classList.add("prime-member-container-scroll-active");
      } else {
        stickyLayer.classList.remove("top-layer-active");
        hiddenLayer.classList.remove("prime-member-container-scroll-active");
      }
    });
    return io.observe(root);
  }

  showHiddenLayer() {
    qs(this.elObj.hiddenLayer).classList.add("prime-member-container-active");
  }

  hideLayer() {
    qs(this.elObj.hiddenLayer).classList.remove("prime-member-container-active");
  }
}

export { ScrollEvent_sticky };
