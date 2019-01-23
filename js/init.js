import { template } from "./module/template.js";
import { ajax } from "./module/ajax.js";
import { Autocomplete} from "./module/Autocomplete.js"
import { categoryChange } from "./module/categoryChange.js" 

const localUrl = location.href;
const autocomplete = new Autocomplete({
    searchEl: document.querySelector(".nav-input-bar")
})

categoryChange({
    selectEl: document.querySelector("#select-category"),
    cateNameEl: document.querySelector(".nav-select-option")
});

autocomplete.sendReq();

ajax.getReq(`${localUrl}json/options.json`)
    .then(template.appendOptionHTML({ HTMLEl: document.querySelector("#select-category") }))

ajax.getReq(`${localUrl}json/videoCarousel.json`)
    .then(template.appendCarouselHTML({ HTMLEl: document.querySelector("#video-card ul") }))

ajax.getReq(`${localUrl}json/musicCarousel.json`)
    .then(template.appendCarouselHTML({ HTMLEl: document.querySelector("#music-card ul") }))
  