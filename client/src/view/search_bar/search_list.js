import Model from "./model.js";
import { $ } from "../../util/util.js";
import { SCROLL_TOP_START } from "../../util/constants.js";

class SearchList {
    constructor() {
        this.model = new Model(this.onInput.bind(this));
        this.targetString = "";
    }

    setTargetTitle(targetString, titles) {
        this.targetString = targetString;
        this.model.titles = titles;
    }

    onInput(titles) {
        const { hitList } = titles;
        const targetLength = this.targetString.length;

        const liHTML = hitList && hitList.reduce((htmlTemplates, title) => {
            htmlTemplates += `<li class="search-list-word"><span class="target-word">${title.substring(0, targetLength)}</span><span class="rest-word">${title.substring(targetLength)}</span></li>`
            return htmlTemplates;
        }, "");
        this.render(liHTML);
    }

    initializeHTML() {
        $('.hitlist-wrapper').style.display = "block";
        $('.hitlist-wrapper').innerHTML = "";
        $('.hitlist-wrapper').scrollTop = SCROLL_TOP_START;
    }

    render(liHTML) {
        this.initializeHTML();

        if (!liHTML) {
            $('.hitlist-wrapper').insertAdjacentHTML("beforeend", `<ul class="search-list-words"><li class="search-list-word">No Results Matched</li></ul>`);
            return;
        }
        const searchListHTML = `<ul class="search-list-words">${liHTML}</ul>`;
        $('.hitlist-wrapper').insertAdjacentHTML("beforeend", searchListHTML);
    }
}

export default SearchList;