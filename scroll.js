export default class Scroll {
  scrollEvent() {
    let hiddenLayer = document.querySelector(".hidden-plans");
    document.addEventListener("scroll", () => {
      const yPos = window.pageYOffset;
      const displayStandard = 300;
      const openStandard = 400;

      // const displayOn = hiddenLayer.classList.add("trans-display");
      // const displayOff = hiddenLayer.classList.remove("trans-display");
      // const showHidden = hiddenLayer.classList.add("trans-show-hidden");

      (yPos > displayStandard) ? hiddenLayer.style.display = "block": hiddenLayer.style.display = "none";
      if (yPos > openStandard) {
        // hiddenLayer.classList.add("trans-display");
        // hiddenLayer.setAttribute("class", "trans-display");
        // => setAttribute 시 css Selector가 다른 이름이어서 잘 안먹히는 것 같음

        hiddenLayer.style.height = "70px";
        hiddenLayer.style.opacity = "1";
      } else {
        // hiddenLayer.classList.remove("trans-display");
        // hiddenLayer.setAttribute("class", "hidden-plans");

        hiddenLayer.style.height = "0px";
        hiddenLayer.style.opacity = "0";
      }
    });
  }

  clickEvent() {
    let expandLayer = document.querySelector(".expand-membership-card");
    let hiddenContents = document.querySelector(".hidden-inner-contents");

    // 2개의 element를 전체적으로 탐색? / querySelectorAll로  탐색?
    let closeButton = document.querySelector(".close-button");
    let otherCloseButton = document.querySelector(".comparison-close-button");

    expandLayer.addEventListener("click", () => {
      if (hiddenContents) {
        hiddenContents.classList.add("trans-show-click");
        // console.log(hiddenContents.classList.add("trans-show-click"));

        // hiddenContents.style.height = "650px";
        // hiddenContents.style.opacity = "1";
        // hiddenContents.style.zIndex = "11";
      }
    });

    otherCloseButton.addEventListener("click", this.closerButtonHandler);
    closeButton.addEventListener("click", this.closerButtonHandler);
  }

  closerButtonHandler() {
    let hiddenContents = document.querySelector(".hidden-inner-contents");
    hiddenContents.classList.remove("trans-show-click");
    // hiddenContents.classList.add("trans-close-click");

    // hiddenContents.style.height = "0";
    // hiddenContents.style.zIndex = "0";
    // hiddenContents.style.overflow = "hidden";
  }
}