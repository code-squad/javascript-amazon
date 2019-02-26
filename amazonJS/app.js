import { ScrollEvent_sticky } from "./scrollEvent-Sticky.js";
import { Carousel_middle } from "./carousel-middle.js";
import { Search_autocorrect } from "./search-autocorrect.js";

document.addEventListener("DOMContentLoaded", () => {
  const scrollEvent_sticky = new ScrollEvent_sticky({
    //닫는 버튼의 클래스 명은 ".close-button" ".close-button-foot" 이어야 합니다.
    //여는 버튼의 클래스 명은 ".top-layer-trigger-button" 이어야 합니다.
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

  const carousel_middle = new Carousel_middle({
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

  const search_autocorrect = new Search_autocorrect({
    searchWindow: '.head-search-blank',
    autocorrectWindow: '.head-search-autocorrect-container',
    autocorrectLists: 'head-search-autocorrect-list',//not class
    toBeCloakedElement: '.wholeBodyContainer',
    searchButtonElement: '.head-search-button'
  }, {
    formId: '#input-form'
  }, {
    cloakingTransitionTime: '0.3s',
  })
});
