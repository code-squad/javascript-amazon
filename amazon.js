let logoArrow = document.querySelector(".logo-arrow");
let closeArrow = document.querySelector(".arrow-img");
const planCard = document.querySelector(".plan-card");
const closeBtn = document.querySelector(".close");

logoArrow.addEventListener("click",function(e) {
  planCard.classList.add("plan-card-open");
});

closeBtn.addEventListener("click", function(){
  planCard.classList.remove("plan-card-open");
});

closeArrow.addEventListener("click", function() {
  planCard.classList.remove("plan-card-open");
});

window.addEventListener('scroll', function(e) {
  console.log(e.target)
  var el = document.querySelector('.nav-plan-bar');
  if(window.scrollY >= 100) el.classList.add('shown');
  else el.classList.remove('shown');
});