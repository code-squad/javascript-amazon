function SearchBarView() {
  $(".searchWarp").innerHTML = this.render();
}

SearchBarView.prototype = {
  render() {
    const template = `<div class="searchContainer"><span class="amazonImage"><a href="" class="amazonLogo-link"><span class="amazonLogo"></span></a></span><form class="searchForm" action=""><div class="searchContent"><input autocomplete="off" id="searchInput" placeholder="Enter some text" name="name"/><div class="searchBtn"></div><div class="autoList"></div></div></form></div>`;
    return template;
  }
};