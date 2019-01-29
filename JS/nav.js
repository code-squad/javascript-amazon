class Nav_Elements {
  constructor() {
    this.planPage = document.querySelector(".planpage");
    this.morePage = document.querySelector(".planpage-more-contents");
    this.planPageCnt = document.querySelector(".planpage-contents");
    this.moreCntBtn = document.querySelector(".more-contents-closebtn");
    this.moreCntArrow = document.querySelector(".more-contents-arrow-img");
    this.morePlanBtn = document.querySelector(".planpage-contents-txt");
    this.navPosition = 112;
    this.primBtnPosition = 465;
  }
  removeClassList(el, className) {
    el.classList.remove(className);
  }
  removeClass() {
    this.removeClassList(this.planPage, "planpage-more-click");
    this.removeClassList(this.morePage, "planpage-more-click");
    this.removeClassList(this.planPageCnt, "planpage-contents-downsize");
  }
  addMorePlanDownSizeEvent() {
    this.moreCntBtn.addEventListener("click", this.removeClass.bind(this));
    this.moreCntArrow.addEventListener("click", this.removeClass.bind(this));
  }
  addScrollEvent() {
    window.addEventListener("scroll", this.scrollHandler.bind(this));
  }
  scrollHandler() {
    const planClassList = this.planPage.classList;
    if (pageYOffset > this.navPosition) planClassList.add("planpage-scroll-middle");
    else planClassList.remove("planpage-scroll-middle");
    if (pageYOffset > this.primBtnPosition) planClassList.add("planpage-scroll-bottom");
    else planClassList.remove("planpage-scroll-bottom");
  }
  addMoreClickEvent() {
    this.morePlanBtn.addEventListener("click", this.addClass.bind(this));
  }
  addClass() {
    this.planPage.classList.add("planpage-more-click");
    this.morePage.classList.add("planpage-more-click");
    this.planPageCnt.classList.add("planpage-contents-downsize");
  }
}

const NavElements = new Nav_Elements();
NavElements.addScrollEvent();
NavElements.addMoreClickEvent();
NavElements.addMorePlanDownSizeEvent();