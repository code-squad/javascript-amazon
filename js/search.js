import { $ } from './util.js';

let time;

function init() {
    const input = $("input");
    input.addEventListener("input", function (evt) {
        clearTimeout(time);
        const input = evt.target.value;
        if (input !== "") {
            time = setTimeout(fetchTest, 300, input);
        }
    });
}

function fetchTest(input) {
    fetch("http://localhost:8080/wordSearch", {
        method: 'POST',
        body: input
    })
        .then(rep => rep.json())
        .then(json => console.log(json));
}

export default init;