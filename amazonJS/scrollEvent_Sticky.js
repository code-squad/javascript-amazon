class ScrollEvent_sticky {
  constructor(dropBenchMark, stickyLayer, hiddenLayer) {
    this.stickyLayer = stickyLayer;
    this.hiddenLayer = hiddenLayer;
    this.makeIO(dropBenchMark);
    this.init();
  }
  
  init() {
    const closeBtn = document.querySelector(".close-button");
    const closeArrowBtn = document.querySelector(".close-button-foot");
    const openArrowBtn = document.querySelector(".top-layer-trigger-button");

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
