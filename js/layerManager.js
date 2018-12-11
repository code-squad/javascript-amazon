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

    // get Mouse Position Point(X,Y) & check Mouse Position in Triangle 
    layer.outerEle.addEventListener("mousemove", (mouse) => {
      clientXY.mouseP.x = mouse.clientX;
      clientXY.mouseP.y = mouse.clientY;
      // console.log(`${clientXY.mouseP.x} 실시간마우스X ${clientXY.mouseP.y} 실시간마우스Y`);

      this.boolTriangle = this.boolMouseInTriangle(clientXY.mouseP, clientXY.stayMouseP, clientXY.fixP1, clientXY.fixP0);
      // console.log(this.boolTriangle, "myTriangle");
    });

    // get Stay Mouse Position Point(X,Y)
    layer.outerEle.addEventListener("mousemove", this.debounce(300, (mouse) => {
      clientXY.stayMouseP.x = mouse.clientX;
      clientXY.stayMouseP.y = mouse.clientY;
      // console.log(`${clientXY.stayMouseP.x} debounce 마우스 X ${clientXY.stayMouseP.y} debounce 마우스 Y`);
    }));
  }

  searchInnerListLayer(layer) {
    layer.contentEle.forEach((activeLayer) => {
      this.setShowInnerListLayer(activeLayer);
      this.setHiddenInnerListLayer(activeLayer);
    });
  }

  setShowInnerListLayer(activeLayer) {
    activeLayer.addEventListener("mouseenter", (activeEle) => {
      console.log(activeLayer, activeEle);
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

  activeShowInnerLayer() {

  }

  activeHideInnerLayer() {

  }

  deactiveShowListLayer(activeLayer) {
    activeLayer.removeEventListener("mouseenter", (activeEle) => {
      this.setShowAttText(activeEle);
      this.setShowAttribute(activeEle)
    });
  }

  deactiveHiddenListLayer(activeLayer) {
    activeLayer.removeEventListener("mouseleave", (activeEle) => {
      this.setHiddenAttribute(activeEle)
    });
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
    // 초기값 예외
    const startStayMousePosition = p0.x === 0 && p0.y === 0;
    if (startStayMousePosition) return false;
    let result = (((p1.y - p0.y) * (p.x - p0.x) - (p1.x - p0.x) * (p.y - p0.y)) || ((p2.y - p1.y) * (p.x - p1.x) - (p2.x - p1.x) * (p.y - p1.y)) || ((p0.y - p2.y) * (p.x - p2.x) - (p0.x - p2.x) * (p.y - p2.y))) >= 0;
    return result;
  }

  // 직각 유무 파악 
  slope(a, b) {
    // const x = b.x - a.x;
    // const y = b.y - a.y;
    // const rad = Math.atan2(x, y);
    const degree = parseInt((Math.atan2(b.x - a.x, b.y - a.y) * 180) / Math.PI);
    // console.log(degree)
    // return (b.y - a.y) / (b.x - a.x);
    return;
  }
}
