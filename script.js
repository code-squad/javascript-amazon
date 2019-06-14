let carousel = document.querySelector(".carousel");
let carouselWidth = carousel.offsetWidth;
let carouselInitCnt = carousel.children.length;

let carouselFullWidth = carouselWidth * carouselInitCnt;
carousel.style.width = `${carouselFullWidth}px`;
carousel.classList.add("flex");

for (let i = 0; i < carouselInitCnt; i += 1) {
  carousel.children[i].setAttribute("data-index", i + 1);
}

let firstItem = carousel.children[0];
let lastItem = carousel.children[carouselInitCnt - 1];

let firstCloneItem = firstItem.cloneNode(true);
let lastCloneItem = lastItem.cloneNode(true);

carousel.prepend(lastCloneItem);
carousel.appendChild(firstCloneItem);
carousel.children[1].classList.add("active");

//carousel.children[1].setAttribute("data-active", true);

firstCloneItem.classList.add("clone");
lastCloneItem.classList.add("clone");

let carouselCnt = carousel.children.length;
carouselFullWidth = carouselWidth * carouselCnt;
carousel.style.width = `${carouselFullWidth}px`;

lastCloneItem.setAttribute("data-index", 0);
firstCloneItem.setAttribute("data-index", carouselCnt - 1);

carousel.style.left = `-${carouselWidth}px`;

let prevBtn = document.querySelector(".btn-prev");
let nextBtn = document.querySelector(".btn-next");

let currentPointer = -carouselWidth;
prevBtn.addEventListener("click", function() {
  let active = document.querySelector(".active");
  let activeIndex = active.getAttribute("data-index");
  carousel.children[Number(activeIndex) - 1].classList.add("active");
  currentPointer += carouselWidth;
  carousel.style.left = `${currentPointer}px`;

  carousel.children[activeIndex].classList.remove("active");
  let newActive = carousel.children[Number(activeIndex) - 1];
  if (newActive.classList.contains("clone")) {
    carousel.style.left = `-${carouselWidth * carouselInitCnt}px`;
    newActive.classList.remove("active");
    carousel.children[carouselInitCnt].classList.add("active");
    currentPointer = -(carouselWidth * carouselInitCnt);
  }
});

nextBtn.addEventListener("click", function() {
  let active = document.querySelector(".active");
  let activeIndex = active.getAttribute("data-index");

  carousel.children[Number(activeIndex) + 1].classList.add("active");

  let newActive = carousel.children[Number(activeIndex) + 1];
  currentPointer -= carouselWidth;
  carousel.style.left = `${currentPointer}px`;

  carousel.children[activeIndex].classList.remove("active");

  if (newActive.classList.contains("clone")) {
    carousel.style.left = `-${carouselWidth}px`;
    newActive.classList.remove("active");
    carousel.children[1].classList.add("active");
    currentPointer = -carouselWidth;
  }
});
