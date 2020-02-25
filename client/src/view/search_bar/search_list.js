import Model from "./model.js";
import { $ } from "../../util/util.js";

class SearchList {
    constructor() {
        this.model = new Model(this.onChanges.bind(this));
        this.targetString = "";
    }

    setTargetTitle(targetString, titles) {
        this.targetString = targetString;
        this.model.titles = titles;
    }

    onChanges(titles) {
        const { hitList } = titles;
        const targetLength = this.targetString.length;

        const liHTML = hitList && hitList.reduce((htmlTemplates, title) => {
            htmlTemplates += `<li><span class="target-word">${title.substring(0, targetLength)}</span><span>${title.substring(targetLength)}</span></li>`
            return htmlTemplates;
        }, "");

        this.render(liHTML);
    }

    initializeHTML() {
        $('.hitlist-wrapper').style.display = "block";
        $('.hitlist-wrapper').innerHTML = "";
    }

    render(liHTML) {
        this.initializeHTML();

        if (!liHTML) {
            $('.hitlist-wrapper').insertAdjacentHTML("beforeend", "<ul><li>No Results Matched</li></ul>");
            return;
        }

        const text = `<ul>${liHTML}</ul>`;
        $('.hitlist-wrapper').insertAdjacentHTML("beforeend", text);
    }
}

export default SearchList;