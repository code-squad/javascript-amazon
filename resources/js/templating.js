import { $, $$ } from "./util.js";

window.addEventListener("DOMContentLoaded", () => {
  fetch("../data/localData.json")
    .then(res => res.json())
    .then(data => {
      const carouselItem = data[0];
      const carouselBtn = data[1];
      const carouselCard = data[2];

      const item = {
        name: carouselItem.name,
        title: getValuefromData(carouselItem.list, `title`),
        desc: getValuefromData(carouselItem.list, `desc`),
        imgSrc: getValuefromData(carouselItem.list, `imgSrc`),
      };

      function getValuefromData(obj, str) {
        const newData = [];
        for (let key in obj) {
          newData.push(obj[key][str]);
        }
        return newData;
      }

      function makeClassName(str) {
        return new Object({
          name: str,
          container: `${str}-container`,
          ul: `${str}-list`,
          li: `${str}-item`,
          imgArea: `${str}-img-area`,
          content: `${str}-content`,
        });
      }

      console.log(renderSlider(makeClassName("slider"), item, 4));

      function renderSlider(className, data, size) {
        let cardItem = "";
        for (let i = 0; i < size; i++) {
          cardItem += `<li class="${className.li}"><div class="${className.imgArea}"><img src="${data.imgSrc[i]}"/></div><div class="${className.content}"><h1>${data.title[i]}</h1><p>${data.desc[i]}</p></div></li>`;
        }
        let resultHTML = `<div class="${className.name}><div class="${className.container}"><ul class="${className.ul}">${cardItem}</ul></div></div>`;
        return resultHTML;
      }
    });
});
