export const appendHTMLAtLast = (parent, literalTemplate) => {
    parent.insertAdjacentHTML('beforeend', literalTemplate)
};

export const qsByClass = (className, parent) => {
    const elem = parent || document
    return elem.querySelector(`.${className}`);
};

export const debounce = (func, delay) => {
  let timeoutID;

  return (arg) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => func(arg), delay);
  }
}