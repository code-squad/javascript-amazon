class TopLayerEvent {
  constructor(dropBenchMark, topLayer, primeMember) {
    this.dropBenchMark = dropBenchMark;
    this.topLayer = topLayer;
    this.primeMember = primeMember;
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

export { TopLayerEvent };
