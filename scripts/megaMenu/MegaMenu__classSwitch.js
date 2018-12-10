export default class ClassSwitch {
  constructor(base, menuListItems, detailSection) {
    this.base = base;
    this.menuListItems = menuListItems;
    this.detailSection = detailSection;
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
    this.base.classList.remove('opened');
  }

  openMenu() {
    this.base.classList.add('opened');
  }

  closeLinkAndDetail() {
    const openedLinks = [...this.menuListItems].filter(el => el.classList.contains('opened'));
    const openedDetais = this.detailSection.querySelectorAll('.detail__layer.opened');

    this.closeEls([...openedLinks, this.detailSection, ...openedDetais]);
  }

  openLinkAndDetail(link, detailToDisplay) {
    this.openEls([this.detailSection, link, detailToDisplay]);
  }
}
