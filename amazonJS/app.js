import { ScrollEvent_sticky } from "./scrollEvent_sticky.js";

document.addEventListener("DOMContentLoaded", () => {
  const headerHeight = window.getComputedStyle(document.querySelector('header')).height;
  const scrollEvent_sticky = new ScrollEvent_sticky(
    parseInt(headerHeight),
    document.querySelector(".top-layer-container"),
    document.querySelector(".prime-member-container")
  );
  document.addEventListener(
    "scroll",
    scrollEvent_sticky.topLayerDrop.bind(scrollEvent_sticky)
  );
});
