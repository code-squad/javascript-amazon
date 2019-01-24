export { template };

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
        return ({ prefix, suggestions }) => {
            const suggestionHTML  = suggestions.reduce((HTML, suggestion) => {
                const restWord = suggestion.value.replace(prefix, "");
                const ref = suggestion.refTag;
                const fieldKeywords = suggestion.value.split(" ").join("+");
                const url = "http://crong.codesquad.kr:8080/amazon-search?";
                
                return HTML += 
                    `<a class="suggestion-link" href="${url}${ref}&${fieldKeywords}&${prefix}">
                        <li class="suggestion-item">
                            <span class="prefix-highlight">${prefix}</span>
                            <span>${restWord}</span>
                        </li>
                    </a>`; 
            }, "");
        
            HTMLEl.innerHTML = suggestionHTML.trim();
        }
    }
}