export function getAjax(handler, url) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    const parsedObject = JSON.parse(xhr.responseText);
    handler(parsedObject);
  });
  xhr.open(`GET`, `${url}`);
  xhr.send();
}

export function qs(value, node = document) {
  return node.querySelector(value);
}
