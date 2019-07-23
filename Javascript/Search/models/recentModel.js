class RecentModel {
    constructor(maxNumber) {
        this.data = [];
        this.maxNumber = maxNumber;
    }

    saveData(value) {
        if(value) {
            this.data.unshift(value);
        }

        if(this.data.length > this.maxNumber) {
            this.data.pop();
        }
    }
}

export default RecentModel;