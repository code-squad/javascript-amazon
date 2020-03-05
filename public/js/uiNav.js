class NavUI {
    constructor(properties) {
        this.properties = properties;
    }
    render() {
        const drawLI = this.properties.reduce((acc, cur, i) => {
            return (acc += `<li class='nav-a' data-item='${i + 1}'>${cur}</li>`);
        }, '');
        return `<div class='card-nav'><ul>${drawLI}</ul></div>`;
    }
}

export default NavUI;