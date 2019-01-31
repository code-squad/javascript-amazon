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
        this.searchEl.addEventListener("input", this.inputKeywords.bind(this));
        this.searchEl.addEventListener("blur", this.removeKeywords.bind(this));
        this.addOptionDOM();
    }

    inputKeywords() {
        if(!this.debouncer) this.debouncer = debounce(this.requestSuggestions.bind(this), this.acTime);
        this.debouncer();
    }
    
    async requestSuggestions(){
        if(this.searchEl.value === "") {
            this.removeKeywords();
            return;
        }
        
        const suggestionJson = await network.get(`${URL.ACAPI}${this.searchEl.value}`);
        const suggestionTemplate = createSuggestionTemplate(suggestionJson);
        
        if(suggestionTemplate) this.showKeywords(suggestionTemplate);
        else this.removeKeywords();
    }

    showKeywords(template) {
        appendTemplate(this.keywordsContainer, template);
        this.pressKey = this.setKeyEvent();
        this.searchEl.addEventListener("keydown", this.pressKey);
        if(this.dimmer) this.dimmer.on();
    }

    removeKeywords() {
        this.keywordsContainer.innerHTML = null;
        this.searchEl.removeEventListener("keydown", this.pressKey);
        if(this.dimmer) this.dimmer.off();
    }


    setKeyEvent() {
        const suggestions = $All(".suggestion-link");
        const key = {
            arrowUp: 38,
            arrowDown: 40,
            enter: 13
        }
        const findTarget = (id) => {
            if(id < 0) currentId = suggestions.length - 1;
            if(id >= suggestions.length) currentId = 0; 
            return suggestions[currentId];
        }
        let currentId = -1;
        
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