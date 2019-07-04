const $ = (selector) => {
  return document.querySelector(selector);
}

const delegate = (el, eventType, domElProperty, funcMap) => {
  el.addEventListener(eventType, ({ target }) => {
    if (domElProperty === 'classList') {
      target[domElProperty].forEach(className => {
        if (funcMap[className]) funcMap[className](target);
      });
    }
    else funcMap[target[domElProperty]](target);
  })
}
// const ul = document.querySelector('ul');
// const eventType = 'click';
// const domElProperty = 'tagName';

// const funcMap = {
//   IMG: (target) => { log.innerHTML = "clicked" + target.src },
//   LI: (target) => { log.innerHTML = 'clicked' + target.firstChild.src }
// }

// delegate(ul, eventType, domElProperty, funcMap)

export { $, delegate }