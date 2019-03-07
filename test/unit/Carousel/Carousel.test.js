import { Carousel } from '../../../src/js/components/Carousel/Carousel.js';
import { render } from '../testHelpers';

describe("Carousel", ()=>{
    'use strict';
    describe("생성", () => {
        it("'new' 키워드로 호출되지 않았으면 예외를 던진다.", () => {
            expect(() => {
                Carousel()
            }).toThrow();
        })
        it("delay옵션을 설정하고 'new' 키워드로 호출되었으면 예외를 던지지 않는다.", () => {
            expect(
                new Carousel({delay: 3000})
            ).toBeInstanceOf(Carousel);
        })
    })
    const carousel = new Carousel({delay:3000});
    const oldXMLHttpRequest = window.XMLHttpRequest;
    let spy, dom, container, childs, slides, mockXHR;
    const createMockXHR = (responseJSON) => {
        const mockXHR = {
            open: jest.fn(),
            send: jest.fn(),
            readyState: 4,
            status: 200,
            responseText: JSON.stringify(
                responseJSON || {}
            )
        };
        return mockXHR;
    }
    
    beforeAll(() => {
        dom = render(`
            <ul data-testid="exploreVideo">
                <li data-testid="test"></li>
                <li data-testid="test"></li>
                <li data-testid="test"></li>
            </ul>
        `);
        container = dom.$getTestEl("exploreVideo");
        childs = dom.$getTestElAll("test");
    });
    describe("runAutoMove(slides)", () => {
        jest.useFakeTimers();
        beforeEach(()=>{
            slides = [container];
            carousel.runAutoMove(slides);
        })
        it("재귀적으로 호출된다.", () => {
            expect(setTimeout).toHaveBeenCalledTimes(1);
            expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
        })
        it("controlSlides 콜백 메소드가 호출된다.", () => {
            spy = jest.spyOn(carousel, "controlSlides");
            carousel.runAutoMove(slides);
            expect(spy).toHaveBeenCalled();
        })
    })
    describe("controlSlides(slides, direction, i)", () => {
        jest.useFakeTimers(3000);
        it("next, previous 버튼 이벤트 실행시 이전에 요청된 setTimeout 콜백 함수 실행이 중지된다.", () => {
            spy = jest.spyOn(window, 'clearTimeout');
            slides = [container];
            carousel.runAutoMove(slides);
            expect(spy).toHaveBeenCalled();
        })
        it("인자로 들어온 값들의 스타일에 transform이 추가된다.", () => {
            carousel.controlSlides(slides);
            for(let slide of slides){
                expect(slide.style.transform).toBe("translateX(0%) translateY(0%)");
            }
        });
    })
    describe("setPageNumber(slides, direction)", () => {
        it("direction이 next일때 페이지 넘버는 1씩 증가한다.", () => {
            let pNum = carousel.pNum;
            carousel.setPageNumber(childs, "next");
            expect(carousel.pNum).toBe(pNum + 1);
        })
        it("direction이 previous일때 페이지 넘버는 1씩 감소한다.", () => {
            let pNum = carousel.pNum;
            carousel.setPageNumber(childs, "previous");
            expect(carousel.pNum).toBe(pNum - 1);
        })
        it("맨 마지막 슬라이드에서 next가 실행되면 페이지 넘버는 0이 된다.", () => {
            carousel.pNum = 2;
            carousel.setPageNumber(childs, "next");
            expect(carousel.pNum).toBe(0);
        })
        it("맨 첫 슬라이드에서 previous가 실행되면 페이지 넘버는 슬라이드의 마지막번째 숫자가 된다.", () => {
            carousel.pNum = 0;
            carousel.setPageNumber(childs, "previous");
            expect(carousel.pNum).toBe(childs.length - 1);
        })
    })
    describe("render()", () => {
        beforeEach(() => {
            mockXHR = createMockXHR();
            window.XMLHttpRequest = jest.fn(() => mockXHR);
        });
        afterEach(() => {
            mockXHR = null;
            window.XMLHttpRequest = oldXMLHttpRequest;
        });    
        it("url의 정보에 따른 새 엘리먼트가 추가된다..", () => {
            const reqPromise = carousel.render({
                httpMethod:'get', 
                url: '../../../data/data.json', 
                parent: container, 
                tagName: 'li', 
                className: 'test'
            });
            mockXHR.responseText = JSON.stringify([
                    { imgurl: '../../../data/data.json' }
            ]);
            mockXHR.onreadystatechange();
            reqPromise.then((posts) => {
                expect(posts.tagName).toBe("UL");
                expect(posts.firstElementChild.tagName).toBe("LI");
            });
        })
    })
})