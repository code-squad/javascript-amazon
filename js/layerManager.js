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
    const innerLayerEle = document.querySelector(".inner-layer");

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
      x: 791,
      y: 152
    };
    const p2 = {
      x: 392,
      y: 559
    };
    const p3 = {
      x: 791,
      y: 559
    };

    // getContentPosition Point(aX, aY) XY  
    contentLayerEle.forEach((e) => e.addEventListener("mouseenter", (e) => {
      startPoint.x = e.clientX;
      startPoint.y = e.clientY;
      console.log(`x: ${startPoint.x}, y: ${startPoint.y} - startPoint `);
    }));

    // getMousePosition Point XY
    outerLayerEle.addEventListener("mousemove", (eMousePoint) => {
      mousePoint.x = eMousePoint.clientX;
      mousePoint.y = eMousePoint.clientY;
      const outerRect = outerLayerEle.getBoundingClientRect();
      const innerRect = innerLayerEle.getBoundingClientRect();
      const testRect = eMousePoint.toElement.getBoundingClientRect();
      console.log(`x: ${mousePoint.x}, y: ${mousePoint.y} - mousePoint `);
      console.log(`X: ${testRect.x} Y: ${testRect.y}`, eMousePoint.target)

      const test = pointInTriangle(mousePoint, startPoint, p2, p0);
      if (test) {
        time = window.setTimeout(() => {
          // innerLayerEle.style.display = "block";
        })
      }
    });

    // triangle Algorithm 
    function checkClockwise(p0, p1, p2) {
      let A = (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
      return A > 0;
    }

    function pointInTriangle(p, p0, p1, p2) {
      let result = (((p1.y - p0.y) * (p.x - p0.x) - (p1.x - p0.x) * (p.y - p0.y)) || ((p2.y - p1.y) * (p.x - p1.x) - (p2.x - p1.x) * (p.y - p1.y)) || ((p0.y - p2.y) * (p.x - p2.x) - (p0.x - p2.x) * (p.y - p2.y))) >= 0;
      return result;
    }

    function ptInTriangle(p, p0, p1, p2) {
      let s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y);
      let t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y);

      if (s <= 0 || t <= 0) return false;

      let A = (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
      return (s + t) < A;
    }
  }
}