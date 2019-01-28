import { Module } from "./module.js"
import { ScrollEvent_sticky } from "./scrollEvent-Sticky.js";
import { Carousel_middle } from "./carousel-middle.js"


document.addEventListener("DOMContentLoaded", () => {
  const scrollEvent_sticky = new ScrollEvent_sticky(
    document.querySelector("header"),
    document.querySelector(".top-layer-container"),
    document.querySelector(".prime-member-container"),
    new Module()
  );
  const carousel_middle = new Carousel_middle(
    false,
    document.querySelector('.middle-body-carousel-list'),
    document.querySelector(".middle-body-carousel-right-button"),
    document.querySelector(".middle-body-carousel-left-button"),
    new Module()
    );
});