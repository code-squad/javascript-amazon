export default class {
  constructor({ htmlEl, triggerEl }) {
    this.base = htmlEl;
    this.trigger = triggerEl;
  }

  setBgDimHeight() {
    const bgDim = this.base.querySelector('.megaMenu__screenDim');
    const body = document.querySelector('body');
    const totalHeight = [...body.children].reduce((acc, el) => acc + el.clientHeight, 0);
    bgDim.style.height = `${totalHeight - 1}px`; // Reduce 1px to remove white line on page bottom
  }

  setTriggerMouseOverEvent() {
    const menuWrapper = this.base.querySelector('.megaMenu__wrapper');
    this.trigger.addEventListener('mouseover', () => {
      this.base.classList.replace('closed', 'opened');
    });
    menuWrapper.addEventListener('mouseleave', () => {
      this.base.classList.replace('opened', 'closed');
    });
  }
}
