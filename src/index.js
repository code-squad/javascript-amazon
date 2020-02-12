window.addEventListener('DOMContentLoaded', () => {
  const menuBtnElements = document.querySelectorAll(".card-navigation-list-item");
  const arrowBtnElements = document.querySelectorAll(".arrow-button");
  const carouselFirstElement = document.querySelector("#carousel-first-item");

  const carouselManager = new CarouselManager({menuBtnElements, arrowBtnElements, carouselFirstElement});
});