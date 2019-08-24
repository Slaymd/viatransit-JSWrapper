//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const userAssets = require('./assets/users.js');

describe('Users', () => {

    describe('API', () => {
        it('should get own profile', async () => {
            const log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
            const user = await viatransit.API.getProfile(log.token, log.id);

            assert.equal(Object.keys(user).length, 8);
            assert.typeOf(user.email, 'string');
            assert.strictEqual(user.email, "user-test@viatransit.fr");
            assert.typeOf(user.username, 'string');
            assert.typeOf(user.firstname, 'string');
            assert.typeOf(user.lastname, 'string');
            assert.typeOf(user.permissionId, 'string');
            assert.typeOf(user.logId, 'string');
        });
        // it('should get another profile', async () => {
        //     const logUser = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
        //     const logAdmin = await viatransit.API.login('admin-test@viatransit.fr', 'Test12345');
        //     const user = await viatransit.API.getProfile(logAdmin.token, logUser.id);
        //
        //     assert.equal(Object.keys(user).length, 8);
        //     assert.typeOf(user.email, 'string');
        //     assert.strictEqual(user.email, "user-test@viatransit.fr");
        //     assert.typeOf(user.username, 'string');
        //     assert.typeOf(user.firstname, 'string');
        //     assert.typeOf(user.lastname, 'string');
        //     assert.typeOf(user.permissionId, 'string');
        //     assert.typeOf(user.logId, 'string');
        // });
        it('should not get another profile, bad permission', async () => {
            const logAdmin = await viatransit.API.login('admin-test@viatransit.fr', 'Test12345');
            const logUser = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
            const ret = await viatransit.API.getProfile(logUser.token, logAdmin.id);

            assert.strictEqual(ret, "Wrong permissions.");
        });
        it('should not get profile, wrong token', async () => {
            const log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
            const ret = await viatransit.API.getProfile("wrongToken", log.id);

            assert.strictEqual(ret, "Wrong parameters.");
        });
        it('should not get profile, wrong id', async () => {
            const log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
            const ret = await viatransit.API.getProfile(log.token, "wrongId");

            assert.strictEqual(ret, "Wrong parameters.");
        });
        it('should delete own profile', async () => {
            await viatransit.API.register('deleteprofile@viatransit.fr', 'Test12345');
            const log = await viatransit.API.login('deleteprofile@viatransit.fr', 'Test12345');
            const ret = await viatransit.API.deleteProfile(log.token, log.id);

            assert.strictEqual(ret, "User deleted.");
        });
        // it('should delete another profile', async () => {
        //     await viatransit.API.register('deleteprofile@viatransit.fr', 'Test12345');
        //     const logAdmin = await viatransit.API.login('admin-test@viatransit.fr', 'Test12345');
        //     const log = await viatransit.API.login('deleteprofile@viatransit.fr', 'Test12345');
        //     const ret = await viatransit.API.deleteProfile(logAdmin.token, log.id);
        //
        //     assert.strictEqual(ret, "User deleted.");
        // });
        it('should not delete another profile, bad permission', async () => {
            const logUser = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
            const logAdmin = await viatransit.API.login('admin-test@viatransit.fr', 'Test12345');
            const ret = await viatransit.API.deleteProfile(logUser.token, logAdmin.id);

            assert.strictEqual(ret, "Wrong permissions.");
        });
        it('should not delete profile, wrong token', async () => {
            const log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
            const ret = await viatransit.API.deleteProfile("wrongToken", log.token);

            assert.strictEqual(ret, "Wrong parameters.");
        });
        it('should not delete profile, wrong id', async () => {
            const log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
            const ret = await viatransit.API.deleteProfile(log.token, "wrongId");

            assert.strictEqual(ret, "Wrong parameters.");
        });
        it('should update own profile', async () => {
            let log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
            let user = await viatransit.API.getProfile(log.token, log.id);
            user.email = "user-test2@viatransit.fr";
            user.password = "NewPass12";
            user.username = "";
            user.firstname = "";
            user.lastname = "";
            let ret = await viatransit.API.updateProfile(log.token, user);
            assert.strictEqual(ret, "User updated");
            log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
            assert.strictEqual(log, "Email or password you entered is wrong.");
            log = await viatransit.API.login('user-test2@viatransit.fr', 'NewPass12');
            assert.typeOf(log.token, 'string');
            assert.typeOf(log.id, 'string');
            user = await viatransit.API.getProfile(log.token, log.id);
            assert.equal(Object.keys(user).length, 8);
            assert.typeOf(user.email, 'string');
            assert.strictEqual(user.email, "user-test2@viatransit.fr");
            assert.typeOf(user.username, 'string');
            assert.strictEqual(user.username, "");
            assert.typeOf(user.firstname, 'string');
            assert.strictEqual(user.firstname, "");
            assert.typeOf(user.lastname, 'string');
            assert.strictEqual(user.lastname, "");
            assert.typeOf(user.permissionId, 'string');
            assert.typeOf(user.logId, 'string');
            user.email = "user-test@viatransit.fr";
            user.password = "Test12345";
            user.username = "viaTransit";
            user.firstname = "viaTransit";
            user.lastname = "viaTransit";
            ret = await viatransit.API.updateProfile(log.token, user);
            assert.strictEqual(ret, "User updated");
            log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
            assert.typeOf(log.token, 'string');
            assert.typeOf(log.id, 'string');
            user = await viatransit.API.getProfile(log.token, log.id);
            assert.equal(Object.keys(user).length, 8);
            assert.typeOf(user.email, 'string');
            assert.strictEqual(user.email, "user-test@viatransit.fr");
            assert.typeOf(user.username, 'string');
            assert.strictEqual(user.username, "viaTransit");
            assert.typeOf(user.firstname, 'string');
            assert.strictEqual(user.firstname, "viaTransit");
            assert.typeOf(user.lastname, 'string');
            assert.strictEqual(user.lastname, "viaTransit");
            assert.typeOf(user.permissionId, 'string');
            assert.typeOf(user.logId, 'string');
        });
        // it('should update another profile, with permission', async () => {
        //     const logUser = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
        //     const logAdmin = await viatransit.API.login('admin-test@viatransit.fr', 'Test12345');
        //     let user = await viatransit.API.getProfile(logAdmin.token, logUser.id);
        //     user.username = "viaTransitAdminTest";
        //     let ret = await viatransit.API.updateProfile(logAdmin.token, user);
        //     assert.strictEqual(ret, "User updated");
        //     user = await viatransit.API.getProfile(logUser.token, logUser.id);
        //     assert.equal(Object.keys(user).length, 8);
        //     assert.typeOf(user.email, 'string');
        //     assert.strictEqual(user.email, "user-test@viatransit.fr");
        //     assert.typeOf(user.username, 'string');
        //     assert.strictEqual(user.username, "viaTransitAdminTest");
        //     assert.typeOf(user.firstname, 'string');
        //     assert.strictEqual(user.firstname, "viaTransit");
        //     assert.typeOf(user.lastname, 'string');
        //     assert.strictEqual(user.lastname, "viaTransit");
        //     assert.typeOf(user.permissionId, 'string');
        //     assert.typeOf(user.logId, 'string');
        //     user.username = "viaTransit";
        //     ret = await viatransit.API.updateProfile(logAdmin.token, user);
        //     assert.strictEqual(ret, "User updated");
        //     user = await viatransit.API.getProfile(logUser.token, logUser.id);
        //     assert.equal(Object.keys(user).length, 8);
        //     assert.typeOf(user.email, 'string');
        //     assert.strictEqual(user.email, "user-test@viatransit.fr");
        //     assert.typeOf(user.username, 'string');
        //     assert.strictEqual(user.username, "viaTransit");
        //     assert.typeOf(user.firstname, 'string');
        //     assert.strictEqual(user.firstname, "viaTransit");
        //     assert.typeOf(user.lastname, 'string');
        //     assert.strictEqual(user.lastname, "viaTransit");
        //     assert.typeOf(user.permissionId, 'string');
        //     assert.typeOf(user.logId, 'string');
        // });
        it('should not updater another profile, bad permission', async () => {
            const logAdmin = await viatransit.API.login('admin-test@viatransit.fr', 'Test12345');
            const logUser = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
            let user = await viatransit.API.getProfile(logAdmin.token, logAdmin.id);
            user.firstname = "bad permission";
            let ret = await viatransit.API.updateProfile(logUser.token, user);
            assert.strictEqual(ret, "Wrong permissions.");
        });
        it('should not update profile, wrong token', async () => {
            const log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
            const user = await viatransit.API.getProfile(log.token, log.id);
            const ret = await viatransit.API.updateProfile("wrongToken", user);
            assert.strictEqual(ret, "Bad token.");
        });
        it('should not update profile, wrong email', async () => {
            const log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
            const user = await viatransit.API.getProfile(log.token, log.id);
            user.email = "viatransit@viatransit";
            const ret = await viatransit.API.updateProfile(log.token, user);
            assert.strictEqual(ret, "Email you entered is wrong.");
        });
        it('should not update profile, wrong password', async () => {
            const log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
            const user = await viatransit.API.getProfile(log.token, log.id);
            user.password = "pass";
            const ret = await viatransit.API.updateProfile(log.token, user);
            assert.strictEqual(ret, "Password you entered is wrong.");
        });
        it('should not update profile, email already used', async () => {
            const log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
            const user = await viatransit.API.getProfile(log.token, log.id);
            user.email = "admin-test@viatransit.fr";
            const ret = await viatransit.API.updateProfile(log.token, user);
            assert.strictEqual(ret, "Email you entered is wrong.");
        });
        // it('should not update profile, username already used', async () => {
        //     const log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
        //     const user = await viatransit.API.getProfile(log.token, log.id);
        //     user.username = "Admin";
        //     const ret = await viatransit.API.updateProfile(log.token, user);
        //     assert.strictEqual(ret, "Username you entered is wrong.");
        // });
        //TODO Tests de permissions
    });

    describe('Model', () => {
        it('should be properly filled from Database', () => {
            let user = new viatransit.User();

            user.fillFromDatabase(userAssets.dbFormat);
            assert.typeOf(user.email, 'string');
            assert.strictEqual(user.email, "camille.monjo@viatransit.fr");
            assert.typeOf(user.password, 'string');
            assert.strictEqual(user.password, "azerty");
            assert.typeOf(user.username, 'string');
            assert.strictEqual(user.username, "CMonjo");
            assert.typeOf(user.firstname, 'string');
            assert.strictEqual(user.firstname, "");
            assert.typeOf(user.lastname, 'string');
            assert.strictEqual(user.lastname, "");
            assert.typeOf(user.permissionId, 'string');
            assert.strictEqual(user.permissionId, "");
            assert.typeOf(user.logId, 'string');
            assert.strictEqual(user.logId, "");
            assert.isObject(user.attributes);
        });

        it('should be properly filled from API', () => {
            let user = new viatransit.User();

            user.fillFromAPI(userAssets.apiFormat);
            assert.typeOf(user.email, 'string');
            assert.strictEqual(user.email, "camille.monjo@viatransit.fr");
            assert.typeOf(user.password, 'string');
            assert.strictEqual(user.password, "azerty");
            assert.typeOf(user.username, 'string');
            assert.strictEqual(user.username, "CMonjo");
            assert.typeOf(user.firstname, 'string');
            assert.strictEqual(user.firstname, "Camille");
            assert.typeOf(user.lastname, 'string');
            assert.strictEqual(user.lastname, "Monjo");
            assert.typeOf(user.permissionId, 'string');
            assert.strictEqual(user.permissionId, "3467890");
            assert.typeOf(user.logId, 'string');
            assert.strictEqual(user.logId, "6237980422");
            assert.isObject(user.attributes);
        });
    });
});