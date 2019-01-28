import { template } from "./template.js";
import { $, $All, network, debounce } from "../util.js"
import { URL } from "../config.js"

class Autocomplete {
    constructor(target, { keywordsContainer, bDimmer }){
        this.searchEl = $(target);
        this.keywordsContainer = $(keywordsContainer);
        if(bDimmer) this.dimmer = this.activeDim("#dimmer");
    }

    run(){
        this.searchEl.addEventListener("input", () => { 
            if(!this.debouncer) this.debouncer = debounce(this.showKeywords.bind(this), 500);
            this.debouncer();
        })

        this.searchEl.addEventListener("blur", () => {
            this.removeKeywords();
            this.dimmer(false);
        })
    }

    showKeywords(){
        if(this.searchEl.value === "") {
            this.removeKeywords();
            this.dimmer(false);
            return;
        }
        
        const keywordJson = network.get(`${URL.ACAPI}${this.searchEl.value}`);

        keywordJson
            .then(template.appendSuggestionHTML(this.keywordsContainer))
            .then(this.keypressEvent.bind(this))
            .then(this.dimmer)
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
        let currentId = -1;
    
        this.searchEl.addEventListener("keydown", (evt) => {
            if(evt.keyCode === 38) {
                const [prevTarget, target] = [helper.findTarget(currentId), helper.findTarget(--currentId)];

                helper.removeHoverEffect(prevTarget);
                helper.activeHoverEffect(target);
                helper.changeInput();
            }
            else if(evt.keyCode === 40) {
                const [prevTarget, target] = [helper.findTarget(currentId), helper.findTarget(++currentId)];

                helper.removeHoverEffect(prevTarget);
                helper.activeHoverEffect(target);
                helper.changeInput();
            }
            else if(evt.keyCode === 13) {
                const target = helper.findTarget(currentId);
                evt.preventDefault();
                target.click();
            }
        })

        return res;
    }

    activeDim(bindTo) {
        const targetEl = $(bindTo);

        return command => {
            if(command) targetEl.classList.add("show");
            else targetEl.classList.remove("show");
        }
    }
}

export { Autocomplete };