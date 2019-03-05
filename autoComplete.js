export default class AutoComplete {
    constructor() {
        this.currentItem = 0;
    }

    init() {
        this.addEvent();
    }

    getData(url, value, searchedResult) {
        fetch(url + value)
            .then(response => response.json())
            .then(data => {
                let arr = data.suggestions;
                let temp = "";
                arr.forEach(v => temp += `<li class="searched-item">${v.value}</li>`);
                searchedResult.innerHTML = temp;
                searchedResult.style.display = 'block';
            })
            .catch(err => console.log(err));
    }

    addEvent() {
        const inputWrapper = document.querySelector(".sch-input-wrapper");
        const schInput = document.querySelector(".sch-input");
        const searchedResult = document.querySelector(".searched-result");
        const url = "http://crong.codesquad.kr:8080/amazon/ac/"
        inputWrapper.addEventListener("click", (e) => e.preventDefault);
        schInput.addEventListener("input", () => {
            const value = schInput.value;
            this.getData(url, value, searchedResult);
        });
        schInput.addEventListener("keydown", (e) => this.checkKeyCode(e, schInput, searchedResult));
    }

    checkKeyCode(e, schInput, searchedResult) {
        const searchedItems = document.querySelectorAll(".searched-item");
        const itemLength = searchedItems.length;
        console.log(this.currentItem)
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
            schInput.value = searchedItems[this.currentItem - 1].innerText;
            this.removeSelected(searchedItems);
            searchedResult.style.display = 'none';
            this.currentItem = 0;
        }
    }

    removeSelected(searchedItems) {
        searchedItems.forEach(item => item.classList.remove("selected"));
    }
}