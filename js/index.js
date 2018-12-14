import HiddenTopMenu from "./hiddenTopMenu.js";
import LayerManager from "./layerManager.js";
import CarouselMenu from "./carousel.js";

const $ = (classEle) => { return document.querySelector(classEle); };
const $All = (classEle) => { return document.querySelectorAll(classEle); };

const layerManager = new LayerManager({
  dimmedEle: $("#nav-dimmed-cover"),
  titleEle: $(".departments-title-layer"),
  departmentListEle: $(".departments-layer-list"),
  outerEle: $(".outer-layer"),
  contentEle: $All(".content-layer"),
});

const topMenu = new HiddenTopMenu({
  closeButtonEle: $(".close-button"),
  otherCloseButtonEle: $(".comparison-close-button"),
  expandEle: $(".expand-membership-card"),
  hiddenInnerContentsEle: $(".hidden-inner-contents"),
  hiddenAllContentsEle: $(".hidden-plans"),
  transDisplayEle: $(".trans-display-block"),
  transShowOuterEle: $(".trans-show-outerContents"),
  transHiddenOuterEle: $(".trans-hidden-outerContents")
});

const carousel = new CarouselMenu();

layerManager.init();
topMenu.init();
carousel.init();

