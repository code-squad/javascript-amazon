export { throttle, debounce }

const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

const debounce = (func, delay) => {
  let time;
  return function (...args) {
    const context = this;
    if (time) clearTimeout(time);
    time = setTimeout(() => func.apply(context, args), delay);
  }
}