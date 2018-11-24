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
    let timer = false;
    this.mouseOverOutLayer(layer, timer);
    this.checkPointInTriangle(layer);
    this.setCloseListLayer(layer, timer);
    this.setOpenListLayer(layer, timer);
  }

  setOpenListLayer(layer, timer) {
    layer.titleEle.addEventListener("mouseenter", () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        layer.listEle.setAttribute("style", "display: block;");
        layer.dimmedEle.setAttribute("style", "opacity: 0.6; height: 100%;");
      }, 350);
    });
  }
  setCloseListLayer(layer, timer) {
    layer.titleEle.addEventListener("mouseleave", () => {
      clearTimeout(timer);
      layer.listEle.setAttribute("style", "opacity: 0;");
      layer.dimmedEle.setAttribute("style", "opacity: 0;");
    });
  }

  checkPointInTriangle(layer) {
    let boolTriangle = false;
    let mousePoint = {
      x: 0,
      y: 0
    };
    let startPoint = {
      x: 0,
      y: 0,
    };
    const p0 = {
      x: 392,
      y: 152
    };
    const p1 = {
      x: 392,
      y: 559
    };

    // get MousePosition Point(X,Y)  
    layer.outerEle.addEventListener("mousemove", (eContent) => {
      mousePoint.x = eContent.clientX;
      mousePoint.y = eContent.clientY;
      // mouseMove시 X,Y 값이 다를 때 startPoint 지정
      if (startPoint.x !== eContent.clientX && startPoint.y !== eContent.clientY) {
        let setStartPoint = this.getDelayStartPoint(300, eContent, startPoint);
        boolTriangle = this.getPointInTriangle(mousePoint, setStartPoint, p1, p0);
        console.log(startPoint, boolTriangle);
      }
    });

    // set Element Show / Hidden
    layer.contentEle.forEach((e) => {
      this.setShowInnerLayer(e);
      this.setHiddenInnerLayer(e);
    });
  }

  setShowInnerLayer(e) {
    e.addEventListener("mouseenter", (eContent) => {
      this.setShowAttText(eContent);
      this.setShowAttribute(eContent);
    });
  }

  setHiddenInnerLayer(e) {
    e.addEventListener("mouseleave", (eContent) => {
      this.setHiddenAttText(eContent);
      this.setHiddenAttribute(eContent);
    });
  }

  getDelayStartPoint(delay, e, startPoint) {
    let timerId;
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      startPoint.x = e.clientX;
      startPoint.y = e.clientY;
      timerId = null;
    }, delay);
    return startPoint;
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

  // triangle Algorithm 
  getPointInTriangle(p, p0, p1, p2) {
    let result = (((p1.y - p0.y) * (p.x - p0.x) - (p1.x - p0.x) * (p.y - p0.y)) || ((p2.y - p1.y) * (p.x - p1.x) - (p2.x - p1.x) * (p.y - p1.y)) || ((p0.y - p2.y) * (p.x - p2.x) - (p0.x - p2.x) * (p.y - p2.y))) >= 0;
    return result;
  }
}