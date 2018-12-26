export default class CommonLib {
  throttle(func, limit) {
    let inThrottle;

    return function throttler(...args) {
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  }

  debounce(func, delay) {
    let inDebounce; // timeoutID

    return function debouncer(...args) {
      const context = this;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  }
}
