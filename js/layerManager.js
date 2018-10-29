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
    console.log(innerLayerEle);

    departmentsEle.addEventListener("mouseover", () => {
      dimmedEle.setAttribute("style", "display: block;");
      listLayerEle.setAttribute("style", "display: block;");
    });

    departmentsEle.addEventListener("mouseout", () => {
      dimmedEle.setAttribute("style", "display: none;");
      listLayerEle.setAttribute("style", "display: none;");
    });

    displayOuterEle.addEventListener("mouseover", () => {
      innerLayerEle.setAttribute("style", "display: block;");
    });

    displayOuterEle.addEventListener("mouseout", () => {
      innerLayerEle.setAttribute("style", "display: none;");
    });
  }
}