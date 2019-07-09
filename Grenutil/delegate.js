function delegate(target, childSelector, event, cb) {
  const childTarget = target.querySelector(childSelector);
  const childrenTarget = target.querySelectorAll(childSelector);
  const childrenLen = childrenTarget.length;

  if (childrenLen === 1) {
    childTarget.addEventListener(event, cb);
  } else {
    childrenTarget.forEach(child => child.addEventListener(event, cb));
  }
}

export default delegate;
