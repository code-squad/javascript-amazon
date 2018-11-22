window.addEventListener("scroll", () => {
  const mastheadHeight = document.querySelector(".masthead").clientHeight;
  const headerHeight = document.querySelector(".header").clientHeight;
  const miniBar = document.querySelector(".stickyNav__miniBar");
  if (window.pageYOffset < mastheadHeight + headerHeight) {
    miniBar.style.height = "0";
    return;
  }

  miniBar.style.height = "6rem";
});

const seeMoreLink = document.querySelector(".stickyNav__morePlanBtn a");
seeMoreLink.addEventListener("click", () => {
  const detailLayer = document.querySelector(".stickyNav__detailLayer");
  const miniBar = document.querySelector(".stickyNav__miniBar");

  detailLayer.style.height = "57rem";
  miniBar.style.height = "0";

  event.preventDefault();
});

const detailLayerCLoseBtnsArr = [
  document.querySelector(".detailLayer__topRightClose a"),
  document.querySelector(".detailLayer__bottomClose a")
];

detailLayerCLoseBtnsArr.forEach(el => {
  el.addEventListener("click", () => {
    const detailLayer = document.querySelector(".stickyNav__detailLayer");
    const miniBar = document.querySelector(".stickyNav__miniBar");
    const mastheadHeight = document.querySelector(".masthead").clientHeight;
    const headerHeight = document.querySelector(".header").clientHeight;

    detailLayer.style.height = "0rem";
    miniBar.style.height = "0";

    if (window.pageYOffset < mastheadHeight + headerHeight) {
      miniBar.style.height = "0";
      return;
    }
    miniBar.style.height = "6rem";

    event.preventDefault();
  });
});
