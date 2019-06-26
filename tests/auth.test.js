//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

describe('Auth', () => {

    describe('API', () => {
        it('(register) should not create an account, already exist', async () => {
            let ret = await viatransit.register('test@viatransit.fr', 'Test12345');

            assert.strictEqual(ret, "User already exist.");
        });
        it('(register) should not create an account, wrong password', async () => {
            let ret = await viatransit.register('wrongpassword@viatransit.fr', 'test');

            assert.strictEqual(ret, "Email or password you entered is wrong.");
        });
        it('(register) should create an account');
        it('(register) should remove an account');
        it('(login) should receive jwt_token', async () => {
            const token = await viatransit.login('test@viatransit.fr', 'Test12345');

            assert.typeOf(token, 'string');
        });
        it("(login) should not receive jwt_token, user doesn't exist", async () => {
            const ret = await viatransit.login('failtest@viatransit.fr', 'noop');

            assert.strictEqual(ret, "Email or password you entered is wrong.");
        });
        it("(login) should not receive jwt_token, wrong password", async () => {
            const ret = await viatransit.login('test@viatransit.fr', 'noop');

            assert.strictEqual(ret, "Email or password you entered is wrong.");
        });
    });
});