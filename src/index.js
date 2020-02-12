window.addEventListener('DOMContentLoaded', () => {
  const menuButtonElements = document.querySelectorAll(".card-navigation-list-item");
  const arrowButtonElements = document.querySelectorAll(".arrow-button");
  const carouselFirstElement = document.querySelector("#itemA");

  const carouselManager = new CarouselManager({menuButtonElements, arrowButtonElements, carouselFirstElement});
});