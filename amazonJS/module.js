class Module {
  getAjax(handler, url) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      const obj = JSON.parse(xhr.responseText);
      handler(obj);
    });
    xhr.open(`GET`, `${url}`);
    xhr.send();
  }

  qs(value) {
    return document.querySelector(value);
  }
}

export { Module };
