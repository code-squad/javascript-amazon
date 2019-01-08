import { debounce } from '../ThrottleAndDebounce.js';
import CanvasPath from './MegaMenu__canvasPath.js';
import ClassSwitch from './MegaMenu__classSwitch.js';

export default class {
  constructor({ htmlEl, triggerEl, canvasEl }) {
    this.base = htmlEl;
    this.menuList = htmlEl.querySelector('.megaMenu__linkBar');
    this.menuListItems = htmlEl.querySelectorAll('.megaMenu__linkBar > li');
    this.details = htmlEl.querySelector('.megaMenu__detail');
    this.menuWrapper = htmlEl.querySelector('.megaMenu__wrapper');
    this.trigger = triggerEl;
    this.cursorOnMenu = false;
    this.canvasPath = new CanvasPath(canvasEl, this.base, this.menuListItems, this.details);
    this.classSwitch = new ClassSwitch(this.base, this.menuListItems, this.details);
  }

  /* =======
  Initial listener / style assignment
  ======= */
  setBgDimHeight() {
    const bgDim = document.querySelector('.megaMenu__screenDim');
    const body = document.querySelector('body');
    const totalHeight = [...body.children].reduce((acc, el) => acc + el.clientHeight, 0);

    bgDim.style.height = `${totalHeight - 1}px`; // Reduce 1px to remove white line on page bottom
  }

  setMenuOpenMouseEvent() {
    [this.trigger, this.menuWrapper].forEach((el) => {
      el.addEventListener('mouseenter', this.openMenuOnMouseEnter.bind(this));
      el.addEventListener('mouseleave', this.closeMenuOnMouseLeave.bind(this));
    });
  }

  setDetailOpenMouseEvent() {
    this.menuList.addEventListener('mouseover', this.openDetailOnMouseEnter.bind(this));
    this.menuList.addEventListener('mouseout', this.closeDetailOnMouseLeave.bind(this));
  }

  /* =======
  Event handlers - Menu
  ======= */
  openMenuOnMouseEnter() {
    this.cursorOnMenu = true;
    debounce(() => {
      if (!this.cursorOnMenu) return;
      this.classSwitch.openMenu();
    }, 100)();
  }

  closeMenuOnMouseLeave() {
    this.cursorOnMenu = false;
    if (this.canvasPath.cursorHeadingDetail) return;
    debounce(() => {
      if (this.cursorOnMenu) return;
      this.classSwitch.closeLinkAndDetail();
      this.classSwitch.closeMenu();
    }, 10)();
  }

  /* =======
  Event handlers - Detail
  ======= */
  openDetailOnMouseEnter(evt) {
    const link = evt.toElement;
    const linkID = link.dataset.megamenuid;
    const detailToDisplay = this.details.querySelector(`.detail__layer.item${linkID}`);

    // Ignore further action if cursor is heading detail layer on canvas path
    if (this.canvasPath.cursorHeadingDetail) return;

    // Close detail layer already opened
    this.classSwitch.closeLinkAndDetail();

    // Display detail only if the link has linked detail layer
    if (detailToDisplay) this.classSwitch.openLinkAndDetail(link, detailToDisplay);
  }

  closeDetailOnMouseLeave(evt) {
    const destination = this.getCursorDestination(evt.toElement);
    const [cursorX, cursorY] = [evt.pageX, evt.pageY];
    const action = {
      boundary() {
        this.classSwitch.closeLinkAndDetail();
      },
      anotherLink() {
        this.startCursorTracking(cursorX, cursorY);
      },
      outOfMenu() {
        this.classSwitch.closeLinkAndDetail();
        this.classSwitch.closeMenu();
      },
    };

    if (action[destination]) action[destination].bind(this)();
  }

  getCursorDestination(toEl) {
    if (toEl.classList.contains('megaMenu__linkBar')) {
      return 'boundary';
    }
    if ([...toEl.classList].filter(cl => cl.indexOf('detail') > -1).length) {
      return 'detailLayer';
    }
    if (this.canvasPath.cursorHeadingDetail) {
      return 'headingDetail';
    }
    if (toEl.dataset.megamenuid) {
      return 'anotherLink';
    }
    return 'outOfMenu';
  }

  startCursorTracking(cursorX, cursorY) {
    this.canvasPath.cursorHeadingDetail = true;
    this.canvasPath.canvas.classList.add('opened');
    this.canvasPath.setPathTracker(cursorX, cursorY);
  }
}
