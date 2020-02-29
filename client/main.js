window.addEventListener("DOMContentLoaded", () => {
  new SearchBarView();
  new Controller({
    searchModel: new SearchModel({
      "LOCALHOST_URL" : "http://127.0.0.1:4000"
    }),
    searchInput: $("#searchInput"),
    autoList: $(".autoList"),
    searchBackground: $(".searchBackground")
  });
});