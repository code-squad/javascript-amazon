import { template } from "./template.js";

class Autocomplete {
    constructor({ searchEl }){
        this.searchEl = searchEl;
        this.apiUrl =  "http://crong.codesquad.kr:8080/amazon/ac/";
    }

    sendReq(){
        this.searchEl.addEventListener("input", () => {
            const dim = document.querySelector(".dim");
            const HTMLEl = document.querySelector(".nav-search-suggestion");
            if(!this.searchEl.value) {
                HTMLEl.classList.add("hidden");
                dim.classList.remove("dimmed");
                return HTMLEl.innerHTML = "";
            }
            
            HTMLEl.classList.remove("hidden");
            dim.classList.add("dimmed");
            const url = this.apiUrl + this.searchEl.value;
            fetch(url)
                .then(res => res.json())
                .then(json => json.suggestions)
                .then(template.appendSuggestionHTML({
                    HTMLEl: HTMLEl
                }))
                .catch(err => console.log(err));
        })
    }
}

export { Autocomplete };