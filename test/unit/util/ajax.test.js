import { ajax } from '../../../src/js/util/ajax.js';

describe("ajax", () => {
    let mockXHR, httpMethod, url;
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
        httpMethod = 'get';
        url = '';
    });
    afterEach(() => {
        mockXHR = null;
        window.XMLHttpRequest = oldXMLHttpRequest;
    });    
    describe("HTTP", () => {
        it("요청이 성공하면 json 데이터가 담긴 프라미스를 반환한다.", () => {
            const reqPromise = ajax({httpMethod, url});
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
        it("요청이 실패하면 오류 메세지를 반환한다.", () => {
            const reqPromise = ajax({httpMethod, url});
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