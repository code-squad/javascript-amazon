class NavUI {
    constructor(properties) {
        this.properties = properties;
    }
    render() {
        const navLi = this.properties.reduce((acc,cur,i)=>{
            return acc += `<li data-item='${i}'>${cur}</li>`
        },'')
        return `<div class="card-nav"><ul>${navLi}</ul></div>`;
    }
}

export default NavUI;
