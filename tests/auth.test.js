//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

describe('Auth', () => {

    describe('API', () => {
        it('should create an account', async () => {
            const ret = await viatransit.API.register('user-test@viatransit.fr', 'Test12345');

            assert.strictEqual(ret.success, 'User created');
            assert.strictEqual(ret.code, 'RGS4');
        });
        it('should receive jwt_token and user id', async () => {
            const ret = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');

            assert.typeOf(ret.token, 'string');
            assert.typeOf(ret.id, 'string');
        });
    });
});