import { URL } from "../config.js"


export function appendTemplate(parentEl, template) {
    if(template) parentEl.innerHTML = template;
}

export function createOptionTemplate(jsonData) {
    const optionTemplate = jsonData.reduce((HTML, option) => {
        return HTML += `<option value=${option.value}>${option.text}</option>`;
    }, "");

    return optionTemplate.trim();
}

export function createCarouselTemplate(jsonData) {
    const carouselTemplate = jsonData.reduce((HTML, img) => {
        return HTML += 
            `<li class="carousel-item">
                <img src=${img.src} alt="${img.alt}">
            </li>`; 
    }, "");

    return carouselTemplate.trim();
}

export function createSuggestionTemplate({ prefix, suggestions, result }) {
    if(result === "no data") return;
            
    const suggestionTemplate  = suggestions.reduce((HTML, suggestion) => {
        const ref = suggestion.refTag;
        const fieldKeywords = suggestion.value.split(" ").join("+");
        const restWord = suggestion.value.replace(prefix, "");
    
        return HTML += 
            `<li class="suggestion-item">
                <a class="suggestion-link" href="${URL.ITEM}ref=${ref}&field-keywords=${fieldKeywords}&prefix=${prefix}">
                    <span class="prefix-highlight">${prefix}</span>${restWord}
                </a> 
            </li>`;
    }, "");
    
    return `<ul class="nav-search-suggestion">${suggestionTemplate}</ul>`.trim();
}