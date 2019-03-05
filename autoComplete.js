export default class AutoComplete {
    constructor() {
        this.currentItem = 0;
        this.keyHasDown = false;
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
        console.log(e.keyCode)
        const searchedItems = document.querySelectorAll(".searched-item");
        const itemLength = searchedItems.length;
        if (this.currentItem < 0) this.currentItem = 0;
        else if (e.keyCode === 38 && this.keyHasDown && this.currentItem === 0) {
            this.keyHasDown = false;
            return;
        } else if (this.keyHasDown && this.currentItem === itemLength) {
            this.currentItem = itemLength - 1;
            return;
        } else if (e.keyCode === 40) {
            searchedItems[this.currentItem].style.backgroundColor = 'slateblue';
            this.currentItem++;
            this.keyHasDown = true;
        } else if (e.keyCode === 38) {
            searchedItems[this.currentItem].style.backgroundColor = 'white';
            this.currentItem--;
            this.keyHasDown = true;
        } else if (e.keyCode === 13) {
            schInput.value = searchedItems[this.currentItem - 1].innerText;
            searchedResult.style.display = 'none';
            this.currentItem = 0;
            this.keyHasDown = false;
        }
        return;
    }
}