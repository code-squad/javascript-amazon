export default class LayerManager {
  constructor(ele) {
    this.ele = ele;
  }

  init() {
    const layer = {
      dimmedEle: this.ele.dimmedLayer,
      titleEle: this.ele.titleLayer,
      listEle: this.ele.departmentListLayer,
      outerEle: this.ele.outerLayer,
      contentEle: this.ele.contentLayer,
    }
    this.setPointInTriangle(layer);
    this.setOpenListLayer(layer);
    this.setCloseListLayer(layer);
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

  setPointInTriangle(layer) {
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
        x: 392,
        y: 152,
      },
      fixP1: {
        x: 392,
        y: 550,
      },
    }

    // get MousePosition Point(X,Y)  
    layer.outerEle.addEventListener("mousemove", (e) => {
      clientXY.mouseP.x = e.clientX;
      clientXY.mouseP.y = e.clientY;
      // console.log(`${clientXY.mouseP.x} 실시간마우스X ${clientXY.mouseP.y} 실시간마우스Y`);
    });

    // get Stay MousePosition Point(X,Y)
    layer.outerEle.addEventListener("mousemove", this.debounce(200, (e) => {
      clientXY.stayMouseP.x = e.clientX;
      clientXY.stayMouseP.y = e.clientY;
      console.log(`${clientXY.stayMouseP.x} debounce 마우스 X ${clientXY.stayMouseP.y} debounce 마우스 Y`);
    }));

    // check Mouse in Triangle
    let boolTriangle = this.boolPointInTriangle(clientXY.mouseP, clientXY.stayMouseP, clientXY.fixP1, clientXY.fixP0);
    console.log(boolTriangle);

    // hover 기능 
    layer.contentEle.forEach((e) => {
      this.setShowInnerListLayer(e); // show Inner Layer
      this.setHiddenInnerListLayer(e);  // hidden Inner Layer
    });
  }

  // test Active Deactive Method
  setActiveEvent(layer, boolTriangle) {
    layer.contentEle.forEach((e) => {
      (boolTriangle === true) ? this.debounce(300, this.setShowInnerListLayer(e)) : this.setHiddenInnerListLayer(e);
      // (boolTriangle === true) ? this.setStopInnerListLayer(e) : this.setHiddenInnerListLayer(e);
    });
  }

  setShowInnerListLayer(e) {
    e.addEventListener("mouseenter", (eContent) => {
      this.setShowAttText(eContent);
      this.setShowAttribute(eContent);
    });
  }

  setHiddenInnerListLayer(e) {
    e.addEventListener("mouseleave", (eContent) => {
      this.setHiddenAttText(eContent);
      this.setHiddenAttribute(eContent);
    });
  }

  setShowAttText(e) {
    e.target.children[0].setAttribute("style", "color: #e47911;");
    e.target.children[1].setAttribute("style", "color: #bbb;");
  }

  setHiddenAttText(e) {
    e.target.children[0].removeAttribute("style");
    e.target.children[1].removeAttribute("style");
  }

  setShowAttribute(e) {
    // e.target.lastElementChild.setAttribute("style", "opacity: 100; width: 400px;");
    e.target.lastElementChild.setAttribute("style", "display: block;");
  }

  setHiddenAttribute(e) {
    e.target.lastElementChild.removeAttribute("style");
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
  boolPointInTriangle(p, p0, p1, p2) {
    let result = (((p1.y - p0.y) * (p.x - p0.x) - (p1.x - p0.x) * (p.y - p0.y)) || ((p2.y - p1.y) * (p.x - p1.x) - (p2.x - p1.x) * (p.y - p1.y)) || ((p0.y - p2.y) * (p.x - p2.x) - (p0.x - p2.x) * (p.y - p2.y))) >= 0;
    return result;
  }
}