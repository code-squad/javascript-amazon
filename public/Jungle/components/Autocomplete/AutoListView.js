import SearchInfoView from "./SearchInfoView.js";
import MyFetch from "../../../Grenutil/MyFetch/index.js";
import config from "./config.js";

export default class AutoListView extends SearchInfoView {
  constructor({ maxLen, dataUrl, title }) {
    super({ maxLen, title });

    this.noSuggestionData = ["<span>추천 검색어가 없습니다.</span>"];
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
    parsedText = `<span class="info-text">${parsedText}</span>`;

    return parsedText;
  }

  compareByIndex(a, b) {
    return a.startIndex - b.startIndex;
  }

  getSortedData({ suggestionData, text }) {
    return suggestionData
      .filter(data => data.includes(text))
      .map(data => ({
        text: data,
        startIndex: data.indexOf(text),
        endIndex: data.indexOf(text) + text.length
      }))
      .sort(this.compareByIndex)
      .filter((_, index) => index < this.maxLen)
      .map(data => this.getHighlightParsedText(data));
  }

  async getFilteredData(text) {
    let suggestionData;

    try {
      suggestionData = (await MyFetch(
        `${config.localApiUrl}?text=${text}`
      )).filter(v => v.prefix === text)[0].suggestions;
      suggestionData = this.getSortedData({ suggestionData, text });
    } catch (error) {
      suggestionData = this.noSuggestionData;
    }
    return suggestionData;
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
