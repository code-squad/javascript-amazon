import { debounce } from './ThrottleAndDebounce.js';
import CanvasPath from './MegaMenu_canvas.js';

export default class {
  constructor({ htmlEl, triggerEl, canvasEl }) {
    this.base = htmlEl;
    this.menuListItems = htmlEl.querySelectorAll('.megaMenu__linkBar > li');
    this.details = htmlEl.querySelector('.megaMenu__detail');
    this.menuWrapper = this.base.querySelector('.megaMenu__wrapper');
    this.trigger = triggerEl;
    this.cursorOnMenu = false;
    this.cursorOnDetail = false;
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
        if (this.canvasPath.cursorHeadingDetail) return;
        debounce(() => {
          if (this.cursorOnMenu) return;
          this.closeLinkAndDetail();
          this.closeMenu();
        }, 200)();
      });
    });
  }

  setDetailOpenMouseEvent() {
    [...this.menuListItems].forEach((el) => {
      el.addEventListener('mouseenter', (evt) => {
        const link = evt.toElement;
        const linkID = link.dataset.megamenuid;
        const detailToDisplay = this.details.querySelector(`.detail__layer.item${linkID}`);

        if (this.canvasPath.cursorHeadingDetail) return;

        // close detail layer already opened
        this.closeLinkAndDetail();

        // Stop if destination link doesn't have detail layer
        if (!detailToDisplay) return;

        // open detail layer of newly arrived link
        this.openLinkAndDetail(link, detailToDisplay);
      });
      el.addEventListener('mouseleave', (evt) => {
        const destination = evt.toElement;
        const bCursorWentToDetail = [...destination.classList].filter(
          cl => cl.indexOf('detail') > -1,
        ).length;
        const bCursorWentToBoundary = destination.classList.contains('megaMenu__linkBar');
        const bCursorWentToNextLink = !!destination.dataset.megamenuid;
        const [cursorX, cursorY] = [evt.pageX, evt.pageY];

        if (bCursorWentToBoundary) {
          this.closeLinkAndDetail();
          return;
        }

        if (bCursorWentToDetail || this.canvasPath.cursorHeadingDetail) return;

        const bCursorWentOutOfMenu = !bCursorWentToNextLink && !this.cursorOnDetail;
        if (bCursorWentOutOfMenu) {
          this.closeLinkAndDetail();
          this.closeMenu();
          return;
        }

        // Open canvas after cursor went to another list link
        this.canvasPath.cursorHeadingDetail = true;
        this.canvasPath.canvas.classList.add('opened');
        this.canvasPath.setPathTracker(cursorX, cursorY);
      });
    });

    this.details.addEventListener('mouseenter', () => {
      this.cursorOnDetail = true;
    });
    this.details.addEventListener('mouseleave', () => {
      this.cursorOnDetail = false;
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
    this.closeEls([this.base]);
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
