export default class AutoComplete {
    constructor() {
        this.currentItem = 0;
        this.inputTime = 0;
        this.resultShown = false;
    }

    init() {
        this.addEvent();
    }

    addEvent() {
        const schInput = document.querySelector(".sch-input");
        const searchedResult = document.querySelector(".searched-result");
        const searchBtn = document.querySelector(".sch-btn");
        // const url = "http://crong.codesquad.kr:8080/amazon/ac/";
        const url = "http://codesquadapi.herokuapp.com/ac/";
        let value;

        searchBtn.addEventListener("click", (e) => e.preventDefault);
        schInput.addEventListener("input", (e) => {
            value = schInput.value;
            this.inputTime = new Date();
            if (!value) {
                searchedResult.classList.remove("shown");
                this.resultShown = false;
            }
        });
        schInput.addEventListener("keydown", (e) => {this.checkKeyCode(e, schInput, searchedResult)});
        schInput.addEventListener("keyup", () => {
            if(!this.resultShown) setTimeout(() => this.showResult(url, value, searchedResult), 1000);
        });
    }

    showResult(url, value, searchedResult) {
        if(this.isInputOneSecondAgo()) this.getData(url, value, searchedResult);
    }

    isInputOneSecondAgo() {
        return new Date() - this.inputTime > 1000;
    }

    getData(url, value, searchedResult) {
        fetch(url + value)
            .then(response => {
                if(response.status === 200) return response.json();
            })
            .then(data => {
                if(data.result === "no data") return;
                const dataList = data.suggestions;
                const prefix = data.prefix;                
                searchedResult.innerHTML = this.template(dataList, prefix);
                this.resultShown = true;
                searchedResult.classList.add("shown");
            })
            .catch(err => console.log(err));
    }

    template(dataList, prefix) {
        const url = "http://crong.codesquad.kr:8080/amazon-search"
        return dataList.map(v => { 
            const itemName = v.value;
            v.value = v.value.replace(/\s/g, "+");
            return `<li class="searched-item"><a href="${url}?ref=${v.refTag}&field-keywords=${v.value}&prefix=${prefix}">
            ${itemName}
            </a></li>`
        }).join('');
    }

    checkKeyCode(e, schInput, searchedResult) {
        const searchedItems = document.querySelectorAll(".searched-item");
        const itemLength = searchedItems.length;
        if (e.keyCode === 40 && this.currentItem === itemLength) {
            this.removeSelected(searchedItems);
            this.currentItem = 0;
        } else if (e.keyCode === 40) {
            this.removeSelected(searchedItems);
            searchedItems[this.currentItem].classList.add("selected");
            this.currentItem++;
        } else if (e.keyCode === 38 && this.currentItem === 0) {
            this.removeSelected(searchedItems);
            this.currentItem = itemLength;
        } else if (e.keyCode === 38) {
            this.removeSelected(searchedItems);
            searchedItems[this.currentItem-1].classList.add("selected");
            this.currentItem--;
        } else if (e.keyCode === 13) {
            e.preventDefault();
            schInput.value = searchedItems[this.currentItem - 1].innerText;
            this.removeSelected(searchedItems);
            searchedResult.style.display = 'none';
            this.resultShown = false;
            this.currentItem = 0;
        }
    }

    removeSelected(searchedItems) {
        searchedItems.forEach(item => item.classList.remove("selected"));
    }
}