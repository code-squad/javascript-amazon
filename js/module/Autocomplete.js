import { template } from "./template.js";
import { util } from "../util.js"

class Autocomplete {
    constructor({ searchEl }){
        this.searchEl = searchEl;
        this.apiUrl =  "http://crong.codesquad.kr:8080/amazon/ac/";
    }

    sendReq(){
        this.searchEl.addEventListener("input", () => {
            if(!this.send) this.send = util.debounce(this.ajaxApi.bind(this), 1000);

            this.send();
        })
    }

    ajaxApi(){
        const url = this.apiUrl + this.searchEl.value;
        const HTMLEl = document.querySelector(".nav-search-suggestion");
        fetch(url)
            .then(res => res.json())
            .then(json => { 
                return { prefix: json.prefix, suggestions: json.suggestions }
            })
            .then(template.appendSuggestionHTML({
                HTMLEl: HTMLEl
            }))
            .catch(err => console.log(err));
    }

    addDimmed(){
        const dim = document.querySelector(".dim");
        dim.classList.add("dimmed");
    }

    removeDimmed(){
        const dim = document.querySelector(".dim");
        dim.classList.remove("dimmed");
    }
}

export { Autocomplete };