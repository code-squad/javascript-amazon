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
            this.dimmer("hidden");    
        }
        else {
            const keywordJson = network.get(`${URL.ACAPI}${this.searchEl.value}`);
    
            keywordJson
                .then(template.appendSuggestionHTML({ HTMLEl: suggestionsWrap }))
                // .then(this.dimmer("show"))
                .then(this.keypressEvent.bind(this))
        }
    }

    makeDimmable({ bindTo }){
        return command => {
            if(command === "show") bindTo.classList.add("show");
            else if(command === "hidden") bindTo.classList.remove("show");
        }
    }

    categoryChange() {
        const selectEl = $("#select-category");
        const cateNameEl = $(".nav-select-option");

        selectEl.addEventListener("change", function(){
            cateNameEl.innerText = this.options[this.selectedIndex].innerText;
        })
    }

    keypressEvent() {
        const suggestions = $All(".suggestion-link");
        let currentId = -1;
    
        this.searchEl.addEventListener("keydown", (evt) => {
            if(evt.keyCode === 38) {
                const [prevTarget, target] = [findTarget(currentId), findTarget(--currentId)];

                removeHoverEffect(prevTarget);
                activeHoverEffect(target);
            }
            else if(evt.keyCode === 40) {
                const [prevTarget, target] = [findTarget(currentId), findTarget(++currentId)];

                removeHoverEffect(prevTarget);
                activeHoverEffect(target);
            }
            else if(evt.keyCode === 13) {

            }
        })

        function findTarget(){
            if(currentId < 0) currentId = suggestions.length - 1;
            if(currentId === suggestions.length) currentId = 0; 
            
            return [...suggestions].filter(suggestion => suggestion.dataset.id === `${currentId}`)[0];
        }

        function activeHoverEffect(target) {
            target.classList.add("hover");
        }

        function removeHoverEffect(target) {
            target.classList.remove("hover");
        }
    }
}

export { Autocomplete };