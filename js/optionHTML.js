function asyncOptionHTML(){
    const oReq = new XMLHttpRequest;
    
    oReq.open("GET", "./js/options.json");
    oReq.addEventListener("load", function(){
        const select = document.querySelector("#select-category");
        const options = JSON.parse(this.responseText);
        let optionHTML = "";

        options.forEach(option => {
            optionHTML += `<option value="${option.value}">${option.text}</option>`
        });

        select.innerHTML = optionHTML;
    })
    oReq.send();
}

asyncOptionHTML();



