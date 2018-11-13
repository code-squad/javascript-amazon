export default class LayerManager {
  constructor(ele) {
    this.ele = ele;
  }

  init() {
    // this.setMouseMoveBlockDisplay(departmentsEle, dimmedEle, listLayerEle, timer);
    // this.setMouseOutNoneDisplay(departmentsEle, dimmedEle, listLayerEle);
    this.mouseOverOutLayer();
  }

  setMouseMoveBlockDisplay(departmentsEle, dimmedEle, listLayerEle, timer) {
  }

  setMouseOutNoneDisplay(departmentsEle, dimmedEle, listLayerEle) {
  }

  mouseOverOutLayer() {
    const departmentsEle = this.ele.departmentLayerEle;
    const dimmedEle = this.ele.dimmedEle;
    const listLayerEle = this.ele.listLayerEle;
    let timer = false;

    departmentsEle.addEventListener('mousemove', () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        listLayerEle.setAttribute("style", "display: block;");
        dimmedEle.setAttribute("style", "display: block;");
      }, 350);
    });

    departmentsEle.addEventListener("mouseout", (e) => {
      const displayStatus = e.path[2].lastElementChild.style.display;
      // console.log(e.path[2].childNodes[3].style.display !== "block")

      console.log(e);
      // console.log(e.path[2].lastElementChild.style.dis play)
      // console.log(e.target.children);
      console.log(e.target);
      console.log(e.relatedTarget);
      if (displayStatus !== "block") {
        clearTimeout(timer);
        listLayerEle.setAttribute("style", "display: none;");
        dimmedEle.setAttribute("style", "display: none;");
      }
    });
  }

  checkPointInTriangle(p, a, b, c) {
    const point = {};
    window.addEventListener("mousemove", (m) => {
      point = { x: m.x, y: m.y };
      console.log(`x:${point.x} | y:${point.y}`, "mousepoint")
    });

    let aPoint = (a.y * c.x - a.x * c.y + (c.y - a.y) * p.x + (a.x - c.x) * p.y);
    let bPoint = (a.x * b.y - a.y * b.x + (a.y - b.y) * p.x + (b.x - a.x) * p.y);

    if (aPoint <= 0 || bPoint <= 0) return false;

    let mousePoint = (-b.y * c.x + a.y * (-b.x + c.x) + a.x * (b.y - c.y) + b.x * c.y);
    return (aPoint + bPoint) < mousePoint;
  }
}
