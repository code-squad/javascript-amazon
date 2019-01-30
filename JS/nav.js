class NavElements {
  constructor() {
    this.plan = document.querySelector(".plan");
    this.morePage = document.querySelector(".plan-more-contents");
    this.planCnt = document.querySelector(".plan-contents");
    this.navPosition = 112;
    this.primBtnPosition = 465;
  }
  removeClassList(el, className) {
    el.classList.remove(className);
  }
  removeClass() {
    this.removeClassList(this.plan, classMap.click);
    this.removeClassList(this.morePage, classMap.click);
    this.removeClassList(this.planCnt, classMap.donwSize);
  }
  addMorePlanDownSizeEvent() {
    const moreCntBtn = document.querySelector(".more-contents-closebtn");
    const moreCntArrow = document.querySelector(".more-contents-arrow-img");
    moreCntBtn.addEventListener("click", this.removeClass.bind(this));
    moreCntArrow.addEventListener("click", this.removeClass.bind(this));
  }
  addScrollEvent() {
    window.addEventListener("scroll", this.scrollHandler.bind(this));
  }
  scrollHandler() {
    const planClassList = this.plan.classList;
    if (pageYOffset > this.navPosition) planClassList.add(classMap.middleIntrc);
    else planClassList.remove(classMap.middleIntrc);
    if (pageYOffset > this.primBtnPosition)
      planClassList.add(classMap.bottomIntrc);
    else planClassList.remove(classMap.bottomIntrc);
  }
  addMoreClickEvent() {
    const morePlanBtn = document.querySelector(".plan-contents-txt");
    morePlanBtn.addEventListener("click", this.addClass.bind(this));
  }
  addClass() {
    this.plan.classList.add(classMap.click);
    this.morePage.classList.add(classMap.click);
    this.planCnt.classList.add(classMap.donwSize);
  }
}

const classMap = {
  middleIntrc: "plan-scroll-middle",
  bottomIntrc: "plan-scroll-bottom",
  click: "plan-more-click",
  donwSize: "plan-contents-downsize"
};

const navElement = new NavElements();
navElement.addScrollEvent();
navElement.addMoreClickEvent();
navElement.addMorePlanDownSizeEvent();
