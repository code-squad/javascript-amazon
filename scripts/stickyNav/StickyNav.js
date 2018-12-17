export default class {
  constructor({ htmlEl, threshold }) {
    this.base = htmlEl;
    this.threshold = threshold;
  }

  displayDetailOnClick() {
    const seeMoreLink = this.base.querySelector('.stickyNav__morePlanBtn .morePlanBtn__link');
    seeMoreLink.addEventListener('click', () => {
      event.preventDefault();

      const detailLayer = this.base.querySelector('.stickyNav__detailLayer');
      const miniBar = this.base.querySelector('.stickyNav__miniBar');

      detailLayer.classList.replace('closed', 'opened');
      miniBar.classList.replace('opened', 'closed');
      window.removeEventListener('scroll', this.updateVisibility);
    });
  }

  closeDetailOnClick() {
    const detailLayer = this.base.querySelector('.stickyNav__detailLayer');
    const detailLayerCLoseBtns = detailLayer.querySelectorAll('.closeBtn');

    detailLayerCLoseBtns.forEach((el) => {
      el.addEventListener('click', () => {
        event.preventDefault();

        detailLayer.classList.replace('opened', 'closed');
        window.addEventListener('scroll', this.updateVisibility);
        this.updateVisibility();
      });
    });
  }

  updateVisibility() {
    const miniBar = this.base.querySelector('.stickyNav__miniBar');
    if (window.pageYOffset < this.threshold) {
      miniBar.classList.replace('opened', 'closed');
      return;
    }
    miniBar.classList.replace('closed', 'opened');
  }

  setMainHeight() {
    const main = document.querySelector('main');
    const totalHeight = [...main.children].reduce((acc, el) => acc + el.clientHeight, 0);
    main.style.height = `${totalHeight - 1}px`; // Reduce 1px to remove white line on page bottom
  }
}
