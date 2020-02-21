window.addEventListener('DOMContentLoaded', () => {
  const menuBtnElements = document.querySelectorAll(".card-navigation-list-item");
  const arrowBtnElements = document.querySelectorAll(".arrow-button");
  const carouselWrapperElement = document.querySelector(".carousel-wrapper");

  const carouselManager = new CarouselManager({menuBtnElements, arrowBtnElements, carouselWrapperElement});
});

//