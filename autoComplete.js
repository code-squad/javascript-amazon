export default class AutoComplete {
    constructor() {

    }

    init() {
        document.querySelector(".sch-input-wrapper").addEventListener("click", (e => e.preventDefault()));
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
        const schInput = document.querySelector(".sch-input");
        const searchedResult = document.querySelector(".searched-result");
        const url = "http://crong.codesquad.kr:8080/amazon/ac/"

        schInput.addEventListener("input", () => {
            const value = schInput.value;
            this.getData(url, value, searchedResult);
        })
    }
}