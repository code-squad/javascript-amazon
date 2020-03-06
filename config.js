export const carouselFetch = {
  dataUrl: "http://127.0.0.1:8080/",
  localStorageKey: "carouselData",
  requestOption: {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  }
};

export const searchFetch = {
  dataUrl: "http://127.0.0.1:8080/search/",
  localStorageKey: "searchData",
  requestOption: {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  }
};
