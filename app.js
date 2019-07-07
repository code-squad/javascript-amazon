import Jungle from "./Jungle/index.js";
import myFetch from "./MyFetch/index.js";

const jungle = new Jungle();

const makeCardHtml = data => {
  const list = data.map(eachData => eachData.desc);
  let liIndex = 0;

  return `
      ${data.reduce(
        (html, item) => `
        ${html}
      <div class="card">
      <div class="thumb">
        <img src="${item.imgUrl}" alt="card-thumbnail" />
      </div>
      <div class="content">
        <h2>${item.title}</h2>
        <ul>
          <li>${list[liIndex++]}</li>
        </ul>
      </div>
    </div>
      `,
        ``
      )}
      `;
};

const makeCarouselHtml = ({ className, data }) => {
  const cardSlider_div = document.querySelector(className);
  const cardHtml = makeCardHtml(data);

  cardSlider_div.innerHTML = cardHtml;
  sessionStorage.setItem(`cardData`, cardHtml);
};

window.onload = () => {
  const cardSlider1_div = document.querySelector(`.card-slider`);
  const cardSlider2_div = document.querySelector(`.card-slider2`);

  const dataPath = `./data/localData.json`;
  const slider1ParamObj = {
    elClassNameObj: {
      container: ".container",
      slider: ".card-slider",
      nav: ".nav"
    }
  };

  const slider2ParamObj = {
    elClassNameObj: {
      container: ".container2",
      slider: ".card-slider2"
    },
    options: {
      duration: 100,
      animation: "ease-in",
      infinite: false
    }
  };

  const cardDataInSession = sessionStorage.getItem(`cardData`);

  if (!cardDataInSession) {
    cardSlider1_div.innerHTML = cardSlider2_div.innerHTML = cardDataInSession;
    jungle.createCarousel(slider1ParamObj);
    jungle.createCarousel(slider2ParamObj);
  } else {
    myFetch(dataPath)
      .then(data => {
        makeCarouselHtml({ className: ".card-slider", data });
      })
      .then(_ => {
        jungle.createCarousel(slider1ParamObj);
      })
      .catch(err => console.log(err));

    myFetch(dataPath)
      .then(data => {
        makeCarouselHtml({ className: ".card-slider2", data });
      })
      .then(_ => {
        jungle.createCarousel(slider2ParamObj);
      })
      .catch(err => console.log(err));
  }

  jungle.createNavigation({ elClassNameObj: { nav: ".nav2" } });
};
