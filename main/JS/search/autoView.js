function AutoComplitonView(searchForm) {
  this.searchForm = searchForm;
  this.template = `<div class="auto_compliton">
      <div class="auto_list">
      </div>
    </div>`;
}

AutoComplitonView.prototype.innerHTML = function() {
  this.searchForm.innerHTML += this.template;
};

export default AutoComplitonView;
