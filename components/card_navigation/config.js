const config = {
  paginationSelector: ".benefit-list",
  carouselSelector: ".benefit-content",
  btnWrapperSelector: ".content-wrapper",

  prevBtnCssClass: 'arrow-left',
  nextBtnCssClass: 'arrow-right',

  url: './resource/localData.json',

  option: {
    infinite: true,
    quantityToSlide: 1,
    startIdx: 0
  }
}

export default config;