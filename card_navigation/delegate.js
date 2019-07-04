const delegate = (el, eventType, key, funcMap) => {
  el.addEventListener(eventType, ({ target }) => {
    funcMap[target[key]](target);
  })
}
// const ul = document.querySelector('ul');
// const eventType = 'click';
// const key = 'tagName';

// const funcMap = {
//   IMG: (target) => { log.innerHTML = "clicked" + target.src },
//   LI: (target) => { log.innerHTML = 'clicked' + target.firstChild.src }
// }

delegate(ul, eventType, key, funcMap)

export default delegate;