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
});

// 비동기 전달에 우선순위를 정리해야 할듯 함
// 현 문제점 : DOM 구조가 생성이 되지 않아 Carousel Element가 없음(=없으므로 탐색 시 null) 
// 의도(해결법): JSON 전달 => DOM 생성 => 각 Element 탐색 및 Node 변경 활용.
// event Deligation을 활용
// 문제 해결 순서: 비동기 데이터 먼저 받기 => Event Deligation 탐색 활용.
window.addEventListener("DOMContentLoaded", () => {
  carousel.xmlHttpRequest('../JSON/primeMoive.json');
});

layerManager.init();
topMenu.init();
carousel.init();
