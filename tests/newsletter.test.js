//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

describe('Newsletter', () => {

    describe('API', () => {
        it('should subscribe', async () => {
            const ret = await viatransit.API.subscribeNewsletter('test@viatransit.fr');

            assert.typeOf(ret.success, 'string');
            assert.strictEqual(ret.success, 'Successful registration');
            assert.strictEqual(ret.code, 'NWSLT3');
        });
    });
});