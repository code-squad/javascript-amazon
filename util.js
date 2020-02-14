const $ = (select) => document.querySelector(select);
const $$ = {
  _prevBtn : $('.left-btn'),
  _nextBtn : $('.right-btn'),
  _slideWrap : $('.slide-list'),
  _slideLi : $('.slide-list').children,
  _pageNavi : $('.page-nav').querySelectorAll('li')
};
