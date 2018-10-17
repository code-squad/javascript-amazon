export default class HiddenTopMenu {
  scrollMenuHandler(displayWorkVal, hiddenTopMenuWorkVal) {
    let hiddenLayer = document.querySelector(".hidden-plans");

    document.addEventListener("scroll", () => {
      const yPos = window.pageYOffset;
      const b_Display = yPos > displayWorkVal;
      const b_HiddenMenu = yPos > hiddenTopMenuWorkVal;

      (b_Display) ? this.displayBlock(): this.displayNone();

      if (b_HiddenMenu) {
        hiddenLayer.classList.add("trans-show-hidden");
        hiddenLayer.classList.remove("trans-hidden");
      } else {
        hiddenLayer.classList.add("trans-hidden");
        hiddenLayer.classList.remove("trans-show-hidden");
      }
    });
  }

  displayBlock() {
    const hiddenLayer = document.querySelector(".hidden-plans");
    hiddenLayer.classList.add("trans-block-display");
    hiddenLayer.classList.remove("trans-none-display");
  }

  displayNone() {
    const hiddenLayer = document.querySelector(".hidden-plans");
    hiddenLayer.classList.remove("trans-block-display");
    hiddenLayer.classList.add("trans-none-display");
  }

  clickMenuHandler() {
    let expandLayer = document.querySelector(".expand-membership-card");
    let hiddenContents = document.querySelector(".hidden-inner-contents");

    let closeButton = document.querySelector(".close-button");
    let otherCloseButton = document.querySelector(".comparison-close-button");

    expandLayer.addEventListener("click", () => {
      if (hiddenContents) {
        hiddenContents.classList.add("trans-show-click");
      }
    });

    otherCloseButton.addEventListener("click", this.closerButtonHandler);
    closeButton.addEventListener("click", this.closerButtonHandler);
  }

  closerButtonHandler() {
    const hiddenContents = document.querySelector(".hidden-inner-contents");
    hiddenContents.classList.remove("trans-show-click");
  }
}