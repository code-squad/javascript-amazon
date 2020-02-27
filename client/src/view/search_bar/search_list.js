import Model from "./model.js";
import { $ } from "../../util/util.js";
import { SCROLL, CSS_CLASS } from "../../util/constants.js";

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
            htmlTemplates += `<li class="${CSS_CLASS.SEARCH_LIST_LI}"><span class="${CSS_CLASS.SEARCH_LIST_TARGET_WORD}">${title.substring(0, targetLength)}</span><span class="${CSS_CLASS.SEARCH_LIST_REST_WORD}">${title.substring(targetLength)}</span></li>`
            return htmlTemplates;
        }, "");
        this.render(liHTML);
    }

    initializeHTML() {
        $('.hitlist-wrapper').show().html('').setScrollTop(SCROLL.TOP_START);
    }

    render(liHTML) {
        this.initializeHTML();

        if (!liHTML) {
            $('.hitlist-wrapper').insertAdjacentHTML("beforeend", `<ul class="${CSS_CLASS.SEARCH_LIST_UL}"><li class="${CSS_CLASS.SEARCH_LIST_LI}">No Results Matched</li></ul>`);
            return;
        }
        const searchListHTML = `<ul class="${CSS_CLASS.SEARCH_LIST_UL}">${liHTML}</ul>`;
        $('.hitlist-wrapper').insertAdjacentHTML("beforeend", searchListHTML);
    }
}

export default SearchList;