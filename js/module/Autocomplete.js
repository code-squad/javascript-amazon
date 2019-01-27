import { template } from "./template.js";
import { $, $All, network, debounce } from "../util.js"
import { URL } from "../config.js"

class Autocomplete {
    constructor({ searchEl }){
        this.searchEl = searchEl;
        this.dimmer = this.makeDimmable({ bindTo: $("#dimmer") });
    }

    sendReq(){
        this.searchEl.addEventListener("input", () => { 
            if(!this.send) this.send = debounce(this.inputKeyword.bind(this), 500);

            this.send();
        })
    }

    inputKeyword(){
        const suggestionsWrap = $(".nav-search-autocomplete");

        if(this.searchEl.value === "") {
            suggestionsWrap.innerHTML = null;
        }
        else {
            const keywordJson = network.get(`${URL.ACAPI}${this.searchEl.value}`);
    
            keywordJson
                .then(template.appendSuggestionHTML({ HTMLEl: suggestionsWrap }))
                .then(this.keypressEvent.bind(this))
                .then(this.dimmer)
        }
    }

    makeDimmable({ bindTo }){
        return command => {
            if(command === "show") bindTo.classList.add("show");
            else if(command === "hidden") bindTo.classList.remove("show");
        }
    }

    keypressEvent(res) {
        if(!res) "hidden";

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

        return "show";
    }
}

export { Autocomplete };