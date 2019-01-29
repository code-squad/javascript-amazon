import { qs } from "./util.js";

class ScrollEvent_sticky {
  constructor(elObj) {
    this.header = qs(elObj.header);
    this.stickyLayer = qs(elObj.stickyLayer);
    this.hiddenLayer = qs(elObj.hiddenLayer);
    this.makeIO(this.header);
    this.init();
  }
  
  init() {
    const closeBtn = qs(".close-button");
    const closeArrowBtn = qs(".close-button-foot");
    const openArrowBtn = qs(".top-layer-trigger-button");

    closeBtn.addEventListener("click", this.hideLayer.bind(this));
    closeArrowBtn.addEventListener("click", this.hideLayer.bind(this));
    openArrowBtn.addEventListener("click", this.showHiddenLayer.bind(this));
  }

  makeIO(root) {
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) {
        this.stickyLayer.classList.add("top-layer-active");
        this.hiddenLayer.classList.add("prime-member-container-scroll-active");
      } else {
        this.stickyLayer.classList.remove("top-layer-active");
        this.hiddenLayer.classList.remove("prime-member-container-scroll-active");
      }
    });
    return io.observe(root);
  }

  showHiddenLayer() {
    this.hiddenLayer.classList.add("prime-member-container-active");
  }

  hideLayer() {
    this.hiddenLayer.classList.remove("prime-member-container-active");
  }
}

export { ScrollEvent_sticky };
