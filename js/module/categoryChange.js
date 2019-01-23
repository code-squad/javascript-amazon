export { categoryChange }

function categoryChange({ selectEl, cateNameEl }) {
    selectEl.addEventListener("change", function(){
        cateNameEl.innerText = this.options[this.selectedIndex].innerText;
    })
}