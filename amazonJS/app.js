import { ScrollEvent_sticky } from "./scrollEvent_sticky.js";

document.addEventListener("DOMContentLoaded", () => {
  const headerHeight = window.getComputedStyle(document.querySelector("header")).height;
  new ScrollEvent_sticky(
    parseInt(headerHeight),
    document.querySelector(".top-layer-container"),
    document.querySelector(".prime-member-container")
  );
});
