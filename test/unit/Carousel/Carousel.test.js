import { Carousel } from '../../../src/js/components/Carousel/Carousel.js';

describe("Carousel", ()=>{
    'use strict';
    describe("생성", () => {
        it("'new' 키워드로 호출되지 않았으면 예외를 던진다.", () => {
            expect(() => {
                Carousel()
            }).toThrow();
        })
        it("'new' 키워드로 호출되었으면 예외를 던지지 않는다.", () => {
            expect(
                new Carousel()
            ).toBeInstanceOf(Carousel);
        })
    })
    const carousel = new Carousel();
    let data, xml, mockXHR;

    describe("getImages()", () => {
        describe("HTTP ", () => {
            const oldXMLHttpRequest = window.XMLHttpRequest;
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
            beforeEach(() => {
                mockXHR = createMockXHR();
                window.XMLHttpRequest = jest.fn(() => mockXHR);
            });
            afterEach(() => {
                mockXHR = null;
                window.XMLHttpRequest = oldXMLHttpRequest;
            });    
            
            it("요청이 성공하면 json 데이터가 담긴 프라미스를 반환한다.", () => {
                const reqPromise = carousel.getImages();
                mockXHR.responseText = JSON.stringify([
                        { name: 'Kim' },
                        { name: 'Lee' }
                ]);
                mockXHR.onreadystatechange();
                reqPromise.then((posts) => {
                    expect(posts.length).toBe(2);
                    expect(posts[0].name).toBe('Kim');
                    expect(posts[1].name).toBe('Lee');
                });
            })
            it("요청이 실패하면 예외를 던진다.", () => {
                const reqPromise = carousel.getImages();
                mockXHR.responseText = JSON.stringify({
                    error: 'Failed to GET posts'
                });
                mockXHR.status = 404;
                mockXHR.onreadystatechange();
                reqPromise.catch(err => {
                    expect(err).toBe('Failed to GET posts');
                });
            })
        })
    })
})