window.addEventListener("load", () => {
  const body = document.querySelector("body");
  const main = document.querySelector("main");
  body.style.height = `${body.clientHeight + main.clientHeight - 1}px`;
});

/* =============== */
const stick = function() {
  const mastheadHeight = document.querySelector(".masthead").clientHeight;
  const headerHeight = document.querySelector(".header").clientHeight;
  const miniBar = document.querySelector(".stickyNav__miniBar");
  if (window.pageYOffset < mastheadHeight + headerHeight) {
    miniBar.style.height = "0";
    return;
  }
  miniBar.style.height = "6rem";
};
window.addEventListener("scroll", stick);

/* =============== */
const seeMoreLink = document.querySelector(".stickyNav__morePlanBtn a");
seeMoreLink.addEventListener("click", () => {
  const detailLayer = document.querySelector(".stickyNav__detailLayer");
  const miniBar = document.querySelector(".stickyNav__miniBar");

  detailLayer.style.height = "57rem";
  miniBar.style.height = "0";
  window.removeEventListener("scroll", stick);

  event.preventDefault();
});

/* =============== */
const detailLayerCLoseBtnsArr = [
  document.querySelector(".detailLayer__topRightClose a"),
  document.querySelector(".detailLayer__bottomClose a")
];

detailLayerCLoseBtnsArr.forEach(el => {
  el.addEventListener("click", () => {
    const detailLayer = document.querySelector(".stickyNav__detailLayer");
    const miniBar = document.querySelector(".stickyNav__miniBar");

    detailLayer.style.height = "0rem";
    miniBar.style.height = "0";
    window.addEventListener("scroll", stick);
    stick();

    event.preventDefault();
  });
});
