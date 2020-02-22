export default class Cards {
  constructor(data, width) {
    this.name = "cards";
    this.data = data;
    this.cardWidth = width;
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
}
