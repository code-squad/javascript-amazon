import { typeCollection } from '../../../src/js/Type/typeCollection.js';

describe("typeCollection", () => {
    'use strict';
    const mockData = {
        'string': 'string',
        'number': 1,
        'undefined': undefined,
        'boolean': false,
        'object': {},
        'function': function(){},
        'array': []};
    const spy = jest.fn();
    it("모듈의 반환되는 함수들이 정상적으로 작동한다.", () => {
        typeCollection.forEach(m => {
            spy();
            expect(m.evaluator(mockData[m.name])).toBe(true);
        })
        expect(spy).toHaveBeenCalled();
    })
})