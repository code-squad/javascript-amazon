const dummyData = [
  {
    title: "iphone"
  },
  {
    title: "ipad"
  },
  {
    title: "imac"
  },
  {
    title: "ipod"
  },
  {
    title: "iphoneX"
  },
  {
    title: "iphone6"
  },
  {
    title: "apple watch"
  }
];

import SearchInfoView from "./SearchInfoView.js";

export default class AutoListView extends SearchInfoView {
  constructor({ maxLen, dataUrl, title }) {
    super({ maxLen, title });
  }

  getHighlightParsedText({ text, startIndex, endIndex }) {
    let parsedText = text
      .split("")
      .map((c, index) =>
        index === startIndex
          ? "<span class='highlighted'>" + c
          : index === endIndex
          ? "</span>" + c
          : c
      )
      .join("");
    parsedText = `<span>${parsedText}</span>`;

    return parsedText;
  }

  compareByIndex(a, b) {
    return a.startIndex - b.startIndex;
  }

  getFilteredData(text) {
    let filteredData = dummyData.map(data => data.title);

    filteredData = filteredData
      .filter(data => data.includes(text))
      .map(data => ({
        text: data,
        startIndex: data.indexOf(text),
        endIndex: data.indexOf(text) + text.length
      }))
      .sort(this.compareByIndex)
      .filter((_, index) => index < this.maxLen)
      .map(data => this.getHighlightParsedText(data));

    return filteredData;
  }

  getTemplate(text) {
    const filteredData = this.getFilteredData(text);

    return filteredData.length > 0
      ? this.getListTemplate({
          list: filteredData,
          listClassName: "autocomplete-list"
        })
      : null;
  }
}
