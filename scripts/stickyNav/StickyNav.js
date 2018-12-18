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

      detailLayer.classList.add('opened');
      miniBar.classList.remove('opened');
      window.removeEventListener('scroll', this.updateVisibility);
    });
  }

  closeDetailOnClick() {
    const detailLayer = this.base.querySelector('.stickyNav__detailLayer');
    const detailLayerCLoseBtns = detailLayer.querySelectorAll('.closeBtn');

    detailLayerCLoseBtns.forEach((el) => {
      el.addEventListener('click', () => {
        event.preventDefault();

        detailLayer.classList.remove('opened');
        window.addEventListener('scroll', this.updateVisibility);
        this.updateVisibility();
      });
    });
  }

  updateVisibility() {
    const miniBar = this.base.querySelector('.stickyNav__miniBar');
    if (window.pageYOffset < this.threshold) {
      miniBar.classList.remove('opened');
      return;
    }
    miniBar.classList.add('opened');
  }

  setWrapperHeight() {
    const body = document.querySelector('body');
    const totalHeight = [...body.children].reduce((acc, el) => acc + el.clientHeight, 0);
    body.style.height = `${totalHeight - 1}px`; // Reduce 1px to remove white line on page bottom
  }
}
