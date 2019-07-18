export default function(func, delay) {
  let inDebounce; // timeoutID

  return function debouncer(...args) {
    const context = this;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
}
