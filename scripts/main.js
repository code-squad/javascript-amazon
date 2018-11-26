class StickyNav {
  constructor({ htmlEl, threshold }) {
    this.base = htmlEl;
    this.threshold = threshold;
  }
  displayDetailOnClick() {
    const seeMoreLink = this.base.querySelector(
      ".stickyNav__morePlanBtn .morePlanBtn__link"
    );
    seeMoreLink.addEventListener("click", () => {
      event.preventDefault();

      const detailLayer = this.base.querySelector(".stickyNav__detailLayer");
      const miniBar = this.base.querySelector(".stickyNav__miniBar");

      detailLayer.classList.replace("closed", "opened");
      miniBar.classList.replace("opened", "closed");
      window.removeEventListener("scroll", this.updateVisibility);
    });
  }
  closeDetailOnClick() {
    const detailLayer = this.base.querySelector(".stickyNav__detailLayer");
    const detailLayerCLoseBtns = detailLayer.querySelectorAll(".closeBtn");

    detailLayerCLoseBtns.forEach(el => {
      el.addEventListener("click", () => {
        event.preventDefault();

        detailLayer.classList.replace("opened", "closed");
        window.addEventListener("scroll", this.updateVisibility);
        this.updateVisibility();
      });
    });
  }
  updateVisibility() {
    const miniBar = this.base.querySelector(".stickyNav__miniBar");
    if (window.pageYOffset < this.threshold) {
      miniBar.classList.replace("opened", "closed");
      return;
    }
    miniBar.classList.replace("closed", "opened");
  }
  setBodyHeight() {
    const body = document.querySelector("body");
    const totalHeight = [...body.children].reduce((acc, el) => {
      return acc + el.clientHeight;
    }, 0);
    body.style.height = `${totalHeight - 1}px`; // Reduce 1px to remove white line on page bottom
  }
}

const stickyPlansLayer = new StickyNav({
  htmlEl: document.querySelector(".stickyNav"),
  threshold:
    document.querySelector(".masthead").clientHeight +
    document.querySelector(".header").clientHeight
});

window.addEventListener("DOMContentLoaded", () => {
  stickyPlansLayer.displayDetailOnClick();
  stickyPlansLayer.closeDetailOnClick();
});
window.addEventListener("load", () => {
  stickyPlansLayer.setBodyHeight(); //Extend body height to make position:sticky work properly
  window.addEventListener("scroll", () => {
    // Display sticky bar on scroll
    stickyPlansLayer.updateVisibility();
  });
});
