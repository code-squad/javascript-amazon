function AutoUI(listForm) {
  this.listForm = listForm;
}

AutoUI.prototype.insertListData = function(dataList, listForm) {
  const innerForm = dataList.reduce((acc, curr) => {
    return (acc += `<li>${curr}</li>`);
  }, "");
  listForm.innerHTML = innerForm;
};

export default AutoUI;
