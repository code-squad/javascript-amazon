const generateDescList = descriptions =>
  descriptions
    .map(description => {
      return `<li>${description}</li>`;
    })
    .join("");

const generateCardHtml = ({ title, desc, imgUrl }) =>
  `<div class="card">
  <div class="thumb">
    <img src=".${imgUrl}" alt="card-thumbnail" />
  </div>
  <div class="content">
    <h2>${title}</h2>
    <ul>
      ${generateDescList(desc)}
    </ul>
  </div>
  </div>`;

const createCarouselCard = cardData => {
  const title_h1 = document.getElementById(`title`);
  const cardWrapper_div = document.createElement(`div`);
  const cardSlider_div = document.createElement(`div`);

  cardWrapper_div.classList.add(`card-wrapper`);
  cardSlider_div.classList.add(`card-slider`);

  cardWrapper_div.appendChild(cardSlider_div);

  let carouselCard = cardData.map(card => generateCardHtml(card)).join("");

  cardSlider_div.innerHTML = carouselCard;
  title_h1.insertAdjacentElement(`afterend`, cardWrapper_div);
};

const renderCard = () => {
  fetch("../data/localData.json")
    .then(response => {
      return response.json();
    })
    .then(cardData => {
      createCarouselCard(cardData);
    })
    .catch(err => console.log(err));
};

document.addEventListener(`DOMContentLoaded`, renderCard);


document.addEventListener(`DOMContentLoaded`, () => {
  var data = {  title : "hello",
  content : "lorem dkfief",
  price : 2000
};

html = html.replace("{title}", data.title)
.replace("{content}", data.content)
.replace("{price}", data.price);

console.log(html);
});
