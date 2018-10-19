import HiddenTopMenu from "./hiddenTopMenu.js";

const topMenu = new HiddenTopMenu({
  closeButtonEle: document.querySelector(".close-button"),
  otherCloseButtonEle: ".comparison-close-button",
  expandEle: ".expand-membership-card",
  hiddenInnerContentsEle: ".hidden-inner-contents",
  hiddenAllContentsEle: ".hidden-plans",
  transDisplayEle: ".trans-display-block",
  transShowEle: ".trans-show-hidden",
  transHiddenEle: ".trans-hidden",
});
topMenu.init();