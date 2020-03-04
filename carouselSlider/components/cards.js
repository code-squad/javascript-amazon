import { $querySelector, $addListener } from "../util.js";

export default class Cards {
  constructor(data, width) {
    this.name = "cards";
    this.data = data;
    this.cardWidth = width;
    this.slideAnimMediator = null;
    this.elements = null;
  }

  render() {
    const { data, cardWidth } = this;
    data.push(data[0]);
    data.unshift(data[data.length - 2]);
    const cards = data.reduce((cards, { title, desc, imgURL }, i) => {
      const lastIdx = data.length - 1;
      cards += `<li class="card ${
        i === 0 ? "first" : i === lastIdx ? "last" : ""
      }" style="background: url(${imgURL}) 80% -80%;"><div class="card-description"><h4>${title}</h4><p>${desc}</p></div></li>`;
      return cards;
    }, "");
    return (
      '<div class="card-wrapper"><div class="card-list" style="transform: translateX(-' +
      `${cardWidth}` +
      `px);">${cards}</div></div>`
    );
  }

  move(index) {
    const { elements: cardList, cardWidth } = this;
    cardList.style.transform = "translateX(" + `${-cardWidth * index}` + "px)";
  }

  onTransitionEndHandler(index) {
    this.elements = $querySelector(".card-list");
    const { slideAnimMediator, elements: cardList } = this;
    const cards = cardList.children;
    const that = this;
    $addListener(cardList, "transitionend", () => {
      if (cards[index].classList.contains("first")) {
        cardList.style.transition = "none";
        index = cards.length - 2;
        that.move(index);
        slideAnimMediator.updateCardIndex(index);
      } else if (cards[index].classList.contains("last")) {
        cardList.style.transition = "none";
        index = 1;
        that.move(index);
        slideAnimMediator.updateCardIndex(index);
      }
    });
    cardList.style.transition = "transform .5s ease-in-out";
  }
}
