class RecentModel {
    constructor() {
        this.data = [];
    }

    saveData(value) {
        if(value) {
            this.data.unshift(value);
        }

        if(this.data.length > 5) {
            this.data.pop();
        }
    }
}

export default RecentModel;