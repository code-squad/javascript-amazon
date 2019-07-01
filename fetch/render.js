const makeCardDiv = cardsArr => {
  return cardsArr.map(cardDate => {
    const div = document.createElement('div');
    div.innerHTML = `
    <h2>${cardDate.title}</h2>
    <p>${cardDate.desc}</p>
    <img src="${cardDate.imgAdress}" alt="">
    `;
    return div;
  });
};

const body = document.querySelector('body');

const carouselURL = 'http://127.0.0.1:5500/fetch/local.json';
fetch(carouselURL)
  .then(response => response.json())
  .then(carouselData => makeCardDiv(carouselData[0].list))
  .then(divs => divs.forEach(div => body.appendChild(div)));
