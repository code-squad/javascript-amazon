import Model from "./model.js";
import { $ } from "../../util/util.js";

class SearchList {
    constructor() {
        this.model = new Model(this.onChanges.bind(this));
    }

    setTargetTitle(titles) {
        console.log("titles is ", titles);
        this.model.titles = titles;
    }

    onChanges(titles) {
        const { hitList } = titles;

        const liHTML = hitList && hitList.reduce((htmlTemplates, title) => {
            htmlTemplates += `<li>${title}</li>`
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
            $('.hitlist-wrapper').insertAdjacentHTML("beforeend", "No Results Matched");
            return;
        }

        const text = `<ul>${liHTML}</ul>`;
        $('.hitlist-wrapper').insertAdjacentHTML("beforeend", text);
    }
}

export default SearchList;