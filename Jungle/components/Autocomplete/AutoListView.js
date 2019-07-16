const dummyData = [
  {
    title: "iphone"
  },
  {
    title: "ipad"
  },
  {
    title: "imac"
  },
  {
    title: "ipod"
  },
  {
    title: "iphoneX"
  },
  {
    title: "iphone6"
  },
  {
    title: "apple watch"
  }
];

import SearchInfoView from "./SearchInfoView.js";

export default class AutoListView extends SearchInfoView {
  /**
   * TODO list
   * //1. SearchView에 입력이 있을 때 입력값에 맞는 목록 생성해서 보여줌
   * //2. 보여줄 최대 갯수 옵션으로 받음
   * //3. 목록을 위아래로 움직일 수 있음. (키보드 이벤트)
   * //4. 선택된 값을 전달 가능해야함
   * 5. 마우스 온 됐을 때도 배경 색 바뀌게 해야함.
   * 6. 클릭했을 때 input value 변경하기.
   * //7. 일치 글자 하이라이팅 해야함.
   * //8. debouncing. 딜레이로 기다렸다가 보여주는 방식이 아니라 같은 값 유지가 일정 시간 이상 되었을 때만 하는 것이다!.
   */
  constructor({ maxLen, dataUrl, title }) {
    super({ maxLen, title });

    this.on("typing", this.searchTypingHandler.bind(this));
  }

  getParsedText({ inputVal, innerText }) {
    // let start = innerText.indexOf(inputVal);
    // let end = start + inputVal.length;
    // let newInnerHtml = innerText
    //   .split("")
    //   .map((c, idx) => {
    //     //TODO: refactoring
    //     if (idx === start) c = "<span class='highlighted'>" + c;
    //     else if (idx === end) c = "</span>" + c;
    //     return c;
    //   })
    //   .join("");
    // return newInnerHtml;
  }

  highlightMatchedText(text, filteredData) {
    //TODO: 일치하는 글자 하이라이팅 구현
    filteredData
      .map(liItem => {
        return liItem.querySelector("span");
      })
      .map(spanItem => {
        spanItem.innerHTML = this.getParsedText({
          inputVal,
          innerText: spanItem.innerText
        });
      });
  }

  getHighlightParsedText({
    text,
    startIndex,
    endIndex
  }) {
    let parsedText = text
      .split("")
      .map((c, index) => {
        //TODO: refactoring
        if (index === startIndex) c = "<span class='highlighted'>" + c;
        else if (index === endIndex) c = "</span>" + c;
        return c;
      })
      .join("");
    return parsedText;
  }

  compareByIndex(a, b) {
    return a.startIndex - b.startIndex;
  }

  getFilteredData(text) {
    let filteredData = dummyData.map(data => data.title);

    filteredData = filteredData
      .filter(data => data.includes(text))
      .map(data => ({
        text: data,
        startIndex: data.indexOf(text),
        endIndex: data.indexOf(text) + text.length
      }))
      .sort(this.compareByIndex)
      .filter((_, index) => index < this.maxLen)
      .map(data => this.getHighlightParsedText(data));

    return filteredData;
  }

  getTemplate(text) {
    const filteredData = this.getFilteredData(text);

    return (filteredData.length > 0)
      ? this.getListTemplate({
          list: filteredData,
          listClassName: "autocomplete-list"
        })
      : null
  }

  setActivatedIndexItem(idx) {
    // this.activatedItemIndex = idx;
    // this.setActivatedItemClass();
  }

  mouseOverHandler(target) {
    // let currTarget = target;
    // const liElement = target.closest("li");
    // if (liElement.classList.contains("search-info-title")) return;
    // if (target.tagName === "SPAN") currTarget = target.closest("li");
    // else if (!target.classList.contains("auto-list-item")) return;
    // this.setActivatedIndexItem(Number(currTarget.dataset.idx));
  }

  mouseOutHandler() {
    // this.setActivatedIndexItem(-1);
  }

  mouseClickHandler(target) {
    // const liElement = target.closest("li");
    // if (liElement.classList.contains("search-info-title")) return;
    // const searchInput = document.querySelector("input[type=search]");
    // searchInput.value = liElement.innerText;
    // console.log(liElement);
    // this.searchTypingHandler(searchInput.value);
  }

  attachMouseEvent() {
    // this.autoList.addEventListener("click", ({ target }) =>
    //   this.mouseClickHandler(target)
    // );
    // this.autoList.addEventListener("mouseover", ({ target }) =>
    //   this.mouseOverHandler(target)
    // );
    // this.autoList.addEventListener("mouseout", () => this.mouseOutHandler());
  }

  searchTypingHandler(inputVal) {
    // if (inputVal === "") {
    //   this.setShow(false);
    //   return;
    // }
    // const dummy = dummyData.map(item => item.title);
    // const data = this.getFilteredData(inputVal, dummy);
    // if (data.length === 0) this.setShow(false);
    // else {
    //   this.autoList.innerHTML = this.getTemplate(data);
    //   this.setShow(true);
    //   this.currentItemList = [...this.autoList.querySelectorAll("li")];
    //   this.currentItemList.pop();
    //   this.currentItemLen = this.currentItemList.length;
    //   this.highlightMatchedText(inputVal);
    //   this.attachMouseEvent();
    // }
  }

  cacheDom() {
    //   this.autoList = document.querySelector(".search-auto-list");
    // }
    // getTemplate(list = []) {
    //   const template = `
    //     ${this.getListTemplate(list)}
    //   `;
    //   return template;
    // }
    // setShow(on) {
    //   this.activatedItemIndex = -1;
    //   if (on) this.autoList.style.display = "block";
    //   else this.autoList.style.display = "none";
  }

  setActivatedItemClass() {
    //   if (this.currentItemLen === 0) return;
    //   this.currentItemList.forEach(item => {
    //     item.classList.remove("activated");
    //   });
    //   if (this.activatedItemIndex < 0) return;
    //   this.currentItemList[this.activatedItemIndex].classList.add("activated");
  }

  attachEvent() {
    //   const wrapper = document.querySelector(".search-wrapper");
    //   wrapper.addEventListener("keydown", evt => {
    //     const { target, key } = evt;
    //     if (this.autoList.style.display === "none") return;
    //     if (key === "ArrowDown") {
    //       this.activatedItemIndex =
    //         this.activatedItemIndex === this.currentItemLen - 1
    //           ? -1
    //           : this.activatedItemIndex + 1;
    //     } else if (key === "ArrowUp") {
    //       this.activatedItemIndex =
    //         this.activatedItemIndex === -1
    //           ? this.currentItemLen - 1
    //           : this.activatedItemIndex - 1;
    //       evt.preventDefault();
    //     } else if (key === "Enter") {
    //       if (this.activatedItemIndex === -1) return;
    //       const selectedVal = this.currentItemList[this.activatedItemIndex]
    //         .innerText;
    //       target.value = selectedVal;
    //       this.searchTypingHandler(target.value);
    //       evt.preventDefault();
    //     }
    //     this.setActivatedItemClass();
    //   });
  }
}
