import { template } from "./module/template.js";
import { util } from "./util.js";
import { categoryChange } from "./module/categoryChange.js" 

const localUrl = location.href;

categoryChange({
    selectEl: document.querySelector("#select-category"),
    cateNameEl: document.querySelector(".nav-select-option")
});

util.network.get(`${localUrl}json/options.json`)
    .then(template.appendOptionHTML({ HTMLEl: document.querySelector("#select-category") }))

util.network.get(`${localUrl}json/videoCarousel.json`)
    .then(template.appendCarouselHTML({ HTMLEl: document.querySelector("#video-card ul") }))

util.network.get(`${localUrl}json/musicCarousel.json`)
    .then(template.appendCarouselHTML({ HTMLEl: document.querySelector("#music-card ul") }))
  