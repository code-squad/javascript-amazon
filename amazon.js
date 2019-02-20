class PlanBarScrollEvent {
  constructor(planBar) {
    this.planBar = planBar;
  }

  showPlanBar() {
    window.addEventListener('scroll', function () {
      if (window.scrollY >= 100) this.planBar.classList.add('shown');
      else this.planBar.classList.remove('shown');
    }.bind(this));
  }
}

class PlanCardClickEvent {
  constructor(planCard, logoArrow, closeBtn, closeArrow) {
    this.planCard = planCard;
    this.logoArrow = logoArrow;
    this.closeBtn = closeBtn;
    this.closeArrow = closeArrow;
  }

  openPlanCard() {
    this.logoArrow.addEventListener("click", function () {
      this.planCard.classList.add("plan-card-open");
    }.bind(this));
  }

  closePlanCard() {
    this.closeBtn.addEventListener("click", function () {
      this.planCard.classList.remove("plan-card-open");
    }.bind(this));

    this.closeArrow.addEventListener("click", function () {
      this.planCard.classList.remove("plan-card-open");
    }.bind(this));
  }
}

const planBar = document.querySelector('.nav-plan-bar')
const planCard = document.querySelector(".plan-card");
const logoArrow = document.querySelector(".logo-arrow");
const closeBtn = document.querySelector(".close");
const closeArrow = document.querySelector(".arrow-img");

const planBarScrollEvent = new PlanBarScrollEvent(planBar);
const planCardClickEvent = new PlanCardClickEvent(planCard, logoArrow, closeBtn, closeArrow);


document.addEventListener("DOMContentLoaded", () => {
  planBarScrollEvent.showPlanBar();
  planCardClickEvent.openPlanCard();
  planCardClickEvent.closePlanCard();
  console.log("loaded!!");
});



