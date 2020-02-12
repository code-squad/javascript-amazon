window.addEventListener('DOMContentLoaded', () => {
    const topElements = document.querySelector("#top");
    const bottomElements = document.querySelector("#bottom");

    const sliderService = new SlideService({
        topElements : topElements,
        bottomElements :bottomElements 
    });
});