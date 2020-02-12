const test = () => {
  const carousel = document.querySelector(".slider");
  const carouselChildren = carousel.children;

  const buttonPrev = document.querySelector(".prev-btn");
  const buttonNext = document.querySelector(".next-btn");

  let current = 0;
  let total = 4;

  function moveTo() {
    var translate = "translateX(" + -100 * current + "%)";
    for (i = 0; i < carouselChildren.length; i++) {
      carouselChildren[i].style.transform = translate;
    }
  }

  buttonNext.addEventListener("click", function() {
    current++;
    if (current > total - 1) {
      current = 0;
    }
    moveTo();
  });

  buttonPrev.addEventListener("click", function() {
    current--;
    if (current < 0) {
      current = total - 1;
    }
    moveTo();
  });
};

window.addEventListener("DOMContentLoaded", () => {
  test();
});
