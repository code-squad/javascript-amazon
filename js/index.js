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
  carousel: $("#carousel"),
  innerCarousel: $(".a-carousel-row-inner"),
  a_Carousel: $(".a-carousel-item"),
  a_CarouseList: $All(".a-carousel-item"),
  prev: $(".a-carousel-prevpage"),
  next: $(".a-carousel-nextpage"),
});

layerManager.init();
topMenu.init();
carousel.init();
