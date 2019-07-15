//utils
import MyFetch from "../../../Grenutil/MyFetch/index.js";
import MyEventEmitter from "../../../Grenutil/MyEventEmitter/index.js";

const dummyData = [
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
  {
    "userId": 1,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
  },
  {
    "userId": 1,
    "id": 4,
    "title": "et porro tempora",
    "completed": true
  },
  {
    "userId": 1,
    "id": 5,
    "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    "completed": false
  },
  {
    "userId": 1,
    "id": 6,
    "title": "qui ullam ratione quibusdam voluptatem quia omnis",
    "completed": false
  },
  {
    "userId": 1,
    "id": 7,
    "title": "illo expedita consequatur quia in",
    "completed": false
  },
  {
    "userId": 1,
    "id": 8,
    "title": "quo adipisci enim quam ut ab",
    "completed": true
  },
  {
    "userId": 1,
    "id": 9,
    "title": "molestiae perspiciatis ipsa",
    "completed": false
  },
  {
    "userId": 1,
    "id": 10,
    "title": "illo est ratione doloremque quia maiores aut",
    "completed": true
  },
];

export default class AutoListView extends MyEventEmitter {
  /**
   * TODO list
   * 1. SearchView에 입력이 있을 때 입력값에 맞는 목록 생성해서 보여줌
   * 2. 보여줄 최대 갯수 옵션으로 받음
   * 3. 목록을 위아래로 움직일 수 있음. (키보드 이벤트)
   * 4. 선택된 값을 전달 가능해야함
   */
  constructor({ maxLen, dataUrl }) {
    super();

    this.maxLen = maxLen;

    this.on("typing", inputVal => {
      if (inputVal === "") {
        this.setShow(false);
        return;
      }

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

      const dummy = dummyData.map(item => item.title);

      const data = this.getFilteredData(inputVal, dummy);
      if(data.length === 0) this.setShow(false);
      else {
        this.autoList.innerHTML = this.getTemplate(data);
        this.setShow(true);
      }
    });
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
    if (on) this.autoList.style.opacity = 1;
    else this.autoList.style.opacity = 0;
  }
}
