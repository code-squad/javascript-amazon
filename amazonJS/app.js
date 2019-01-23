import { TopLayerEvent } from "./scrollEvent_Sticky.js";

document.addEventListener("DOMContentLoaded", () => {
  const headerHeight = window.getComputedStyle(document.querySelector('header')).height;
  const topLayerEvent = new TopLayerEvent(
    parseInt(headerHeight),
    document.querySelector(".top-layer-container"),
    document.querySelector(".prime-member-container")
  );
  document.addEventListener(
    "scroll",
    topLayerEvent.topLayerDrop.bind(topLayerEvent)
  );
  const closeBtn = document.querySelector(".close-button");
  const closeArrowBtn = document.querySelector(".close-button-foot");
  const openArrowBtn = document.querySelector(".top-layer-trigger-button");
  
  closeBtn.addEventListener("click", topLayerEvent.removePrimeMember.bind(topLayerEvent));
  closeArrowBtn.addEventListener("click", topLayerEvent.removePrimeMember.bind(topLayerEvent));
  openArrowBtn.addEventListener("click", topLayerEvent.addPrimeMember.bind(topLayerEvent));
});
