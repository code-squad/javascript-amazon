/**
 * name: noDataProc
 * parameters: strings, imgUrl, title, desc
 * desc: 데이터가 없을 때, 자연스럽게 표현해주도록 처리.
 */
const noDataProc = (strings, ...values) => {
  let newStrings = strings
    .map((string, index, arr) => {
      values[index] =
        !values[index] && index !== arr.length - 1
          ? `해당 데이터를 가져올 수 없습니다.`
          : values[index];
      return values[index] ? string + values[index] : string;
    })
    .join("");

  return newStrings;
};

const generateDescList = descriptions =>
  descriptions
    .map(description => {
      return `<li>${description}</li>`;
    })
    .join(``);

const generateCardHtml = ({ title, desc, imgUrl }) =>
  noDataProc`<div class="card">
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