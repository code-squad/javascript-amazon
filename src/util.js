const $ = (select) => document.querySelector(select);
const __ = {
  prevBtn : $('.left-btn'),
  nextBtn : $('.right-btn'),
  slideWrap : $('.slide-list'),
  slideLi : $('.slide-list').children,
  pageNavi : $('.page-nav').querySelectorAll('li')
};
