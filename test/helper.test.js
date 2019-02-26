import helper from '../src/js/helper.js';

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

jest
  .dontMock('fs');

describe ("Helper 함수", () => {

  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  })

  it ("qs함수에 selector를 넣어 호출하면 해당 selector를 가진 엘리먼트를 반환한다.", () => {
    expect(helper.qs('.main__btn')).toBe(document.querySelector('.main__btn'));
  })

  it ("addClass함수에 엘리먼트와 클래스 이름을 넣어 호출하면, 엘리먼트에 클래스를 추가한다.", () => {
    const btn = document.querySelector('.main__btn');
    helper.addClass(btn, 'test');
    expect(btn.classList.contains('test')).toBeTruthy();
  })

  it ("removeClass함수에 엘리먼트와 클래스 이름을 넣어 호출하면, 엘리먼트에 클래스를 제거한다.", () => {
    const btn = document.querySelector('.main__btn');
    helper.removeClass(btn, 'main__btn');
    expect(btn.classList.contains('main__btn')).toBeFalsy();
  })
})
