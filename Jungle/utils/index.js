export const mergeConfig = (defaultConfig, config) => Object.assign(defaultConfig, config);

export const setCSS = (el, attr, val) => (el.style[attr] = val);

export const removeNodes = items => {
  items.forEach(item => item.remove());
};

export const isContainClass = (target, className) => target.classList.contains(className);
