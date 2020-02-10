const init = () => {
    const mockData = {
        headerTexts: ["Fast, Free Delivery", "Exclusive deals and offers", "Prime Originals, movies and TV shows", "Over 2 million song ad free"]
    };
    const slider = new Slider(mockData);
    $("#slider").innerHTML = slider.render();
};

window.addEventListener("DOMContentLoaded", init);