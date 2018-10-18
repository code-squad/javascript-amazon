export default class HiddenTopMenu {
  scrollMenuHandler(displayWorkVal, showTopMenuWorkVal) {
    const hiddenEle = document.querySelector(".hidden-plans");

    document.addEventListener("scroll", () => {
      const yPos = window.pageYOffset;
      const b_Display = yPos > displayWorkVal;
      const b_ShowMenu = yPos > showTopMenuWorkVal;

      this.setDisplayVal(hiddenEle, b_Display);

      if (b_ShowMenu) {
        hiddenEle.classList.add("trans-show-hidden");
        hiddenEle.classList.remove("trans-hidden");
      } else {
        hiddenEle.classList.remove("trans-show-hidden");
        hiddenEle.classList.add("trans-hidden");
      }
    });
  }

  setDisplayVal(hiddenEle, b_Display) {
    hiddenEle.classList.toggle("trans-display-block", b_Display);
  }

  displayBlock(hiddenEle) {
    hiddenEle.classList.add("trans-display-block");
    hiddenEle.classList.remove("trans-display-none");
  }

  displayNone(hiddenEle) {
    hiddenEle.classList.remove("trans-display-block");
    hiddenEle.classList.add("trans-display-none");
  }

  clickMenuHandler() {
    let expandEle = document.querySelector(".expand-membership-card");
    let hiddenContentsEle = document.querySelector(".hidden-inner-contents");

    let closeButton = document.querySelector(".close-button");
    let otherCloseButton = document.querySelector(".comparison-close-button");

    expandEle.addEventListener("click", () => {
      if (hiddenContentsEle) {
        hiddenContentsEle.classList.add("trans-show-click");
      }
    });

    otherCloseButton.addEventListener("click", this.closerButtonHandler);
    closeButton.addEventListener("click", this.closerButtonHandler);
  }

  closerButtonHandler() {
    const hiddenContentsEle = document.querySelector(".hidden-inner-contents");
    hiddenContentsEle.classList.remove("trans-show-click");
  }
}