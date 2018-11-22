function setBodyHeight() {
  const body = document.querySelector("body");
  const main = document.querySelector("main");
  body.style.height = `${body.clientHeight + main.clientHeight - 1}px`; // Reduce 1px to remove white line on page bottom
}
class PrimeDetailLayer {
  static displayOnClick() {
    const stickyBar = document.querySelector(".stickyNav");
    const seeMoreLink = stickyBar.querySelector(
      ".stickyNav__morePlanBtn .morePlanBtn__link"
    );
    seeMoreLink.addEventListener("click", () => {
      const detailLayer = stickyBar.querySelector(".stickyNav__detailLayer");
      const miniBar = stickyBar.querySelector(".stickyNav__miniBar");

      detailLayer.classList.replace("closed", "opened");
      miniBar.classList.replace("opened", "closed");
      window.removeEventListener("scroll", StickyBar.updateVisibility);

      event.preventDefault();
    });
  }
  static closeOnClick() {
    const detailLayer = document.querySelector(".stickyNav__detailLayer");
    const detailLayerCLoseBtns = detailLayer.querySelectorAll(".closeBtn");

    detailLayerCLoseBtns.forEach(el => {
      el.addEventListener("click", () => {
        detailLayer.classList.replace("opened", "closed");
        window.addEventListener("scroll", StickyBar.updateVisibility);
        StickyBar.updateVisibility();

        event.preventDefault();
      });
    });
  }
}
class StickyBar {
  static updateVisibility() {
    const mastheadHeight = document.querySelector(".masthead").clientHeight;
    const headerHeight = document.querySelector(".header").clientHeight;
    const miniBar = document.querySelector(".stickyNav__miniBar");
    if (window.pageYOffset < mastheadHeight + headerHeight) {
      miniBar.classList.replace("opened", "closed");
      return;
    }
    miniBar.classList.replace("closed", "opened");
  }
}

window.addEventListener("load", () => {
  setBodyHeight(); //Extend body height after page load to fix position:sticky above position:absolute main element
  PrimeDetailLayer.displayOnClick();
  PrimeDetailLayer.closeOnClick();
});

/* Display sticky bar on scroll */
window.addEventListener("scroll", StickyBar.updateVisibility);
