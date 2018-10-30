export default class LayerManager {
  constructor(ele) {
    this.ele = ele;
  }

  init() {
    this.mouseOverOutLayer();
  }

  mouseOverOutLayer() {
    const dimmedEle = this.ele.dimmedEle;
    const departmentsEle = this.ele.departmentLayerEle;
    const listLayerEle = this.ele.listLayerEle;
    const displayOuterEle = this.ele.displayOuterEle;
    const innerLayerEle = this.ele.innerLayerEle;

    departmentsEle.addEventListener("mouseover", () => {
      dimmedEle.setAttribute("style", "display: block;");
      listLayerEle.setAttribute("style", "display: block;");
    });

    departmentsEle.addEventListener("mouseout", () => {
      dimmedEle.setAttribute("style", "display: none;");
      listLayerEle.setAttribute("style", "display: none;");
    });

    displayOuterEle.addEventListener("mouseenter", () => {
      innerLayerEle.classList.add("inner-display-layer");
    });

    displayOuterEle.addEventListener("mouseleave", () => {
      innerLayerEle.classList.remove("inner-display-layer");
    });
  }
}