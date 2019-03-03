import { defaultTypes } from '../../../../src/js/util/typeCollection/defaultTypes';

describe("defaultTypes", () => {
    'use strict';
    let mockData, spy;
    beforeEach(()=>{
        mockData = {
            'string': 'string',
            'number': 1,
            'undefined': undefined,
            'boolean': false,
            'object': {},
            'function': function(){},
            'array': []};
        spy = jest.fn();
    })
    
    it("규약에 맞지 않은 결과가 나오면 false를 반환한다.", ()=>{
        mockData = {'string':1};
        defaultTypes.forEach(m => {
            spy();
            if(mockData[m.name]){
                expect(m.evaluator(mockData[m.name])).toBe(false);
            }
        })
        expect(spy).toHaveBeenCalled();
    })
    it("데이터들이 규약을 따르면 true가 반환된다.", () => {
        defaultTypes.forEach(m => {
            spy();
            if(mockData[m.name]){
                expect(m.evaluator(mockData[m.name])).toBe(true);
            }
        })
        expect(spy).toHaveBeenCalled();
    })
})