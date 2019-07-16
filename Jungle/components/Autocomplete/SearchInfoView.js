import MyEventEmitter from "../../../Grenutil/MyEventEmitter/index.js";

export default class SearchInfoView extends MyEventEmitter {
  constructor({ maxLen, title }) {
    super();
    this.maxLen = maxLen;
    this.title = title;
  }

  getListTemplate({ list, listClassName }) {
    const listTemplate = `
      <ul>
        ${list.reduce(
          (html, item, idx) => `
            ${html}
            <li class="${listClassName}" data-idx=${idx}><span>${item}</span></li>
          `,
          ``
        )}
        <li class="search-info-title"><span>${this.title}</span></li>
      </ul>
    `;

    return listTemplate;
  }
}
