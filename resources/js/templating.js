import { $, $$ } from "./util.js";

window.addEventListener("DOMContentLoaded", () => {
  fetch("../data/localData.json")
    .then(res => res.json())
    .then(data => {
      const carouselItem = data[0];
      const carouselBtn = data[1];
      const carouselCard = data[2];

      const itemData = {
        name: carouselItem.name,
        title: getValuefromData(carouselItem.list, `title`),
        desc: getValuefromData(carouselItem.list, `desc`),
        imgSrc: getValuefromData(carouselItem.list, `imgSrc`),
      };

      const btnData = {
        name: carouselBtn.name,
        id: getValuefromData(carouselBtn.list, `id`),
        imgClass: getValuefromData(carouselBtn.list, `imgClass`),
        text: getValuefromData(carouselBtn.list, `text`),
        href: getValuefromData(carouselBtn.list, `href`),
      };

      const cardData = {
        name: carouselCard.name,
        title: getValuefromData(carouselCard.list, `title`),
        href: getValuefromData(carouselCard.list, `href`),
      };

      templatingHTML({
        size: 4,
        cardClass: `card`,
        sliderClass: `slider`,
        btnClass: `btn`,
      });

      function templatingHTML(option) {
        const wrap = option.wrapperClass || `.wrap`;
        const carouselSize = option.size;
        const cardHTML = renderCard(makeClassName(option.cardClass), cardData, carouselSize);
        const btnHTML = renderBtn(makeClassName(option.btnClass), btnData);
        const sliderHTML = renderSlider(makeClassName(option.sliderClass), itemData, carouselSize, btnHTML);

        $(wrap).innerHTML = cardHTML + sliderHTML;
      }

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

      function renderSlider(className, data, size, btnHTML) {
        let sliderItem = "";
        for (let i = 0; i < size; i++) {
          sliderItem += `<li class="${className.li}"><div class="${className.imgArea}"><img src="${data.imgSrc[i]}"/></div><div class="${className.content}"><h1>${data.title[i]}</h1><p>${data.desc[i]}</p></div></li>`;
        }
        const resultHTML = `<div class="${className.name}"><div class="${className.container}"><ul class="${className.ul}">${sliderItem}</ul></div>${btnHTML}</div>`;
        return resultHTML;
      }

      function renderCard(className, data, size) {
        let cardItem = "";
        for (let i = 0; i < size; i++) {
          cardItem += `<li class="${className.li}"><a href="${data.href[i]}"><span>${data.title[i]}</span></a></li>`;
        }
        const resultHTML = `<div class="${className.container}"><ul class="${className.ul}">${cardItem}</ul></div>`;
        return resultHTML;
      }

      function renderBtn(className, data) {
        let btnItem = "";
        const btnSize = 2;
        for (let i = 0; i < btnSize; i++) {
          btnItem += `<div class="${className.name}-${data.id[i]}"><a href="${data.href[i]}"><i class="${data.imgClass[i]}"><span class="blind">${data.text[i]}</span></i></a></div>`;
        }
        const resultHTML = `<div class="${className.name}">${btnItem}</div>`;
        return resultHTML;
      }
    });
});
