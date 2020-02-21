window.addEventListener('DOMContentLoaded', () => {
  const carousel = new Slide();
  const card = new Card();

  $$._pageNavi.forEach((element, idx) => {
    element.addEventListener('click', () => {
      card.setScale();
      card.AddActiveLiClass(idx);
      carousel.cardClickRender(idx);
    });
  });

  if(localStorage.getItem("myJson")) {
    carousel.render();
    carousel.setUp();
    carousel.setSlideHandler();
    carousel.cardOn(card);

  }else {
    fetch('./localData.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      localStorage.setItem("myJson", JSON.stringify(myJson));
      carousel.render();
      carousel.setUp();
      carousel.setSlideHandler();
      carousel.setCard(card);
    });
  }
});
