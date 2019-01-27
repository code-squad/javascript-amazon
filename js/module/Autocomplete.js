import { template } from "./template.js";
import { $, $All, network, debounce } from "../util.js"
import { URL } from "../config.js"

class Autocomplete {
    constructor(target){
        this.searchEl = $(target);
    }

    run(){
        this.searchEl.addEventListener("input", () => { 
            if(!this.send) this.send = debounce(this.showKeywordsList(".nav-search-autocomplete"), 500);

            this.send();
        })
    }

    showKeywordsList(containerSelector){
        const suggestionsWrap = $(containerSelector);

        if(this.searchEl.value === "") {
            suggestionsWrap.innerHTML = null;
        }
        else {
            const keywordJson = network.get(`${URL.ACAPI}${this.searchEl.value}`);
    
            keywordJson
                .then(template.appendSuggestionHTML(containerSelector))
                .then(this.keypressEvent.bind(this))
                .then(this.activeDim("#dimmer"))
        }
    }

    keypressEvent(res) {
        if(!res) return;

        const input = this.searchEl;
        const suggestions = $All(".suggestion-link");
        const helper = {
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
                input.value = json[currentId].value;
            }
        }
        let currentId = -1;
    
        this.searchEl.addEventListener("keydown", (evt) => {
            if(evt.keyCode === 38) {
                const [prevTarget, target] = [helper.findTarget(currentId), helper.findTarget(--currentId)];

                helper.removeHoverEffect(prevTarget);
                helper.activeHoverEffect(target);
                helper.changeInput(target);
            }
            else if(evt.keyCode === 40) {
                const [prevTarget, target] = [helper.findTarget(currentId), helper.findTarget(++currentId)];

                helper.removeHoverEffect(prevTarget);
                helper.activeHoverEffect(target);
                helper.changeInput(target);
            }
            else if(evt.keyCode === 13) {
                const target = helper.findTarget(currentId);
                target.click();
            }
        })

        return res;
    }

    activeDim(bindTo){
        const targetEl = $(bindTo);

        return bOn => {
            if(bOn) targetEl.classList.add("show");
            else targetEl.classList.remove("show");
        }
        
    }
}

export { Autocomplete };