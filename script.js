let carousel = document.querySelector(".carousel");
let carouselWidth = carousel.offsetWidth;
let carouselCnt = carousel.children.length;

let carouselFullWidth = carouselWidth * carouselCnt;
carousel.style.width = `${carouselFullWidth}px`;
carousel.classList.add("flex");

for (let i = 0; i < carouselCnt; i += 1) {
  carousel.children[i].setAttribute("data-index", i + 1);
}

let firstItem = carousel.children[0];
let lastItem = carousel.children[carouselCnt - 1];

let firstCloneItem = firstItem.cloneNode(true);
let lastCloneItem = lastItem.cloneNode(true);

carousel.prepend(lastCloneItem);
carousel.appendChild(firstCloneItem);

firstCloneItem.classList.add("clone");
lastCloneItem.classList.add("clone");

carouselCnt = carousel.children.length;
carouselFullWidth = carouselWidth * carouselCnt;
carousel.style.width = `${carouselFullWidth}px`;

carousel.style.left = `-${carouselWidth}px`;

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
