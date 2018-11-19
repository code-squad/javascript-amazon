import HiddenTopMenu from "./hiddenTopMenu.js";
import LayerManager from "./layerManager.js";

const searchDocEle = (classEle) => { return document.querySelector(classEle); };
const searchDocAllEle = (classEle) => { return document.querySelectorAll(classEle); };

const layerManager = new LayerManager({
  dimmedEle: searchDocEle("#nav-dimmed-cover"),
  titleLayerEle: searchDocEle(".departments-title-layer"),
  listLayerEle: searchDocEle(".departments-layer-list"),
  outerLayerEle: searchDocEle(".outer-layer"),
  contentLayerEle: searchDocAllEle(".content-layer"),
});

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

layerManager.init();
topMenu.init();