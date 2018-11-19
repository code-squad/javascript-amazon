export default class LayerManager {
  constructor(ele) {
    this.ele = ele;
  }

  init() {
    this.mouseOverOutLayer();
    this.checkPointInTriangle();
    this.pointInTriangle();
  }

  setMouseMoveBlockDisplay(departmentsEle, dimmedEle, listLayerEle, timer) { }

  setMouseOutNoneDisplay(departmentsEle, dimmedEle, listLayerEle) { }

  mouseOverOutLayer() {
    const titleEle = this.ele.titleLayerEle;
    const dimmedEle = this.ele.dimmedEle;
    const listLayerEle = this.ele.listLayerEle;

    let timer = false;

    titleEle.addEventListener("mouseenter", () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        listLayerEle.setAttribute("style", "display: block;");
        dimmedEle.setAttribute("style", "opacity: 0.6; height: 100%;");
      }, 350);
    });

    titleEle.addEventListener("mouseleave", () => {
      clearTimeout(timer);
      listLayerEle.setAttribute("style", "opacity: 0;");
      dimmedEle.setAttribute("style", "opacity: 0;");
    });
  }

  checkPointInTriangle() {
    const outerLayerEle = this.ele.outerLayerEle;
    const contentLayerEle = this.ele.contentLayerEle;

    let mousePoint = {
      x: 0,
      y: 0
    };
    let startPoint = {
      x: 0,
      y: 0
    };
    const p0 = {
      x: 392,
      y: 152
    };
    const p1 = {
      x: 392,
      y: 559
    };

    // getMousePosition Point XY
    outerLayerEle.addEventListener("mousemove", (eMousePoint) => {
      mousePoint.x = eMousePoint.clientX;
      mousePoint.y = eMousePoint.clientY;
    });

    const test = this.pointInTriangle(mousePoint, startPoint, p1, p0);

    // getContentPosition Point(aX, aY) XY  
    contentLayerEle.forEach((e) => e.addEventListener("mouseenter", (e) => {
      startPoint.x = e.clientX;
      startPoint.y = e.clientY;

      if (test) {
        e.target.addEventListener("mousemove", () => {
          e.target.lastElementChild.setAttribute("style", "display: block;");
        });
      } else {
        e.target.addEventListener("mouseout", () => {
          e.target.lastElementChild.removeAttribute("style");
        });
      }
    }));
  }

  // triangle Algorithm 
  pointInTriangle(p, p0, p1, p2) {
    let result = (((p1.y - p0.y) * (p.x - p0.x) - (p1.x - p0.x) * (p.y - p0.y)) || ((p2.y - p1.y) * (p.x - p1.x) - (p2.x - p1.x) * (p.y - p1.y)) || ((p0.y - p2.y) * (p.x - p2.x) - (p0.x - p2.x) * (p.y - p2.y))) >= 0;
    return result;
  }
}