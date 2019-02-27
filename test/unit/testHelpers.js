const {JSDOM} = require('jsdom')
const {window} = new JSDOM()

document = window.document

function render(html) {
  const container = document.createElement('body');
  container.innerHTML = html;
  const $getTestEl = testId =>container.querySelector(`[data-testid="${testId}"]`);
  const $getTestElAll = testId =>container.querySelectorAll(`[data-testid="${testId}"]`);
  return {container, $getTestEl, $getTestElAll};
}

export { render }