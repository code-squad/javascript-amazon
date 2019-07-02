import Jungle from "./Jungle/index.js";
import myFetch from "./MyFetch/index.js";

const jungle = new Jungle();

const makeCardHtml = (data) => {
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
}

window.onload = () => {
  myFetch("./data/localData.json")
    .then(data => {
      const cardSlider_div = document.querySelector(".card-slider");
      cardSlider_div.innerHTML = makeCardHtml(data);
    })
    .then(_ => {
      jungle.createCarousel({
        elClassNameObj: {
          container: ".container",
          slider: ".card-slider",
          nav: ".nav"
        }
      });
    })
    .catch(err => console.log(err));

  myFetch("./data/localData.json")
    .then(data => {
      const cardSlider_div = document.querySelector(".card-slider2");
      cardSlider_div.innerHTML = makeCardHtml(data);
    })
    .then(_ => {
      jungle.createCarousel({
        elClassNameObj: {
          container: ".container2",
          slider: ".card-slider2",
        },
        options: {
          duration: 100,
          animation: "ease-in",
          infinite: false
        }
      });
    })
    .catch(err => console.log(err));

  jungle.createNavigation({ elClassNameObj: { nav: ".nav2" } });
};
