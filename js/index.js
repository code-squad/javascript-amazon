import HiddenTopMenu from "./hiddenTopMenu.js";
import LayerManager from "./layerManager.js";

const searchDocEle = (classEle) => { return document.querySelector(classEle); }

const layerManager = new LayerManager({
  dimmedEle: searchDocEle("#nav-dimmed-cover"),
  departmentLayerEle: searchDocEle(".nav-department"),
  listLayerEle: searchDocEle(".departments-layer-list"),
  displayOuterEle: searchDocEle(".list-layer"),
  innerLayerEle: searchDocEle(".inner-layer"),
});

const topMenu = new HiddenTopMenu({
  closeButtonEle: searchDocEle(".close-button"),
  otherCloseButtonEle: searchDocEle(".comparison-close-button"),
  expandEle: searchDocEle(".expand-membership-card"),
  hiddenInnerContentsEle: searchDocEle(".hidden-inner-contents"),
  hiddenAllContentsEle: searchDocEle(".hidden-plans"),
  transDisplayEle: searchDocEle(".trans-display-block"),
  transShowOuterEle: searchDocEle(".trans-show-outerContents"),
  transHiddenOuterEle: searchDocEle(".trans-hidden-outerContents"),
});

layerManager.init();
topMenu.init();
