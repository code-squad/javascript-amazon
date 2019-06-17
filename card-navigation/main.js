const init = _ => {
  const carousel = new Carousel(".benefit-content", {
    infinite: true,
    prevBtn: ".arrow-left",
    nextBtn: ".arrow-right",
    stepList: ".benefit-list"
  });
};

window.addEventListener("DOMContentLoaded", _ => init());
