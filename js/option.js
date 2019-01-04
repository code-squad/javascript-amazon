const select = document.querySelector("#select-category");
const options = [
    {
        value : "departments",
        text : "All Departments"
    },
    {
        value : "artsAndCrafts",
        text : "Arts & Crafts"
    },
    {
        value : "automotive",
        text : "Automotive"
    },
    {
        value : "baby",
        text : "Baby"
    },
    {
        value : "beautyAndPersonalCare",
        text : "Beauty & Personal Care"
    },
    {
        value : "books",
        text : "Books"
    },
    {
        value : "computers",
        text : "Computers"
    },
    {
        value : "digitalMusics",
        text : "Digital Music"
    },
    {
        value : "electronics",
        text : "Electronics"
    },
    {
        value : "kindleStore",
        text : "Kindle Store"
    },
    {
        value : "primeVideo",
        text : "Prime Video"
    },
    {
        value : "womenFashion",
        text : "Women's Fashion"
    },
    {
        value : "menFashion",
        text : "Men's Fashion"
    },
    {
        value : "girlFashion",
        text : "Girl's Fashion"
    },
    {
        value : "boyFashion",
        text : "Boy's Fashion"
    },
    {
        value : "deals",
        text : "Delas"
    },
    {
        value : "healthAndHousehold",
        text : "Health & Household"
    },
    {
        value : "homeAndKitchen",
        text : "Home & Kitchen"
    },
    {
        value : "industrialAndScientific",
        text : "Industrial & Scientific"
    },
    {
        value : "luggage",
        text : "Luggage"
    },
    {
        value : "moviesAndTV",
        text : "Movies & TV"
    },
    {
        value : "music,CDandVinyl",
        text : "Music, CD & Vinyl"
    },
    {
        value : "petSupplies",
        text : "Pet Supplies"
    },
    {
        value : "software",
        text : "Software"
    },
    {
        value : "sportsAndOutdoors",
        text : "Sports & Outdoors"
    },
    {
        value : "toolAndHomeImprovement",
        text : "Tool & Home Improvement"
    },
    {
        value : "toysAndGames",
        text : "Toys & Games"
    },
    {
        value : "videoGames",
        text : "Video Games"
    }
];

let optionHTML = "";
options.forEach(option => optionHTML += `<option value="${option.value}">${option.text}</option>`);
select.innerHTML = optionHTML;
