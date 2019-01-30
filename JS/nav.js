class NavElements {
  constructor() {
    this.plan = document.querySelector(".plan");
    this.morePage = document.querySelector(".plan-more-contents");
    this.planCnt = document.querySelector(".plan-contents");
    this.moreCntBtn = document.querySelector(".more-contents-closebtn");
    this.moreCntArrow = document.querySelector(".more-contents-arrow-img");
    this.morePlanBtn = document.querySelector(".plan-contents-txt");
    this.navPosition = 112;
    this.primBtnPosition = 465;
  }
  removeClassList(el, className) {
    el.classList.remove(className);
  }
  removeClass() {
    this.removeClassList(this.plan, "plan-more-click");
    this.removeClassList(this.morePage, "plan-more-click");
    this.removeClassList(this.planCnt, "plan-contents-downsize");
  }
  addMorePlanDownSizeEvent() {
    this.moreCntBtn.addEventListener("click", this.removeClass.bind(this));
    this.moreCntArrow.addEventListener("click", this.removeClass.bind(this));
  }
  addScrollEvent() {
    window.addEventListener("scroll", this.scrollHandler.bind(this));
  }
  scrollHandler() {
    const planClassList = this.plan.classList;
    if (pageYOffset > this.navPosition) planClassList.add("plan-scroll-middle");
    else planClassList.remove("plan-scroll-middle");
    if (pageYOffset > this.primBtnPosition) planClassList.add("plan-scroll-bottom");
    else planClassList.remove("plan-scroll-bottom");
  }
  addMoreClickEvent() {
    this.morePlanBtn.addEventListener("click", this.addClass.bind(this));
  }
  addClass() {
    this.plan.classList.add("plan-more-click");
    this.morePage.classList.add("plan-more-click");
    this.planCnt.classList.add("plan-contents-downsize");
  }
}

const navElement = new NavElements();
navElement.addScrollEvent();
navElement.addMoreClickEvent();
navElement.addMorePlanDownSizeEvent();