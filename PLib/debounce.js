export default (func, delay) => {
  let inDebounce; // timeoutID

  return (...args) => {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func(...args), delay);
  };
};
