import template from "../templates/templates.js";

const settings = {
  stickyPlansLayer: {
    htmlEl: document.querySelector(".stickyNav"),
    threshold:
      document.querySelector(".masthead").clientHeight +
      document.querySelector(".header").clientHeight
  },
  megaMenu: {
    htmlEl: document.querySelector(".megaMenu"),
    triggerEl: document.querySelector(".megaMenu__trigger"),
    canvasEl: document.querySelector(".megaMenu__trackerCanvas")
  },
  miniCarousel: {
    music: {
      htmlElSelector: ".horizontalBanners__prime-music",
      timer: {
        autoRotationTiming: 3000, // ms
        autoRotationDebounce: 5000 // ms
      }
    },
    original: {
      htmlElSelector: ".horizontalBanners__prime-original",
      timer: {
        autoRotationTiming: 3000, // ms
        autoRotationDebounce: 5000 // ms
      }
    }
  },
  searchAutoFill: {
    apiURI: "https://codesquadapi.herokuapp.com/ac/",
    el: {
      inputEl: document.querySelector(".search__input"),
      suggestionWrapperEl: document.querySelector(".search__suggestion")
    },
    suggestionTemplateFn: template.suggestion,
    awaitTiming: 300
  }
};

export default settings;
