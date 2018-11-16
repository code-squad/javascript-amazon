export default class LayerManager {
  constructor(ele) {
    this.ele = ele;
  }

  init() {
    // this.setMouseMoveBlockDisplay(departmentsEle, dimmedEle, listLayerEle, timer);
    // this.setMouseOutNoneDisplay(departmentsEle, dimmedEle, listLayerEle);
    this.mouseOverOutLayer();
    this.checkPointInTriangle();
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
    const contentLayerEle = document.querySelectorAll(".content-layer");
    const outerLayerEle = document.querySelector(".outer-layer");

    const posXYpoint = {
      aX: 0, aY: 0,
      bX: 400, bY: 0,
      cX: 0, cY: 408,
      dX: 400, dY: 408,
      mousePointX: 0, mousePointY: 0,
    };

    contentLayerEle.forEach((e) => e.addEventListener("mouseenter", (e) => {
      posXYpoint.mousePointX = e.layerX;
      posXYpoint.mousePointY = e.layerY;
      console.log(e.layerX, e.layerY, "mouseEnter content_layer");
      console.log(posXYpoint.mousePointX, posXYpoint.mousePointY);
    }));

    outerLayerEle.addEventListener("mousemove", (p) => {
      let point = {
        x: p.layerX,
        y: p.layerY
      };
      console.log(`x:${point.x} | y:${point.y}`, "mousepoint")
    });

    // let aPoint = (a.y * c.x - a.x * c.y + (c.y - a.y) * p.x + (a.x - c.x) * p.y);
    // let bPoint = (a.x * b.y - a.y * b.x + (a.y - b.y) * p.x + (b.x - a.x) * p.y);

    // if (aPoint <= 0 || bPoint <= 0) return false;

    // let mousePoint = (-b.y * c.x + a.y * (-b.x + c.x) + a.x * (b.y - c.y) + b.x * c.y);
    // return (aPoint + bPoint) < mousePoint;
  }
}