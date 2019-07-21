import SearchInfoView from "./SearchInfoView.js";
import MyFetch from "../../../Grenutil/MyFetch/index.js";

export default class AutoListView extends SearchInfoView {
  constructor({ maxLen, dataUrl, title }) {
    super({ maxLen, title });

    this.noSuggestionData = ["<span>자동 추천 검색어가 없습니다.</span>"];
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

  async getFilteredData(text) {
    let filteredData;
    try {
      await MyFetch(
        `https://h3rb9c0ugl.execute-api.ap-northeast-2.amazonaws.com/develop/amazon_autocomplete?query=${text}`
      )
        .then(data => data.body.suggestions)
        .then(data => (filteredData = data.map(v => v.value)));

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
    } catch (error) {
      filteredData = this.noSuggestionData;
    }

    return filteredData;
  }

  async getTemplate(text) {
    const filteredData = await this.getFilteredData(text);

    return filteredData.length > 0
      ? this.getListTemplate({
          list: filteredData,
          listClassName: "autocomplete-list"
        })
      : null;
  }
}
