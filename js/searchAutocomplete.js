export default class AutoComplete {
  constructor(layer, data) {
    this.layer = {
      inputEle: layer.inputEle,
      autoCompleteEl: layer.autoComplete,
      dimmedEle: layer.dimmedEle,
    }
    this.demoData = data;
    this.div = document.createElement("DIV");
    this.currentFocus;
  }

  closeMatchList(inputValue, inputNode) {
    if (inputValue) {
      console.log(inputValue);
    }
  }

  getMatchedClickItem(childDiv) {
    childDiv.addEventListener("click", (e) => {
      this.layer.inputEle.value = e.target.children[1].value;
      e.target.parentNode.remove(e.target.parentNode);
      this.layer.dimmedEle.classList.remove("nav-dimmed-cover-on");
      this.layer.dimmedEle.classList.add("nav-dimmed-cover-off");
    });
  }

  setMatchListEl() {
    this.div.setAttribute("id", "autoComplete-list");
    this.div.setAttribute("class", "autocomplete-items");
    this.layer.autoCompleteEl.appendChild(this.div);
    return this.div;
  }

  removeChildNode(inputNode) {
    let wordListVal = inputNode.target.nextElementSibling;
    if (wordListVal) wordListVal.remove(wordListVal);
    this.layer.dimmedEle.classList.remove("nav-dimmed-cover-on");
    this.layer.dimmedEle.classList.add("nav-dimmed-cover-off");
  }


  eventInput() {
    this.layer.inputEle.addEventListener("input", (inputNode) => {
      let inputWord = inputNode.target.value;

      fetch(`http://crong.codesquad.kr:8080/amazon/ac/${inputWord}`)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          let matchVal = json.suggestions;
          if (!matchVal) return;
          if (!inputNode || inputWord === "") return this.removeChildNode(inputNode);
          this.closeMatchList(inputWord);
          this.currentFocus = -1;
          const addDivEl = this.setMatchListEl();

          matchVal.forEach(element => {
            let matchWords = element.value;
            const firstWord = matchWords.substr(0, inputWord.length);
            const checkWord = inputWord.toUpperCase() === firstWord.toUpperCase();

            /* TODO:
            [] Bookmark if조건문 : 추후 Refactoring시 첫글자 만이 아닌 단어 글자들의 조건으로 변경 필요.
            */
            if (checkWord) {
              let childEl = this.createChildEl({ addDivEl, firstWord, inputWord, matchWords });
              this.getMatchedClickItem(childEl);
              this.layer.dimmedEle.classList.remove("nav-dimmed-cover-off");
              this.layer.dimmedEle.classList.add("nav-dimmed-cover-on");
            }
          });
        })
    });
  }

  createChildEl({ addDivEl, firstWord, inputWord, matchWords }) {
    addDivEl.innerHTML += `
    <li>
    <strong>${firstWord}</strong>${matchWords.substr(inputWord.length)}
    <input type="hidden" value=${matchWords} class="matched-item"></input>
    </li>
    `.trim();
    return addDivEl;
  }

  eventKeydown() {
    this.layer.inputEle.addEventListener("keydown", (e) => {
      let x = document.getElementById("autoComplete-list");

      console.log(x, e.keyCode)

      // if (e.keyCode === 40) {
      //   this.currentFocus++;
      //   this.addActive(x);
      // } else if (e.keyCode === 38) {
      //   this.currentFocus--;
      //   this.addActive(x);
      // } else if (e.keyCode === 13) {
      //   e.preventDefault();
      //   if (this.currentFocus > -1) {
      //     if (x) x[this.currentFocus].click();
      //   }
      // }
    });
  }

  addActive(x) {
    if (!x) return false;
    this.removeActive(x);
    if (this.currentFocus >= x.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[this.currentFocus].classList.add("autocomplete-active");
  }

  removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    console.log(x);
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  init() {
    this.eventInput();
    this.eventKeydown();
  }
}