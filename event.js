export default class HiddenContentsHandler {
  scrollEventHandler() {
    let hiddenLayer = document.querySelector(".hidden-plans");
    document.addEventListener("scroll", () => {
      const yPos = window.pageYOffset;
      const displayStandard = 300;
      const openStandard = 400;

      (yPos > displayStandard) ? hiddenLayer.style.display = "block": hiddenLayer.style.display = "none";

      if (yPos > openStandard) {
        hiddenLayer.classList.add("trans-show-hidden");
        hiddenLayer.classList.remove("trans-hidden");
      } else {
        hiddenLayer.classList.remove("trans-show-hidden");
        hiddenLayer.classList.add("trans-hidden");
      }
    });
  }

  clickEventHandler() {
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
    let hiddenContents = document.querySelector(".hidden-inner-contents");
    hiddenContents.classList.remove("trans-show-click");
  }
}