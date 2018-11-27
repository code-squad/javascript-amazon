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

  setMenuOpenMouseEvent() {
    const menuWrapper = this.base.querySelector('.megaMenu__wrapper');
    this.trigger.addEventListener('mouseover', () => {
      this.base.classList.replace('closed', 'opened');
    });
    menuWrapper.addEventListener('mouseleave', () => {
      this.base.classList.replace('opened', 'closed');
    });
  }

  setDetailOpenMouseEvent() {
    const menuListItems = this.base.querySelectorAll('.megaMenu__linkBar > li');
    const details = this.base.querySelector('.megaMenu__detail');

    [...menuListItems].forEach((el) => {
      el.addEventListener('mouseover', (evt) => {
        const linkID = evt.toElement.dataset.megamenuid;
        const layerToDisplay = details.querySelector(`.detail__layer${linkID}`);

        if (!linkID) return;
        layerToDisplay.classList.add('opened');
      });
      el.addEventListener('mouseleave', () => {
        const layerOnScreen = details.querySelector('.opened');

        if (!layerOnScreen) return;
        layerOnScreen.classList.remove('opened');
      });
    });
  }
}
