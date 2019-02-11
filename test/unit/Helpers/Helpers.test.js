import { Helpers } from '../../../src/js/Helpers/Helpers';
const helpers = new Helpers();

describe("test", function(){
    it('go', function(){
        expect(helpers.test()).toBeTruthy;
    })
})
