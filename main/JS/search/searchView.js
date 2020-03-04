function SearchView(searchForm) {
  this.searchForm = searchForm;
  this.template = `<div class="search">
      <div class="amazon_logo">
        <img
          src="./img/Screenshot 2020-03-04 at 00.48.53.jpg"
          alt="amazon_logo"
        />
      </div>
      <div class="search_bar_area">
        <select name="option" id="option">
          <option value="">All</option>
          <option value="">food</option>
          <option value="">game</option>
        </select>
        <input type="text" class="search_input" />
        <input type="button" class="push_input" />
      </div>
    </div>`;
}

SearchView.prototype.innerHTML = function() {
  this.searchForm.innerHTML += this.template;
};

export default SearchView;
