export default function(func, delay) {
  let inDebounce; // timeoutID

  return function debouncer(...args) {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func(...args), delay);
  };
}
