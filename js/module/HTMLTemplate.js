class HTMLTemplate {
    optionHTML({ HTMLEl }){
        return (jsonData) => {
            const resultHTML = jsonData.reduce((HTML, option) => {
                return HTML += `<option value=${option.value}>${option.text}</option>`;
            }, "")
    
            HTMLEl.innerHTML = resultHTML;
        }
    }

    carouselHTML({ HTMLEl }) {
        return (jsonData) => {
            const resultHTML = jsonData.reduce((HTML, img) => {
                return HTML += `<li class="carousel-item"><img src=${img.src} alt="${img.alt}"></li>`; 
            }, "")

            HTMLEl.innerHTML = resultHTML;
        }
    }
}

export { HTMLTemplate };



