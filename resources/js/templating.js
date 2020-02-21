window.addEventListener("DOMContentLoaded", () => {
  let data;
  fetch("../data/localData.json")
    .then(res => res.json())
    .then(myjson => {
      data = myjson;
      console.log(data);
    });
});
