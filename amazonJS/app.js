import { ScrollEvent_sticky } from "./scrollEvent_sticky.js";

document.addEventListener("DOMContentLoaded", () => {
  new ScrollEvent_sticky(
    document.querySelector("header"),
    document.querySelector(".top-layer-container"),
    document.querySelector(".prime-member-container")
  );
});
