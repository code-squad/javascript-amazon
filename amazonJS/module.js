class Module {
  getAjax(handler, url) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      const parsedObject = JSON.parse(xhr.responseText);
      handler(parsedObject);
    });
    xhr.open(`GET`, `${url}`);
    xhr.send();
  }

  qs(value) {
    return document.querySelector(value);
  }
}

export { Module };
