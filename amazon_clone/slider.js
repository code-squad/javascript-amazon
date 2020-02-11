window.addEventListener("DOMContentLoaded", event => {
  const carousel = document.querySelector(".slider__list");
  const arrayLI = document.querySelectorAll(".slider__item");
  const imageSize = document.querySelector(".slider__item").offsetWidth;
  const previousBtn = document.querySelector(".btn__previous");
  const nextBtn = document.querySelector(".btn__next");
  let count = 0;

  nextBtn.addEventListener("click", event => {
    count--;
    carousel.style.transform = `translateX(${count * imageSize}px)`;
  });

  previousBtn.addEventListener("click", event => {
    count++;
    carousel.style.transform = `translateX(${count * imageSize}px)`;
  });
});
