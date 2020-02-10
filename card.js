class Card {
  constructor(cardData) {
    this.cardData = cardData;
  }

  render() {
    const lists = this.cardData.reduce((newList, data) => {
      const { content } = data;
      const result = content.reduce((listString, content) => {
        listString += `<li>${content}</li>`;
        return listString;
      }, "");
      newList.push({ ...data, content: result });
      return newList;
    }, []);

    const cards = lists.reduce(
      (result, data) =>
        (result += `<li><div><img src=${data.imgSrc}></div><h4>${data.title}</h4><ul>${data.content}</ul><div></div></li>`),
      ""
    );
    return `<ul>${cards}</ul>`;
  }
}
