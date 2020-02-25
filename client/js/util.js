const cssTransform = (target, width, currentIndex) => {
  let transformOption = `translateX(${-width * currentIndex}px)`;
  target.style.transform = transformOption;
};

const cssTransition = (target, option) => {
  target.style.transition = option;
};

export { cssTransform, cssTransition };
