import { template } from "./module/template.js";
import { ajax } from "./module/ajax.js";

ajax.getReq("https://cohily12.github.io/javascript-amazon/json/options.json")
    .then(template.appendOptionHTML({ HTMLEl: document.querySelector("#select-category") }))

ajax.getReq("https://cohily12.github.io/javascript-amazon/json/videoCarousel.json")
    .then(template.appendCarouselHTML({ HTMLEl: document.querySelector("#video-card ul") }))

ajax.getReq("https://cohily12.github.io/javascript-amazon/json/musicCarousel.json")
    .then(template.appendCarouselHTML({ HTMLEl: document.querySelector("#music-card ul") }))