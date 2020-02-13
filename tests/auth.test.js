//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

describe('Auth', () => {

    describe('API', () => {
        it('should login', async () => {
            await viatransit.API.register('user-test@viatransit.fr', 'Test12345');
            const ret = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');

            assert.typeOf(ret.token, 'string');
            assert.typeOf(ret.id, 'string');
        });
    });
});