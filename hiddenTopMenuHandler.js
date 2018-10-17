export default class HiddenTopMenu {
  scrollMenuHandler(displayWorkVal, hiddenTopMenuWorkVal) {
    let hiddenLayer = document.querySelector(".hidden-plans");

    document.addEventListener("scroll", () => {
      const yPos = window.pageYOffset;

      // hidden-plans class가 사라지는 버그 발견 이유는 여기 라고 추측을 하는데 원인은 모르겠음
      // MDN : https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#Browser_compatibility
      // toggle() 에서 기능이 false인 경우 제거후 false를 먹여서 사용 할 수 없을 것 같음.

      // const b_Display = hiddenLayer.classList.toggle("hidden-plans", yPos > displayWorkVal);
      // const b_HiddenMenu = hiddenLayer.classList.toggle("hidden-plans", yPos > hiddenTopMenuWorkVal);
      const b_Display = yPos > displayWorkVal;
      const b_HiddenMenu = yPos > hiddenTopMenuWorkVal;

      (yPos > displayWorkVal) ? this.displayBlock(): this.displayNone();

      if (yPos > hiddenTopMenuWorkVal) {
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