import { debounce, throttle } from './ThrottleAndDebounce.js';
import CanvasPath from './MegaMenu_canvas.js';

export default class {
  constructor({ htmlEl, triggerEl, canvasEl }) {
    this.base = htmlEl;
    this.menuListItems = htmlEl.querySelectorAll('.megaMenu__linkBar > li');
    this.details = htmlEl.querySelector('.megaMenu__detail');
    this.menuWrapper = this.base.querySelector('.megaMenu__wrapper');
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
    [this.trigger, this.menuWrapper].forEach((el) => {
      el.addEventListener('mouseenter', () => {
        this.cursorOnMenu = true;
        debounce(() => {
          if (!this.cursorOnMenu) return;
          this.openMenu();
        }, 200)();
      });
      el.addEventListener('mouseleave', () => {
        this.cursorOnMenu = false;
        debounce(() => {
          if (this.cursorOnMenu || this.canvasPath.cursorHeadingDetail) return;
          this.closeMenu();
        }, 100)();
      });
    });
  }

  setDetailOpenMouseEvent() {
    [...this.menuListItems].forEach((el) => {
      el.addEventListener('mouseover', (evt) => {
        // Open detail on menu list enter
        const link = evt.toElement;
        const linkID = link.dataset.megamenuid;
        const detailToDisplay = this.details.querySelector(`.detail__layer.item${linkID}`);

        if (!linkID || this.canvasPath.cursorHeadingDetail) return;

        // close detail layer already opened
        this.closeLinkAndDetail();

        // open detail layer of newly arrived link
        this.openLinkAndDetail(link, detailToDisplay);
      });
      el.addEventListener('mouseleave', (evt) => {
        // Close detail on menu list leave
        const destination = evt.toElement;
        const bCursorWentToDetail = destination.classList.contains('detail__wrapper');
        const bCursorWentToNextLink = !!destination.dataset.megamenuid;
        const [cursorX, cursorY] = [evt.pageX, evt.pageY];

        if (bCursorWentToDetail || this.canvasPath.cursorHeadingDetail) return;
        if (!bCursorWentToNextLink) {
          // cursor went out of mega menu - close all
          this.closeLinkAndDetail();
          this.closeMenu();
        }

        this.canvasPath.cursorHeadingDetail = true;
        this.canvasPath.canvas.classList.add('opened');
        this.canvasPath.drawThresholdToDetail(cursorX, cursorY);
        this.canvasPath.canvas.addEventListener(
          'mousemove',
          this.canvasPath.pathTracker.bind(this.canvasPath),
        );
      });
    });

    this.details.addEventListener('mouseleave', () => {
      this.closeLinkAndDetail();
    });
  }

  closeEls(htmlElsArr) {
    if (htmlElsArr.length === 0) return;

    htmlElsArr.forEach(el => el.classList.remove('opened'));
  }

  openEls(htmlElsArr) {
    if (htmlElsArr.length === 0) return;

    htmlElsArr.forEach(el => el.classList.add('opened'));
  }

  closeMenu() {
    this.closeEls([this.base, this.canvasPath.canvas]);
  }

  openMenu() {
    this.base.classList.add('opened');
  }

  closeLinkAndDetail() {
    const openedLinks = [...this.menuListItems].filter(el => el.classList.contains('opened'));
    const openedDetais = this.details.querySelectorAll('.detail__layer.opened');
    const detailSection = this.details;

    this.closeEls([...openedLinks, detailSection, ...openedDetais]);
  }

  openLinkAndDetail(link, detailToDisplay) {
    const detailSection = this.details;
    this.openEls([detailSection, link, detailToDisplay]);
  }
}
