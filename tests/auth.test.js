//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

describe('Auth', () => {

    describe('API', () => {
        it('should create an account', async () => {
            const log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
            if (log.token && log.id)
                await viatransit.API.deleteProfile(log.token, log.id);
            const ret = await viatransit.API.register('user-test@viatransit.fr', 'Test12345');

            assert.strictEqual(ret, 'User created');
        });
        it('should not create an account, already exist', async () => {
            let ret = await viatransit.API.register('admin-test@viatransit.fr', 'Test12345');

            assert.strictEqual(ret, "User already exist.");
        });
        it('should not create an account, wrong password', async () => {
            let ret = await viatransit.API.register('wrongpassword@viatransit.fr', 'test');

            assert.strictEqual(ret, "Email or password you entered is wrong.");
        });
        it('should not create an account, wrong email', async () => {
            let ret = await viatransit.API.register('wrongemail@viatransit', 'Test12345');

            assert.strictEqual(ret, "Email or password you entered is wrong.");
        });
        it('should receive jwt_token and user id', async () => {
            const ret = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');

            assert.typeOf(ret.token, 'string');
            assert.typeOf(ret.id, 'string');
        });
        it('should not receive jwt_token, user doesn\'t exist', async () => {
            const ret = await viatransit.API.login('failtest@viatransit.fr', 'noop');

            assert.strictEqual(ret, "Email or password you entered is wrong.");
        });
        it('should not receive jwt_token, wrong password', async () => {
            const ret = await viatransit.API.login('user-test@viatransit.fr', 'noop');

            assert.strictEqual(ret, "Email or password you entered is wrong.");
        });
    });
});