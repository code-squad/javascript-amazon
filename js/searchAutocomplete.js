export default class AutoComplete {
  constructor(layer, data) {
    this.element = {
      input: layer.inputEl,
      navSearch: layer.navSearchEl,
      dimmed: layer.dimmedEl,
    }
    this.demoData = data;
    this.ul = document.createElement("ul");
    this.currentFocus;
  }

  closeMatchList() {
    const test = this.element.navSearch.children[1];
    console.log(test);
    // Get input element
    let inputFiled = this.element.input;


    // Get names ul
    let ul = document.getElementById("autoComplete-list");
    let allEl = ul.querySelectorAll("li");
    console.log(ul, allEl);

    for (let val of allEl) {
      console.log(val);
    }
  }

  getMatchedClickItem(childDiv) {
    childDiv.addEventListener("click", (e) => {
      this.element.input.value = e.target.children[1].value;
      e.target.parentNode.remove(e.target.parentNode);
      this.element.dimmed.classList.remove("nav-dimmed-cover-on");
      this.element.dimmed.classList.add("nav-dimmed-cover-off");
    });
  }

  setMatchListEl() {
    this.ul.setAttribute("id", "autoComplete-list");
    this.ul.setAttribute("class", "autocomplete-items");
    this.element.navSearch.appendChild(this.ul);
    return this.ul;
  }

  removeChildNode(inputNode) {
    let wordListVal = inputNode.target.nextElementSibling;
    if (wordListVal) wordListVal.remove(wordListVal);
    this.element.dimmed.classList.remove("nav-dimmed-cover-on");
    this.element.dimmed.classList.add("nav-dimmed-cover-off");
  }

  eventInput() {
    this.element.input.addEventListener("input", (inputNode) => {
      let inputWord = inputNode.target.value;

      fetch(`http://crong.codesquad.kr:8080/amazon/ac/${inputWord}`)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          let matchVal = json.suggestions;
          if (!matchVal) return;
          if (!inputNode || inputWord === "") return this.removeChildNode(inputNode);
          const addDivEl = this.setMatchListEl();

          matchVal.forEach(element => {
            let matchWords = element.value;
            const firstWord = matchWords.substr(0, inputWord.length);
            const checkWord = inputWord.toLowerCase() === firstWord.toLowerCase();

            /* TODO:
            [] Bookmark if조건문 : 추후 Refactoring시 첫글자 만이 아닌 단어 글자들의 조건으로 변경 필요.
            */
            if (checkWord) {
              let childEl = this.createChildEl({ addDivEl, firstWord, inputWord, matchWords });
              this.getMatchedClickItem(childEl);
              this.element.dimmed.classList.remove("nav-dimmed-cover-off");
              this.element.dimmed.classList.add("nav-dimmed-cover-on");
            }
          });

          this.closeMatchList();
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
    this.element.input.addEventListener("keydown", (e) => {
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


  init() {
    this.eventInput();
    this.eventKeydown();
  }
}