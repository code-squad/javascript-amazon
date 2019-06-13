let carousel = document.querySelector(".carousel");
let carouselWidth = carousel.offsetWidth;
let carouselCnt = carousel.children.length;

let carouselFullWidth = carouselWidth * carouselCnt;
carousel.style.width = `${carouselFullWidth}px`;
carousel.classList.add("flex");

let prevBtn = document.querySelector(".btn-prev");
let nextBtn = document.querySelector(".btn-next");

let currentPointer = 0;
prevBtn.addEventListener("click", function() {
  currentPointer += carouselWidth;
  carousel.style.left = `${currentPointer}px`;
});
nextBtn.addEventListener("click", function() {
  currentPointer -= carouselWidth;
  carousel.style.left = `${currentPointer}px`;
});
