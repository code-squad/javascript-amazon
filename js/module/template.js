import { $ } from "../util.js"
import { URL } from "../config.js"

const template = {
    appendOptionHTML(selector) {
        const HTMLEl = $(selector);

        return jsonData => {
            const optionHTML = jsonData.reduce((HTML, option) => {
                return HTML += `<option value=${option.value}>${option.text}</option>`;
            }, "");

            HTMLEl.innerHTML = optionHTML.trim();
        }
   },

    appendCarouselHTML(selector) {
        const HTMLEl = $(selector);

        return jsonData => {
            const carouselHTML  = jsonData.reduce((HTML, img) => {
                return HTML += `<li class="carousel-item"><img src=${img.src} alt="${img.alt}"></li>`; 
            }, "")
               
            HTMLEl.innerHTML = carouselHTML.trim();
        }
   },

    appendSuggestionHTML(selector) {
        const HTMLEl = $(selector);

        return ({ prefix, suggestions, error }) => {
            if(error) {
                HTMLEl.innerHTML = "";
                return;
            }
            const suggestionHTML  = suggestions.reduce((HTML, suggestion) => {
                const fieldKeywords = suggestion.value.split(" ").join("+");
                const restWord = suggestion.value.replace(prefix, "");
                const ref = suggestion.refTag;
        
                return HTML += 
                    `<li class="suggestion-item">
                        <a class="suggestion-link" href="${URL.ITEMURL}${ref}&${fieldKeywords}&${prefix}">
                            <span class="prefix-highlight">${prefix}</span>${restWord}
                        </a> 
                    </li>`;
            }, "");
    
            HTMLEl.innerHTML = `<ul class="nav-search-suggestion">${suggestionHTML}</ul>`.trim();

            return suggestions;
        }
    }
}

export { template };