import { ScrollEventSticky } from "./scrollEvent-Sticky.js";
import { CarouselMiddle } from "./carousel-middle.js";
import { SearchAutocorrect } from "./search-autocorrect.js";

document.addEventListener("DOMContentLoaded", () => {
  const scrollEventSticky = new ScrollEventSticky({
    header: "header",
    stickyLayer: ".top-layer-container",
    hiddenLayer: ".prime-member-container",
    closeBtn: ".close-button",
    closeArrowBtn: ".close-button-foot",
    openArrowBtn: ".top-layer-trigger-button",
    topLayerActiveClass: "top-layer-active",
    scrollActiveClass: "prime-member-container-scroll-active",
    btnActiveClass: "prime-member-container-active"
  });

  const carouselMiddle = new CarouselMiddle({
    container: ".middle-body-carousel-list",
    rightBtn: ".middle-body-carousel-right-button",
    leftBtn: ".middle-body-carousel-left-button",
    anchorEl: ".middle-body-carousel-url"
  },{
    ajaxDataUrl: "./jsonData/data.json"
  },{
    carouselSize: "230px",
    carouselAutoMovingMS: 3000,
    autoEventStopContainer: ".middle-body-carousel",
    transitionTime: "0.1s",
    transitionPart: "all",   
  });

  const searchAutocorrect = new SearchAutocorrect({
    searchWindow: '.head-search-blank',
    autocorrectWindow: '.head-search-autocorrect-container',
    autocorrectListsClass: 'head-search-autocorrect-list',//not class
    toBeCloakedElement: '.wholeBodyContainer',
    searchButtonElement: '.head-search-button'
  }, {
    formId: '#input-form'
  }, {
    cloakingTransitionTime: '0.3s',
    shadingAutocorrectClass: 'shade',
    cloakingBackgroundClass: 'cloaking'
  })
});
