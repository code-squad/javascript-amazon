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
  a_CarouselItem: $(".a-carousel-item"),
  a_CarouselFirstItem: $(".a-carousel-item:first-child"),
  a_CarouselLastItem: $(".a-carousel-item:last-child"),
  a_CarouselList: $All(".a-carousel-item"),
  prev: $(".a-carousel-prev"),
  next: $(".a-carousel-next"),
  classShow: $(".show"),
});


layerManager.init();
topMenu.init();
carousel.init();
