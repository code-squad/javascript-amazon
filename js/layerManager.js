export default class LayerManager {
  constructor(ele) {
    this.ele = ele;
    this.boolTriangle = false;
  }

  init() {
    const layer = {
      dimmedEle: this.ele.dimmedLayer,
      titleEle: this.ele.titleLayer,
      listEle: this.ele.departmentListLayer,
      outerEle: this.ele.outerLayer,
      contentEle: this.ele.contentLayer,
    }

    this.checkMouseInTriangle(layer);
    this.setOpenListLayer(layer);
    this.setCloseListLayer(layer);
    this.searchInnerListLayer(layer);
  }

  setOpenListLayer(layer) {
    layer.titleEle.addEventListener("mouseenter", () => {
      window.setTimeout(() => {
        layer.listEle.setAttribute("style", "display: block;");
        layer.dimmedEle.setAttribute("style", "opacity: 0.6; height: 100%;");
      }, 350);
    });
  }

  setCloseListLayer(layer) {
    layer.titleEle.addEventListener("mouseleave", () => {
      layer.listEle.removeAttribute("style");
      layer.dimmedEle.setAttribute("style", "opacity: 0;");
    });
  }

  searchInnerListLayer(layer) {
    layer.contentEle.forEach((activeLayer) => {
      this.setShowInnerListLayer(activeLayer, layer);
      this.setHiddenInnerListLayer(activeLayer);
    });
  }

  checkMouseInTriangle(layer) {
    let clientXY = {
      mouseP: {
        x: 0,
        y: 0,
      },
      stayMouseP: {
        x: 0,
        y: 0,
      },
      fixP0: {
        x: 400,
        y: 150,
      },
      fixP1: {
        x: 400,
        y: 560,
      },
    }

    // get Stay Mouse Position Point(X,Y)
    layer.outerEle.addEventListener("mousemove", this.debounce(300, (mouse) => {
      clientXY.stayMouseP.x = mouse.clientX;
      clientXY.stayMouseP.y = mouse.clientY;
      console.log(`${clientXY.stayMouseP.x} debounce 마우스 X ${clientXY.stayMouseP.y} debounce 마우스 Y`);
    }));

    // get Mouse Position Point(X,Y) & check Mouse Position in Triangle 
    layer.outerEle.addEventListener("mousemove", (mouse) => {
      clientXY.mouseP.x = mouse.clientX;
      clientXY.mouseP.y = mouse.clientY;
      // console.log(`${clientXY.mouseP.x} 실시간마우스X ${clientXY.mouseP.y} 실시간마우스Y`);

      this.boolTriangle = this.boolMouseInTriangle(clientXY.mouseP, clientXY.stayMouseP, clientXY.fixP1, clientXY.fixP0);
      // console.log(this.boolTriangle, "myTriangle");
    });

    // console.log(this.mousePosition, "checkinTriangle");
  }

  setShowInnerListLayer(activeLayer, layer) {
    activeLayer.addEventListener("mouseenter", (activeEle) => {
      // layer.outerEle.addEventListener("mousemove", this.debounce(200, (mouse) => {
      //   this.mousePosition.stayMouseP.x = mouse.clientX;
      //   this.mousePosition.stayMouseP.y = mouse.clientY;
      //   console.log(`${this.mousePosition.stayMouseP.x} debounce 마우스 X ${this.mousePosition.stayMouseP.y} debounce 마우스 Y`);
      //   this.boolTriangle = this.boolMouseInTriangle(this.mousePosition.mouseP, this.mousePosition.stayMouseP, this.mousePosition.fixP1, this.mousePosition.fixP0);
      // }));
      console.log(this.boolTriangle);
      if (this.boolTriangle) return this.deactiveShowListLayer(activeLayer);
      this.setShowAttText(activeEle);
      this.setShowAttribute(activeEle);
    });
  }

  setHiddenInnerListLayer(activeLayer) {
    activeLayer.addEventListener("mouseleave", (activeEle) => {
      if (this.boolTriangle) return this.deactiveHiddenListLayer(activeLayer);
      this.setHiddenAttText(activeEle);
      this.setHiddenAttribute(activeEle);
    });
  }

  deactiveShowListLayer(activeLayer) {
    activeLayer.removeEventListener("mouseenter", (activeEle) => this.setShowAttribute(activeEle));
  }

  deactiveHiddenListLayer(activeLayer) {
    activeLayer.removeEventListener("mouseleave", (activeEle) => this.setHiddenAttribute(activeEle));
  }

  setShowAttText(active) {
    active.target.children[0].setAttribute("style", "color: #e47911;");
    active.target.children[1].setAttribute("style", "color: #bbb;");
    active.target.setAttribute("style", "background-color:#eedd");
  }

  setHiddenAttText(active) {
    active.target.children[0].removeAttribute("style");
    active.target.children[1].removeAttribute("style");
    active.target.removeAttribute("style");
  }

  setShowAttribute(active) {
    active.target.lastElementChild.setAttribute("style", "display: block;");
  }

  setHiddenAttribute(active) {
    active.target.lastElementChild.removeAttribute("style");
  }

  // debouncing timer 300m
  debounce(delay, fn) {
    let timerId = null;
    return function (...args) {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, delay);
    }
  }

  // triangle Algorithm
  boolMouseInTriangle(p, p0, p1, p2) {
    let result = (((p1.y - p0.y) * (p.x - p0.x) - (p1.x - p0.x) * (p.y - p0.y)) || ((p2.y - p1.y) * (p.x - p1.x) - (p2.x - p1.x) * (p.y - p1.y)) || ((p0.y - p2.y) * (p.x - p2.x) - (p0.x - p2.x) * (p.y - p2.y))) >= 0;
    return result;
  }
}
