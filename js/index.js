import HiddenTopMenu from "./hiddenTopMenu.js";
import LayerManager from "./layerManager.js";
import CarouselMenu from "./carousel.js";
import { $, $All } from "./docSelector.js";

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

const carousel = new CarouselMenu({
  carousel: $(".a-carousel"),
  parentCarousel: $(".a-carousel-viewport"),
  prev: $(".a-carousel-prev"),
  next: $(".a-carousel-next"),
  autoActTime: 3000,
  reactTime: 3500,
  switchAutoMove: true,
  switchPause: true,
});

window.addEventListener("DOMContentLoaded", () => {
  carousel.xmlHttpRequest('./JSON/primeMoive.json');
});

layerManager.init();
topMenu.init();
carousel.init();
