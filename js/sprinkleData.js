import { mockData } from "./mockData.js";

class SprinkleData {
  constructor() {
    this.render();
  }

  render() {
    this.addNavTitle();
    this.addSlide();
    this.addDummySlide();
  }

  addNavTitle() {
    mockData.forEach(element => {
      const title = element.title;

      const newLi = document.createElement("li");
      const newBtn = document.createElement("button");
      newBtn.type = "button";
      const newTitle = document.createTextNode(title);

      newLi.appendChild(newBtn);
      newBtn.appendChild(newTitle);

      const current = document.querySelector(".slide-navigation");
      current.appendChild(newLi);
    });
  }

  addSlide() {
    mockData.forEach(element => {
      const img = element.image;
      const header = element.header;
      const sentence = element.contents;

      const current = document.querySelector(".slider");

      const newLi = document.createElement("li");
      const newImgWrap = document.createElement("div");
      newImgWrap.className = "img-wrap";

      const newImg = document.createElement("img");
      newImg.setAttribute("src", img);

      const newContentsWrap = document.createElement("div");
      newContentsWrap.className = "contents-wrap";

      const newHeader = document.createElement("h2");
      const newTitle = document.createTextNode(header);

      const sentenceUl = document.createElement("ul");
      const sentenceLi = document.createElement("li");
      const newSentence = document.createTextNode(sentence);

      newLi.appendChild(newImgWrap);
      newImgWrap.appendChild(newImg);

      newContentsWrap.appendChild(newHeader);
      newHeader.appendChild(newTitle);

      current.appendChild(newLi);
      newLi.appendChild(newContentsWrap);

      sentenceUl.appendChild(sentenceLi);
      sentenceLi.appendChild(newSentence);

      newContentsWrap.appendChild(sentenceUl);
    });
  }

  addDummySlide() {
    const slides = document.querySelector(".slider");

    let firstChild = slides.firstElementChild;
    let lastChild = slides.lastElementChild;

    let clonedFirst = firstChild.cloneNode(true);
    let clonedLast = lastChild.cloneNode(true);

    clonedFirst.className = "firstClone";
    clonedLast.className = "lastClone";

    slides.appendChild(clonedFirst);
    slides.insertBefore(clonedLast, slides.firstElementChild);
  }
}

const sprinkleData = new SprinkleData();
