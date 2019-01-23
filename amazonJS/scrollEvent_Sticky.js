class ScrollEvent_sticky {
  constructor(dropBenchMark, topLayer, primeMember) {
    this.dropBenchMark = dropBenchMark;
    this.topLayer = topLayer;
    this.primeMember = primeMember;
    this.init();
  }

  init() {
    const closeBtn = document.querySelector(".close-button");
    const closeArrowBtn = document.querySelector(".close-button-foot");
    const openArrowBtn = document.querySelector(".top-layer-trigger-button");
    
    closeBtn.addEventListener("click", this.removePrimeMember.bind(this));
    closeArrowBtn.addEventListener("click", this.removePrimeMember.bind(this));
    openArrowBtn.addEventListener("click", this.addPrimeMember.bind(this));
  }

  topLayerDrop() {
    if (window.scrollY >= this.dropBenchMark) {
      this.topLayer.classList.add("top-layer-active");
      this.primeMember.classList.add("prime-member-container-scroll-active");
    } else {
      this.topLayer.classList.remove("top-layer-active");
      this.primeMember.classList.remove("prime-member-container-scroll-active");
    }
  }

  addPrimeMember() {
    this.primeMember.classList.add("prime-member-container-active");
  }

  removePrimeMember() {
    this.primeMember.classList.remove("prime-member-container-active");
  }
}

export { ScrollEvent_sticky };
