export default class HiddenTopMenu {
  constructor(ele) {
    this.ele = ele;
  }

  init() {
    const yAxisOperatePoint = {
      displayVal: 300,
      showTopMenuVal: 400,
      hiddenTopMenuVal: 400
    };
    this.scrollMenuHandler(yAxisOperatePoint.displayVal, yAxisOperatePoint.showTopMenuVal, yAxisOperatePoint.hiddenTopMenuVal);
    this.clickOpenMenuHandler();
    this.clickCloseMenuHandler();
  };

  scrollMenuHandler(displayVal, showVal, hiddenVal) {
    document.addEventListener("scroll", () => {
      const yPos = window.pageYOffset;
      const b_Display = yPos > displayVal;
      const b_ShowMenu = yPos > showVal;
      const b_HiddenMenu = yPos < hiddenVal;
      const hiddenAllEle = this.ele.hiddenAllContentsEle;

      hiddenAllEle.classList.toggle("trans-display-block", b_Display);
      hiddenAllEle.classList.toggle("trans-hidden-outerContents", b_HiddenMenu);
      hiddenAllEle.classList.toggle("trans-show-outerContents", b_ShowMenu);
    });
  }

  clickOpenMenuHandler() {
    this.ele.expandEle.addEventListener("click", () => {
      this.ele.hiddenInnerContentsEle.classList.add("trans-show-inner-content");
      this.ele.hiddenAllContentsEle.classList.add("trans-height-show-innerContents");
    });
    this.ele.otherCloseButtonEle.addEventListener("click", this.clickCloseMenuHandler.bind(this));
    this.ele.closeButtonEle.addEventListener("click", this.clickCloseMenuHandler.bind(this));
  }

  clickCloseMenuHandler() {
    this.ele.hiddenInnerContentsEle.classList.remove("trans-show-inner-content");
    this.ele.hiddenAllContentsEle.classList.remove("trans-height-show-innerContents");
  }
}