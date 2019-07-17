import MyEventEmitter from "../../../Grenutil/MyEventEmitter/index.js";

export default class SearchInfoView extends MyEventEmitter {
  constructor({ maxLen, title }) {
    super();
    this.maxLen = maxLen;
    this.title = title;
    this.selectedIndex = -1;
  }

  getListTemplate({ list, listClassName }) {
    if(list.length > this.maxLen) list.length = this.maxLen;

    this.itemLen = list.length;

    const listTemplate = `
      <ul>
        ${list.reduce(
          (html, item, idx) => `
            ${html}
            <li class="${listClassName}" data-idx=${idx}>${item}</li>
          `,
          ``
        )}
        <li class="search-info-title"><span>${this.title}</span></li>
      </ul>
    `;

    return listTemplate;
  }
}
