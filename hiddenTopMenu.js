export default class HiddenTopMenu {
  constructor(ele) {
    this.ele = ele;
  }

  scrollMenuHandler(displayWorkVal, showTopMenuActVal, HiddenTopMenuActVal) {
    const hiddenEle = document.querySelector(".hidden-plans");

    document.addEventListener("scroll", () => {
      const yPos = window.pageYOffset;
      const b_Display = yPos > displayWorkVal;
      const b_ShowMenu = yPos > showTopMenuActVal;
      const b_HiddenMenu = yPos < HiddenTopMenuActVal;

      hiddenEle.classList.toggle("trans-display-block", b_Display);
      hiddenEle.classList.toggle("trans-show-hidden", b_ShowMenu);
      hiddenEle.classList.toggle("trans-hidden", b_HiddenMenu);
    });
  }

  clickMenuHandler() {
    let expandEle = document.querySelector(".expand-membership-card");
    let hiddenContentsEle = document.querySelector(".hidden-inner-contents");

    let closeButton = document.querySelector(".close-button");
    let otherCloseButton = document.querySelector(".comparison-close-button");

    expandEle.addEventListener("click", () => {
      hiddenContentsEle.classList.toggle("trans-show-click");
    });
    otherCloseButton.addEventListener("click", this.closerButtonHandler);
    closeButton.addEventListener("click", this.closerButtonHandler);
  }

  closerButtonHandler() {
    const hiddenContentsEle = document.querySelector(".hidden-inner-contents");
    hiddenContentsEle.classList.toggle("trans-show-click");
  }
}