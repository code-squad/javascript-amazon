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

// export const throtlle = (func, delay) => {
//   let timeoutID = null;
//   let lastRan = null;
//   return (arg) => {
//     if (!lastRan) {
//       func(arg)
//       lastRan = Date.now()
//     } else {
//       clearTimeout(timeoutID)
//       timeoutID = setTimeout(function() {
//         if ((Date.now() - lastRan) >= delay) {
//           func(arg)
//           lastRan = Date.now()
//         }
//       }, delay - (Date.now() - lastRan))
//     }
//   }
// }