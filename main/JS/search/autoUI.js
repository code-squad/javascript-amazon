function AutoUI(listForm) {
  // 인자값으로 전해주기
  this.listForm = listForm;
}

AutoUI.prototype.insertListData = function(dataList, listForm) {
  console.log(this);
  const innerForm = dataList.reduce((acc, curr) => {
    return (acc += `<li>${curr}</li>`);
  }, "");
  listForm.innerHTML = innerForm;
};

export default AutoUI;
