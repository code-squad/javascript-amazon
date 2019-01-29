import { appendOptionHTML, appendSuggestionHTML } from "./template.js";
import { $, $All, network, debounce } from "../util.js"
import { URL } from "../config.js"

class Autocomplete {
    constructor(target, { keywordsContainer, acTime, bDimmer }){
        if(bDimmer) this.dimmer = this.activeDim("#dimmer");
        this.searchEl = $(target);
        this.keywordsContainer = $(keywordsContainer);
        this.acTime = acTime;
        this.init();
    }

    async init() {
        const json = await network.get(`${URL.SERVER}json/options.json`);
        appendOptionHTML($("#select-category"), json);
        this.run();
    }

    run(){
        this.searchEl.addEventListener("input", this.inputEvent.bind(this));
        this.searchEl.addEventListener("blur", this.blurEvent.bind(this))
    }

    inputEvent() {
        if(!this.debouncer) this.debouncer = debounce(this.showKeywords.bind(this), this.acTime);
        this.debouncer();
    }

    blurEvent() {
        this.removeKeywords();
        this.dimmer.off();
    }

    async showKeywords(){
        if(this.searchEl.value === "") {
            this.removeKeywords();
            this.dimmer.off();
            return;
        }
        
        const keywordJson = await network.get(`${URL.ACAPI}${this.searchEl.value}`);
        const acTemplate = await appendSuggestionHTML(this.keywordsContainer, keywordJson);
        const keyEvent = await this.keypressEvent(acTemplate);
        
        if(keyEvent) this.dimmer.on();
        else this.dimmer.off();
    }

    removeKeywords() {
        this.keywordsContainer.innerHTML = null;
    }

    keypressEvent(res) {
        if(!res) return;

        const suggestions = $All(".suggestion-link", this.keywordsContainer);
        const helper = {
            input: this.searchEl,
            findTarget(){
                if(currentId < 0) currentId = suggestions.length - 1;
                if(currentId === suggestions.length) currentId = 0; 
                
                return suggestions[currentId];
            },
            activeHoverEffect(target) {
                target.classList.add("hover");
            },
            removeHoverEffect(target) {
                target.classList.remove("hover");
            },
            changeInput() {
                this.input.value = res[currentId].value;
            }
        }
        const key = {
            arrowUp: 38,
            arrowDown: 40,
            enter: 13
        }
        let currentId = -1;
    
        this.searchEl.addEventListener("keydown", (evt) => {
            if(evt.keyCode === key.arrowUp) {
                const [prevTarget, target] = [helper.findTarget(currentId), helper.findTarget(--currentId)];

                helper.removeHoverEffect(prevTarget);
                helper.activeHoverEffect(target);
                helper.changeInput();
            }
            else if(evt.keyCode === key.arrowDown) {
                const [prevTarget, target] = [helper.findTarget(currentId), helper.findTarget(++currentId)];

                helper.removeHoverEffect(prevTarget);
                helper.activeHoverEffect(target);
                helper.changeInput();
            }
            else if(evt.keyCode === key.enter) {
                const target = helper.findTarget(currentId);
                evt.preventDefault();
                target.click();
            }
        })

        return res;
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
}

export { Autocomplete };