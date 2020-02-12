class ContentsUI {
    constructor(properties) {
        this.properties = properties;
    }
    render() {
        let items = '';
        for (const iterator of this.properties) {
            let itemList = '';
            for (const list of iterator.list) {
                itemList += `<li>${list}</li>`;
            }
            items += `
            <div class='card-item'>
                <div class='card-img'><img src='${iterator.img}'/></div>
                <div class="card-text">
                    <h3>${iterator.title}</h3>
                    <ul>
                        ${itemList}
                    </ul>
                </div>
            </div>
            `;
        }
        return `<div class='card-contents'>${items}</div>`;
    }
}
export default ContentsUI;
