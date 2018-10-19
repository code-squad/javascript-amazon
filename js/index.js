import HiddenTopMenu from "./hiddenTopMenu.js";

const topMenu = new HiddenTopMenu({
  closeButtonEle: document.querySelector(".close-button"),
  otherCloseButtonEle: document.querySelector(".comparison-close-button"),
  expandEle: document.querySelector(".expand-membership-card"),
  hiddenInnerContentsEle: document.querySelector(".hidden-inner-contents"),
  hiddenAllContentsEle: document.querySelector(".hidden-plans"),
  transDisplayEle: document.querySelector(".trans-display-block"),
  transShowOuterEle: document.querySelector(".trans-show-outerContents"),
  transHiddenOuterEle: document.querySelector(".trans-hidden-outerContents"),
});

topMenu.init();