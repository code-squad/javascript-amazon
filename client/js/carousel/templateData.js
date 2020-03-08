class TemplateData {
  constructor(mockData) {
    this.cardList = mockData.cardList;
    this.init();
  }

  init() {
    this.addNavTitle();
    this.addSlide();
    this.addDummySlide();
  }

  addNavTitle() {
    let navButtons = ``;

    this.cardList.forEach(element => {
      navButtons += `<li><button type="button">${element.title}</button></li>`;
    });

    const slideNav = document.querySelector(".slide-navigation");
    slideNav.innerHTML = navButtons;
  }

  addSlide() {
    let slides = ``;

    this.cardList.forEach(element => {
      const img = element.image;
      const header = element.header;
      const sentence = element.contents;

      slides += `
      <li>
        ${this.addImgWrap(img)}
        ${this.addContentsWrap(header, sentence)}
      </li>`;
    });

    const sliderWrap = document.querySelector(".slider");
    sliderWrap.innerHTML = slides;
  }

  addImgWrap(img) {
    let imgWrap = `
    <div class="img-wrap">
      <img src="${img}">
    </div>`;

    return imgWrap;
  }

  addContentsWrap(header, sentences) {
    let sentenceList = ``;
    sentences.forEach(el => (sentenceList += `<li>${el}</li>`));

    let contentsWrap = `
    <div class="contents-wrap">
      <h2>${header}</h2>
      <ul>
        ${sentenceList}
      </ul>
    </div>`;

    return contentsWrap;
  }

  addDummySlide() {
    const sliderWrap = document.querySelector(".slider");

    let firstChild = sliderWrap.firstElementChild;
    let lastChild = sliderWrap.lastElementChild;

    let clonedFirst = firstChild.cloneNode(true);
    let clonedLast = lastChild.cloneNode(true);

    sliderWrap.appendChild(clonedFirst);
    sliderWrap.insertBefore(clonedLast, sliderWrap.firstElementChild);
  }
}

export { TemplateData };
