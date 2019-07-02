import Jungle from "./Jungle/index.js";
import myFetch from "./MyFetch/index.js";

const jungle = new Jungle();

const makeCardHtml = data => {
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
          ${item.desc.reduce(
            (html, item) => `
            ${html}
            <li>${item}</li>
          `,
            ``
          )}
        </ul>
      </div>
    </div>
      `,
        ``
      )}
      `;
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

  if (cardDataInSession) {
    cardSlider1_div.innerHTML = cardDataInSession;
    jungle.createCarousel(slider1ParamObj);

    cardSlider2_div.innerHTML = cardDataInSession;
    jungle.createCarousel(slider2ParamObj);

  } else {
    myFetch(dataPath)
      .then(data => {
        const cardSlider1_div = document.querySelector(".card-slider");
        const cardHtml = makeCardHtml(data);

        cardSlider1_div.innerHTML = cardHtml;
        sessionStorage.setItem(`cardData`, cardHtml);
      })
      .then(_ => {
        jungle.createCarousel(slider1ParamObj);
      })
      .catch(err => console.log(err));

    myFetch(dataPath)
      .then(data => {
        const cardSlider2_div = document.querySelector(".card-slider2");
        const cardHtml = makeCardHtml(data);

        cardSlider2_div.innerHTML = cardHtml;
        sessionStorage.setItem(`cardData`, cardHtml);
      })
      .then(_ => {
        jungle.createCarousel(slider2ParamObj);
      })
      .catch(err => console.log(err));
  }

  jungle.createNavigation({ elClassNameObj: { nav: ".nav2" } });
};
