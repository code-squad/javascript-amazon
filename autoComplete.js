export default class AutoComplete {
    constructor() {
        this.currentItem = -1;
        this.inputTime = 0;
        this.resultShown = false;
        this.timerId;
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
        let value;

        searchBtn.addEventListener("click", (e) => e.preventDefault);
        schInput.addEventListener("keydown", (e) => {
            this.checkKeyCode(e, schInput, searchedResult);
            if (e.keyCode === 8) this.showResult(url, value, searchedResult);
        });

        schInput.addEventListener("keyup", (e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Enter") return;
            value = schInput.value;
            this.inputTime = new Date();
            this.showResult(url, value, searchedResult);
        });
    }

    showResult(url, value, searchedResult) {
        if (!value) {
            searchedResult.classList.remove("shown");
            this.resultShown = false;
        }

        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => this.getData(url, value, searchedResult), 1000);
    }

    getData(url, value, searchedResult) {
        if (!value) return;
        fetch(url + value)
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

    checkKeyCode(e, schInput, searchedResult) {
        const searchedItems = document.querySelectorAll(".searched-item");
        const itemLength = searchedItems.length;
        
        // 여전히 한번 멈추는 데 어떻게 해결하쥐... -> 함수로.. keycode => key로 
        if (e.keyCode === 38 || e.keyCode === 40) e.preventDefault();
        if (e.keyCode === 40 && this.currentItem === itemLength-1) {
            this.removeSelected(searchedItems);
            this.currentItem = -1;
        } else if (e.keyCode === 40) {
            searchedResult.classList.add("shown");
            this.removeSelected(searchedItems);
            this.currentItem++;
            searchedItems[this.currentItem].classList.add("selected");
        } else if (e.keyCode === 38 && this.currentItem === 0) {
            this.removeSelected(searchedItems);
            this.currentItem = itemLength;
        } else if (e.keyCode === 38) {
            this.removeSelected(searchedItems);
            this.currentItem--;
            searchedItems[this.currentItem].classList.add("selected");
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if (this.currentItem !== -1) schInput.value = searchedItems[this.currentItem].innerText;
            this.removeSelected(searchedItems);
            searchedResult.classList.remove("shown");
            this.resultShown = false;
            this.currentItem = -1;
        } 
    }

    removeSelected(searchedItems) {
        searchedItems.forEach(item => item.classList.remove("selected"));
    }
}