export default class HiddenTopMenu {
  constructor(ele) {
    this.ele = ele;
  }

  init() {
    this.scrollMenuHandler(300, 400, 400);
    this.clickMenuHandler();
    this.closerButtonHandler();
  };

  scrollMenuHandler(displayWorkVal, showTopMenuActVal, HiddenTopMenuActVal) {
    const hiddenAllContentsEle = document.querySelector(".hidden-plans");

    document.addEventListener("scroll", () => {
      const yPos = window.pageYOffset;
      const b_Display = yPos > displayWorkVal;
      const b_ShowMenu = yPos > showTopMenuActVal;
      const b_HiddenMenu = yPos < HiddenTopMenuActVal;

      hiddenAllContentsEle.classList.toggle("trans-display-block", b_Display);
      hiddenAllContentsEle.classList.toggle("trans-show-hidden", b_ShowMenu);
      hiddenAllContentsEle.classList.toggle("trans-hidden", b_HiddenMenu);
    });
  }

  clickMenuHandler() {
    let expandEle = document.querySelector(".expand-membership-card");
    let hiddenInnerContentsEle = document.querySelector(".hidden-inner-contents");

    let closeButton = document.querySelector(".close-button");
    let otherCloseButton = document.querySelector(".comparison-close-button");

    expandEle.addEventListener("click", () => {
      hiddenInnerContentsEle.classList.toggle("trans-show-click");
    });
    otherCloseButton.addEventListener("click", this.closerButtonHandler);
    closeButton.addEventListener("click", this.closerButtonHandler);
  }

  closerButtonHandler() {
    const hiddenContentsEle = document.querySelector(".hidden-inner-contents");
    hiddenContentsEle.classList.toggle("trans-show-click");
  }
}