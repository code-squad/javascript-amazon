export default class AutoComplete {
    constructor() {
        this.currentItem = -1;
        this.inputTime = 0;
        this.resultShown = false;
        this.timerId;
        this.value;
    }

    init() {
        this.addEvent();
    }

    addEvent() {
        const schInput = document.querySelector(".sch-input");
        const searchedResult = document.querySelector(".searched-result");
        const searchBtn = document.querySelector(".sch-btn");
        const url = "http://crong.codesquad.kr:8080/amazon/ac/";
        // const url = "http://codesquadapi.herokuapp.com/ac/";
        const keySet = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"];

        searchBtn.addEventListener("click", (e) => e.preventDefault());
        schInput.addEventListener("keydown", (e) => this.executeKeyAction(e, schInput, searchedResult));
        schInput.addEventListener("keyup", (e) => this.checkKeyUp(keySet, e.key, url, searchedResult, schInput));
    }

    checkKeyUp(keySet, key, url, searchedResult, schInput) {
        if (keySet.includes(key)) return;
        this.value = schInput.value;
        this.inputTime = new Date();
        this.showResult(url, searchedResult);
        if (key === "Backspace") this.showResult(url, searchedResult);
    }

    showResult(url, searchedResult) {
        if (!this.value) {
            searchedResult.classList.remove("shown");
            this.resultShown = false;
        }
        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => this.getData(url, searchedResult), 1000);
    }

    getData(url, searchedResult) {
        if (!this.value) return;
        fetch(url + this.value)
            .then(response => {
                if (response.status === 200) return response.json();
            })
            .then(data => {
                if (data.result === "no data" || data.error === "not found item") return;
                const dataList = data.suggestions;
                const prefix = data.prefix;
                searchedResult.innerHTML = this.template(dataList, prefix);
                this.resultShown = true;
                searchedResult.classList.add("shown");
            })
            .catch(err => console.log(err));
        this.currentItem = -1;
    }

    template(dataList, prefix) {
        const url = "http://crong.codesquad.kr:8080/amazon-search"
        return dataList.map(data => {
            let itemName = data.value;
            data.value = data.value.replace(/\s/g, "+");
            return `<li class="searched-item"><a href="${url}?ref=${data.refTag}&field-keywords=${data.value}&prefix=${prefix}">
            ${this.templateHighlighting(itemName, prefix)}
            </a></li>`
        }).join('');
    }

    templateHighlighting(itemName, prefix) {
        itemName = itemName.replace(prefix, (prefix) => `<span class="prefix">${prefix}</span>`)
        return itemName;
    }

    executeKeyAction(e, schInput, searchedResult) {
        const searchedItems = document.querySelectorAll(".searched-item");
        const itemLength = searchedItems.length;
        const keyPressed = e.key;
        if (keyPressed === "ArrowDown") this.arrowDownFunc(e, searchedResult, searchedItems, itemLength);
        else if (keyPressed === "ArrowUp") this.arrowUpFunc(e, searchedItems, itemLength);
        else if (keyPressed === "Enter") this.enterFunc(e, searchedResult, searchedItems, schInput);

    }

    arrowDownFunc(e, searchedResult, searchedItems, itemLength) {
        e.preventDefault();
        if (this.currentItem === itemLength-1) {
            this.removeSelected(searchedItems);
            this.currentItem = -1;
        } else {
            searchedResult.classList.add("shown");
            this.removeSelected(searchedItems);
            this.currentItem++;
            searchedItems[this.currentItem].classList.add("selected");
        }
    }

    arrowUpFunc(e, searchedItems, itemLength) {
        e.preventDefault();
        if (this.currentItem === 0 || this.currentItem === -1) {
            this.removeSelected(searchedItems);
            this.currentItem = itemLength;
        } else {
            this.removeSelected(searchedItems);
            this.currentItem--;
            searchedItems[this.currentItem].classList.add("selected");
        }
    }

    enterFunc(e, searchedResult, searchedItems, schInput) {
        e.preventDefault();
        if (this.currentItem !== -1) schInput.value = searchedItems[this.currentItem].innerText;
        this.removeSelected(searchedItems);
        searchedResult.classList.remove("shown");
        this.resultShown = false;
        this.currentItem = -1;
    }

    removeSelected(searchedItems) {
        searchedItems.forEach(item => item.classList.remove("selected"));
    }
}