export function getAjax(handler, url) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    const parsedObject = JSON.parse(xhr.responseText);
    handler(parsedObject);
  });
  xhr.open(`GET`, `${url}`);
  xhr.send();
}

export function qs(node, value) {
  return node.querySelector(value);
}
