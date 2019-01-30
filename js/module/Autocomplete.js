import { $, $All, network, debounce } from "../util.js"
import { createOptionTemplate, createSuggestionTemplate, appendTemplate } from "./template.js";
import { URL } from "../config.js"

class Autocomplete {
    constructor(target, { keywordsContainer, acTime, bDimmer }){
        if(bDimmer) this.dimmer = this.activeDim("#dimmer");
        this.searchEl = $(target);
        this.keywordsContainer = $(keywordsContainer);
        this.acTime = acTime;
        this.init();
    }

    init() {
        this.addOptionDOM();
        this.searchEl.addEventListener("input", this.inputKeywords.bind(this));
        this.searchEl.addEventListener("blur", this.removeKeywords.bind(this));
    }

    inputKeywords() {
        if(!this.debouncer) this.debouncer = debounce(this.showKeywords.bind(this), this.acTime);
        this.debouncer();
    }

    removeKeywords() {
        this.keywordsContainer.innerHTML = null;
        if(this.dimmer) this.dimmer.off();
    }

    async showKeywords(){
        if(this.searchEl.value === "") {
            this.removeKeywords();
            return;
        }
        
        const res = await network.get(`${URL.ACAPI}${this.searchEl.value}`);
        const suggestionTemplate = createSuggestionTemplate(res);
        
        if(suggestionTemplate) {
            appendTemplate(this.keywordsContainer, suggestionTemplate);
            this.searchEl.addEventListener("keydown", this.pressKey());
            this.dimmer.on();
        }
        else {
            this.removeKeywords();
        }
    }

    pressKey() {
        const suggestions = $All(".suggestion-link");
        
        if(!suggestions) return ;
        
        const key = {
            arrowUp: 38,
            arrowDown: 40,
            enter: 13
        }
        let currentId = -1;

        function findTarget(id) {
            if(id < 0) currentId = suggestions.length - 1;
            if(id >= suggestions.length) currentId = 0; 
                
            return suggestions[currentId];
        }

        return evt => {
            if(evt.keyCode === key.arrowUp) {
                const [prevTarget, target] = [findTarget(currentId), findTarget(--currentId)];

                prevTarget.classList.remove("hover");
                target.classList.add("hover");
                this.searchEl.value = suggestions[currentId].innerText;
            }
            else if(evt.keyCode === key.arrowDown) {
                const [prevTarget, target] = [findTarget(currentId), findTarget(++currentId)];

                prevTarget.classList.remove("hover");
                target.classList.add("hover");
                this.searchEl.value = suggestions[currentId].innerText;
            }
            else if(evt.keyCode === key.enter) {
                const target = findTarget(currentId);
                evt.preventDefault();
                target.click();
            }
        }
    }

    activeDim(bindTo) {
        const targetEl = $(bindTo);
        return {
            on() {
                targetEl.classList.add("show");
            },
            off() {
                targetEl.classList.remove("show");
            }
        }
    }

    async addOptionDOM() {
        const jsonData = await network.get(`${URL.SERVER}json/options.json`);
        const optionTemplate = createOptionTemplate(jsonData);

        appendTemplate($("#select-category"), optionTemplate);
    }
}

export { Autocomplete };