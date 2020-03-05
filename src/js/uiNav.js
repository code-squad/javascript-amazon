class NavUI {
    constructor(properties) {
        this.properties = properties;
    }
    render() {
        let nav = '';
        for (const iterator of this.properties) {
            nav += `<li>${iterator}</li>`;
        }
        return `<div class="card-nav"><ul>${nav}</ul></div>`;
    }
}

export default NavUI;
