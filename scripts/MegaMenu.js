import { debounce } from './ThrottleAndDebounce.js';
import CanvasPath from './MegaMenu_canvas.js';

export default class {
  constructor({ htmlEl, triggerEl, canvasEl }) {
    this.base = htmlEl;
    this.trigger = triggerEl;
    this.cursorOnMenu = false;
    this.canvasPath = new CanvasPath(canvasEl);
  }

  setBgDimHeight() {
    const bgDim = this.base.querySelector('.megaMenu__screenDim');
    const body = document.querySelector('body');
    const totalHeight = [...body.children].reduce((acc, el) => acc + el.clientHeight, 0);
    bgDim.style.height = `${totalHeight - 1}px`; // Reduce 1px to remove white line on page bottom
  }

  setMenuOpenMouseEvent() {
    const menuWrapper = this.base.querySelector('.megaMenu__wrapper');
    [this.trigger, menuWrapper].forEach((el) => {
      el.addEventListener('mouseenter', () => {
        this.cursorOnMenu = true;
        debounce(() => {
          if (!this.cursorOnMenu) return;
          this.base.classList.replace('closed', 'opened');
        }, 200)();
      });
      el.addEventListener('mouseleave', () => {
        this.cursorOnMenu = false;
        debounce(() => {
          if (this.cursorOnMenu) return;
          this.base.classList.replace('opened', 'closed');
        }, 100)();
      });
    });
  }

  setDetailOpenMouseEvent() {
    const menuListItems = this.base.querySelectorAll('.megaMenu__linkBar > li');
    const details = this.base.querySelector('.megaMenu__detail');

    [...menuListItems].forEach((el) => {
      el.addEventListener('mouseenter', (evt) => {
        // Open detail on menu list enter
        const link = evt.toElement;
        const linkID = link.dataset.megamenuid;
        const layerToDisplay = details.querySelector(`.detail__layer.item${linkID}`);

        if (!linkID) return;

        link.classList.add('opened');
        details.classList.add('opened');
        layerToDisplay.classList.add('opened');
      });
      el.addEventListener('mouseleave', (evt) => {
        // Close detail on menu list leave
        const link = evt.fromElement;
        const linkID = link.dataset.megamenuid;
        const bCursorWentToDetail = evt.toElement.classList.contains('detail__wrapper');
        const layerOnDisplay = details.querySelector(`.detail__layer.item${linkID}`);

        if (bCursorWentToDetail) return;

        link.classList.remove('opened');
        details.classList.remove('opened');
        if (layerOnDisplay) layerOnDisplay.classList.remove('opened');
      });
    });

    details.addEventListener('mouseleave', () => {
      const openedLink = [...menuListItems].filter(el => el.classList.contains('opened'))[0];
      const layerOnDisplay = details.querySelector('.detail__layer.opened');

      openedLink.classList.remove('opened');
      details.classList.remove('opened');
      layerOnDisplay.classList.remove('opened');
    });
  }
}
