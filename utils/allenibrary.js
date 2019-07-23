const $ = (selector) => {
  return document.querySelector(selector);
}

const on = (el, eventType, handler) => {
  el.addEventListener(eventType, handler);
}

const getJsonData = url => fetch(url).then(res => res.json());

/**
 * @param  {Element} el 이벤트를 위임할 엘리먼트
 * @param  {string} eventType
 * @param  {string} domElProperty event.target이 고유하게 갖는 속성(ex: tagName, className). className이 여러개일 경우 classList를 사용가능
 * @param  {object} funcMap 이벤트핸들러 함수를 target속성별로 매핑한 객체
 */
const delegate = (el, eventType, domElProperty, funcMap) => {
  if (domElProperty === 'classList') {
    el.addEventListener(eventType, ({ target }) => {
      target[domElProperty].forEach(className => {
        if (funcMap[className]) funcMap[className](target);
      })
    })
  }
  else el.addEventListener(eventType, ({ target }) => {
    if (funcMap[target[domElProperty]]) funcMap[target[domElProperty]](target);
  })
}

const makeDelay = (timeInMs) => {
  return new Promise(res => setTimeout(res, timeInMs))
}

/**
 * @param  {Element} targetEl
 * @param  {string} property
 */
const setCssStyle = (targetEl, property, value) => {
  if (property === 'all' && value === 'none') {
    targetEl.style = {};
    return;
  }
  targetEl.style[property] = value;
}

/**
 * @param  {Function} fn 디바운스를 적용할 함수
 * @param  {number} timeInMs
 */
let _timer;
function setDebounce(fn, timeInMs, param) {
  if (_timer) clearTimeout(_timer);
  _timer = setTimeout(fn, timeInMs, param);
}

export { $, on, delegate, getJsonData, makeDelay, setCssStyle, setDebounce }