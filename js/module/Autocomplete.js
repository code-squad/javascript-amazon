import { template } from "./template.js";
import { $, network, debounce } from "../util.js"
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
        const suggestionsWrap = $(".nav-search-suggestion");

        if(this.searchEl.value === "") {
            suggestionsWrap.innerHTML = "";
            this.dimmer("hidden");    
        }
        else {
            const keywordJson = network.get(`${URL.ACAPI}${this.searchEl.value}`);
    
            keywordJson
                .then(template.appendSuggestionHTML({ HTMLEl: suggestionsWrap }))
                .catch(err => console.log(err));
                
            this.dimmer("show");
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
}

export { Autocomplete };