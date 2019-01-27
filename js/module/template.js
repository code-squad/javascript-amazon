const template = {
    appendOptionHTML({ HTMLEl }) {
        return jsonData => {
            const optionHTML = jsonData.reduce((HTML, option) => {
                return HTML += `<option value=${option.value}>${option.text}</option>`;
            }, "");

            HTMLEl.innerHTML = optionHTML.trim();
        }
   },

    appendCarouselHTML({ HTMLEl }) {
        return jsonData => {
            const carouselHTML  = jsonData.reduce((HTML, img) => {
                return HTML += `<li class="carousel-item"><img src=${img.src} alt="${img.alt}"></li>`; 
            }, "")
               
            HTMLEl.innerHTML = carouselHTML.trim();
        }
   },

    appendSuggestionHTML({ HTMLEl }) {
        return ({ prefix, suggestions, error }) => {
            if(error) {
                HTMLEl.innerHTML = "";
            }
            else {
                const suggestionHTML  = suggestions.reduce((HTML, suggestion, id) => {
                    const url = "http://crong.codesquad.kr:8080/amazon-search?";
                    const fieldKeywords = suggestion.value.split(" ").join("+");
                    const restWord = suggestion.value.replace(prefix, "");
                    const ref = suggestion.refTag;
        
                    return HTML += 
                        `<li class="suggestion-item">
                            <a class="suggestion-link" href="${url}${ref}&${fieldKeywords}&${prefix}" data-id="${id}">
                                <span class="prefix-highlight">${prefix}</span>${restWord}
                            </a> 
                        </li>`;
                }, "");
    
                HTMLEl.innerHTML = `<ul class="nav-search-suggestion">${suggestionHTML}</ul>`.trim();
            }

            return suggestions;
        }
    }
}

export { template };