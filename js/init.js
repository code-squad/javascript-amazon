import { template } from "./module/template.js";
import { network, $ } from "./util.js";
import { URL } from "./config.js";

network.get(`${URL.SERVER}json/options.json`)
    .then(template.appendOptionHTML("#select-category"))

network.get(`${URL.SERVER}json/videoCarousel.json`)
    .then(template.appendCarouselHTML("#video-card ul"))

network.get(`${URL.SERVER}json/musicCarousel.json`)
    .then(template.appendCarouselHTML("#music-card ul"))
  