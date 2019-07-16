//utils
import MyEventEmitter from "../../../Grenutil/MyEventEmitter/index.js";

const dummyData = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false
  },
  {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true
  },
  {
    userId: 1,
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: false
  },
  {
    userId: 1,
    id: 6,
    title: "qui ullam ratione quibusdam voluptatem quia omnis",
    completed: false
  },
  {
    userId: 1,
    id: 7,
    title: "illo expedita consequatur quia in",
    completed: false
  },
  {
    userId: 1,
    id: 8,
    title: "quo adipisci enim quam ut ab",
    completed: true
  },
  {
    userId: 1,
    id: 9,
    title: "molestiae perspiciatis ipsa",
    completed: false
  },
  {
    userId: 1,
    id: 10,
    title: "illo est ratione doloremque quia maiores aut",
    completed: true
  }
];

export default class AutoListView extends MyEventEmitter {
  /**
   * TODO list
   * //1. SearchView에 입력이 있을 때 입력값에 맞는 목록 생성해서 보여줌
   * //2. 보여줄 최대 갯수 옵션으로 받음
   * //3. 목록을 위아래로 움직일 수 있음. (키보드 이벤트)
   * //4. 선택된 값을 전달 가능해야함
   * 5. 마우스 온 됐을 때도 배경 색 바뀌게 해야함.
   * 6. 클릭했을 때 input value 변경하기.
   * 7. 일치 글자 하이라이팅 해야함.
   * //8. debouncing. 딜레이로 기다렸다가 보여주는 방식이 아니라 같은 값 유지가 일정 시간 이상 되었을 때만 하는 것이다!.
   */
  constructor({ maxLen, dataUrl }) {
    super();

    this.maxLen = maxLen;
    this.activatedItemIndex = -1;
    this.currentItemLen = 0;

    this.on("typing", this.searchTypingHandler.bind(this));

    // MyFetch(dataUrl)
    //   .then(data => data.map(item => item.title))
    //   .then(data => this.getFilteredData(inputVal, data))
    //   .then(data => {
    //     if (data.length === 0) this.setShow(false);
    //     else {
    //       this.autoList.innerHTML = this.getTemplate(data);
    //       this.setShow(true);
    //     }
    //   });
  }

  highlightMatchedText(inputVal) {
    //TODO: 일치하는 글자 하이라이팅 구현
  }

  searchTypingHandler(inputVal) {
    if (inputVal === "") {
      this.setShow(false);
      return;
    }
    const dummy = dummyData.map(item => item.title);
    const data = this.getFilteredData(inputVal, dummy);

    if (data.length === 0) this.setShow(false);
    else {
      this.autoList.innerHTML = this.getTemplate(data);
      this.setShow(true);
      this.currentItemList = this.autoList.querySelectorAll("li");
      this.currentItemLen = this.currentItemList.length;

      this.highlightMatchedText(inputVal);
    }
  }

  compareByIndex(a, b) {
    return a.index - b.index;
  }

  getFilteredData(text, data) {
    let filteredData = [...data];

    filteredData = filteredData
      .filter(data => data.includes(text))
      .map(data => ({
        word: data,
        index: data.indexOf(text)
      }))
      .sort(this.compareByIndex)
      .filter((_, index) => index < this.maxLen)
      .map(data => data.word);

    return filteredData;
  }

  getListTemplate(list) {
    const listTemplate = `
      <ul>
        ${list.reduce(
          (html, item) => `
            ${html}
            <li><span>${item}</span></li>
          `,
          ``
        )}
        <li><span>자동 완성</span></li>
      </ul>
    `;

    return listTemplate;
  }

  cacheDom() {
    this.autoList = document.querySelector(".search-auto-list");
  }

  getTemplate(list = []) {
    const template = `
      ${this.getListTemplate(list)}
    `;

    return template;
  }

  setShow(on) {
    this.activatedItemIndex = -1;

    if (on) this.autoList.style.opacity = 1;
    else this.autoList.style.opacity = 0;
  }

  setActivatedItemClass() {
    if (this.currentItemLen === 0) return;

    this.currentItemList.forEach(item => {
      item.classList.remove("activated");
    });

    if (this.activatedItemIndex < 0) return;
    this.currentItemList[this.activatedItemIndex].classList.add("activated");
  }

  attachEvent() {
    const wrapper = document.querySelector(".search-wrapper");
    wrapper.addEventListener("keydown", evt => {
      const { target, key } = evt;

      if (!this.autoList.style.opacity) return;

      if (key === "ArrowDown") {
        this.activatedItemIndex =
          this.activatedItemIndex === this.currentItemLen - 2
            ? -1
            : this.activatedItemIndex + 1;
      } else if (key === "ArrowUp") {
        this.activatedItemIndex =
          this.activatedItemIndex === -1
            ? this.currentItemLen - 2
            : this.activatedItemIndex - 1;
        evt.preventDefault();
      } else if (key === "Enter") {
        if (this.activatedItemIndex === -1) return;

        const selectedVal = this.currentItemList[this.activatedItemIndex]
          .innerText;

        target.value = selectedVal;
        this.searchTypingHandler(target.value);
      }

      this.setActivatedItemClass();
    });
  }
}
