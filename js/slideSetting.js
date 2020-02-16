const carousel = document.querySelector(".slider");
const carouselChildren = document.querySelectorAll(".slider > li");
const buttonPrev = document.querySelector(".prev-btn");
const buttonNext = document.querySelector(".next-btn");
const buttonNav = document.querySelectorAll(".slide-navigation > li");
let start = 1;
let end = 6;

const setting = {
  slideAll: carousel,
  slideChildren: carouselChildren,
  currentIndex: start,
  maxIndex: end,
  prev: buttonPrev,
  next: buttonNext,
  nav: buttonNav
};

export { setting };
