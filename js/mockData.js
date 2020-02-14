import { mock } from "./data.js";

const addElement = element => {
  addNavTitle(element);
  addSlide(element);
};

const addNavTitle = titles => {
  titles.forEach(element => {
    const title = element.nav_title;

    const newLi = document.createElement("li");
    const newBtn = document.createElement("button");
    newBtn.type = "button";
    const newTitle = document.createTextNode(title);

    newLi.appendChild(newBtn);
    newBtn.appendChild(newTitle);

    const current = document.querySelector(".slide-navigation");
    current.appendChild(newLi);
  });
};

const addSlide = slideContents => {
  slideContents.forEach(element => {
    const img = element.slider_img;
    const header = element.content_h2;
    const sentence = element.content_li_1;

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
};

addElement(mock);
