function SearchBarView() {
  $(".searchWarp").innerHTML = this.render();
}

SearchBarView.prototype = {
  constructor: SearchBarView,
  render() {
    const template = `<div class="searchContainer"><div class="searchBackground"></div><span class="amazonImage"><a href="" class="amazonLogo-link"><span class="amazonLogo"></span></a></span><div class="searchForm" action=""><div class="searchContent"><input autocomplete="off" id="searchInput" placeholder="Enter some text" name="name"/><div class="searchBtn"></div><div class="autoList"></div></div></div></div>`;
    return template;
  }
};