import { $, $$ } from "./util.js";

class Templating {
  constructor(data, option) {
    this.carouselItem = data[0];
    this.carouselBtn = data[1];
    this.carouselCard = data[2];

    this.itemData = {
      name: this.carouselItem.name,
      title: this.getValuefromData(this.carouselItem.list, `title`),
      desc: this.getValuefromData(this.carouselItem.list, `desc`),
      imgSrc: this.getValuefromData(this.carouselItem.list, `imgSrc`),
    };

    this.btnData = {
      name: this.carouselBtn.name,
      id: this.getValuefromData(this.carouselBtn.list, `id`),
      imgClass: this.getValuefromData(this.carouselBtn.list, `imgClass`),
      text: this.getValuefromData(this.carouselBtn.list, `text`),
      href: this.getValuefromData(this.carouselBtn.list, `href`),
    };

    this.cardData = {
      name: this.carouselCard.name,
      title: this.getValuefromData(this.carouselCard.list, `title`),
      href: this.getValuefromData(this.carouselCard.list, `href`),
    };

    this.templatingHTML(option);
  }

  templatingHTML(option) {
    const wrap = option.wrapperClassName || `.wrap`;
    const carouselSize = option.size;
    const cardHTML = this.renderCard(this.makeClassName(option.cardClassName), this.cardData, carouselSize);
    const btnHTML = this.renderBtn(this.makeClassName(option.btnClassName), this.btnData);
    const sliderHTML = this.renderSlider(this.makeClassName(option.sliderClassName), this.itemData, carouselSize, btnHTML);

    $(wrap).innerHTML = cardHTML + sliderHTML;
  }

  getValuefromData(obj, str) {
    const newData = [];
    for (let key in obj) {
      newData.push(obj[key][str]);
    }
    return newData;
  }

  makeClassName(str) {
    return new Object({
      name: str,
      container: `${str}-container`,
      ul: `${str}-list`,
      li: `${str}-item`,
      imgArea: `${str}-img-area`,
      content: `${str}-content`,
    });
  }

  renderSlider(className, data, size, btnHTML) {
    function makeCloneSlider() {
      const lastCloneClassName = `last-clone`;
      const firstCloneClassName = `first-clone`;
      return {
        lastClone: `<li class="${className.li}" id="${lastCloneClassName}"><div class="${className.imgArea}"><img src="${data.imgSrc[size - 1]}"/></div><div class="${className.content}"><h1>${
          data.title[size - 1]
        }</h1><p>${data.desc[size - 1]}</p></div></li>`,
        firstClone: `<li class="${className.li}" id="${firstCloneClassName}"><div class="${className.imgArea}"><img src="${data.imgSrc[0]}"/></div><div class="${className.content}"><h1>${data.title[0]}</h1><p>${data.desc[0]}</p></div></li>`,
      };
    }

    let sliderItem = makeCloneSlider().lastClone;
    for (let i = 0; i < size; i++) {
      sliderItem += `<li class="${className.li}"><div class="${className.imgArea}"><img src="${data.imgSrc[i]}"/></div><div class="${className.content}"><h1>${data.title[i]}</h1><p>${data.desc[i]}</p></div></li>`;
    }
    sliderItem += makeCloneSlider().firstClone;
    const resultHTML = `<div class="${className.name}"><div class="${className.container}"><ul class="${className.ul}">${sliderItem}</ul></div>${btnHTML}</div>`;
    return resultHTML;
  }

  renderCard(className, data, size) {
    let cardItem = "";
    for (let i = 0; i < size; i++) {
      cardItem += `<li class="${className.li}"><a href="${data.href[i]}"><span>${data.title[i]}</span></a></li>`;
    }
    const resultHTML = `<div class="${className.container}"><ul class="${className.ul}">${cardItem}</ul></div>`;
    return resultHTML;
  }

  renderBtn(className, data) {
    let btnItem = "";
    const btnSize = 2;
    for (let i = 0; i < btnSize; i++) {
      btnItem += `<div class="${className.name}-${data.id[i]}"><a href="${data.href[i]}"><i class="${data.imgClass[i]}"><span class="blind">${data.text[i]}</span></i></a></div>`;
    }
    const resultHTML = `<div class="${className.name}">${btnItem}</div>`;
    return resultHTML;
  }
}

export { Templating };
