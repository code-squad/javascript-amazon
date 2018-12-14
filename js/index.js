import HiddenTopMenu from "./hiddenTopMenu.js";
import CarouselMenu from "./carousel.js";

const searchDocEle = (classEle) => { return document.querySelector(classEle); };
const searchDocAllEle = (classEle) => { return document.querySelectorAll(classEle); };

const topMenu = new HiddenTopMenu({
  closeButtonEle: searchDocEle(".close-button"),
  otherCloseButtonEle: searchDocEle(".comparison-close-button"),
  expandEle: searchDocEle(".expand-membership-card"),
  hiddenInnerContentsEle: searchDocEle(".hidden-inner-contents"),
  hiddenAllContentsEle: searchDocEle(".hidden-plans"),
  transDisplayEle: searchDocEle(".trans-display-block"),
  transShowOuterEle: searchDocEle(".trans-show-outerContents"),
  transHiddenOuterEle: searchDocEle(".trans-hidden-outerContents")
});

const carousel = new CarouselMenu();

topMenu.init();
carousel.init();
