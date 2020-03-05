import NavUI from './uiNav.js';
import ContentsUI from './uiContents.js';

class mainUI {
    constructor(data) {
        this.data = data;
        this.nav = new NavUI(data.navData);
        this.contents = new ContentsUI(data.contentsData);
    }
    render() {
        return `
            ${this.nav.render()}
            ${this.contents.render()}
            <div class="card-btns">
                <button class="btn-prev">이전</button>
                <button class="btn-next">다음</button>
            </div>
        `;
    }
}
export default mainUI;
