//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const permissionAssets = require('./assets/permissions.js');

describe('Permissions', () => {

    describe('API', () => {
        //GET
    //     it('should get own permissions', async () => {
    //         const log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
    //         const permission = await viatransit.API.getPermissions(log.token, log.id);
    //
    //         assert.equal(Object.keys(permission).length, 3);
    //         assert.typeOf(permission.id, 'string');
    //         assert.isArray(permission.permissions);
    //     });
    //     it('should get another permissions', async () => {
    //         const logUser = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
    //         const logAdmin = await viatransit.API.login('admin-test@viatransit.fr', 'Test12345');
    //         const permission = await viatransit.API.getPermissions(logAdmin.token, logUser.id);
    //
    //         assert.equal(Object.keys(permission).length, 3);
    //         assert.typeOf(permission.id, 'string');
    //         assert.isArray(permission.permissions);
    //     });
    //     it('should not get another permissions, bad permission', async () => {
    //         const logAdmin = await viatransit.API.login('admin-test@viatransit.fr', 'Test12345');
    //         const logUser = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
    //         const ret = await viatransit.API.getPermissions(logUser.token, logAdmin.id);
    //
    //         assert.strictEqual(ret, "Wrong permissions.");
    //     });
    //     it('should not get permissions, wrong token', async () => {
    //         const log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
    //         const ret = await viatransit.API.getProfile("wrongToken", log.id);
    //
    //         assert.strictEqual(ret, "Wrong parameters.");
    //     });
    //     it('should not get permissions, wrong id', async () => {
    //         const log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
    //         const ret = await viatransit.API.getProfile(log.token, "wrongId");
    //
    //         assert.strictEqual(ret, "Wrong parameters.");
    //     });
    //
    //     //UPDATE
    //     it('should update own permissions', async () => {
    //         let logUser = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
    //         let logAdmin = await viatransit.API.login('admin-test@viatransit.fr', 'Test12345');
    //         let permissions = await viatransit.API.getPermissions(logUser.token, logUser.id);
    //         permissions.permissions.push("users.get.all");
    //         permissions.attributes = {};
    //         let ret = await viatransit.API.updatePermissions(logUser.token, logUser.id, permissions);
    //         assert.strictEqual(ret, "Permissions updated");
    //         permissions = await viatransit.API.getPermissions(logUser.token, logUser.id);
    //         assert.isTrue((permissions.permissions.indexOf("users.get.all") > -1));
    //         ret = await viatransit.API.getProfile(logUser.token, logAdmin.id);
    //         assert.strictEqual(ret.email, "admin-test@viatransit.fr");
    //         permissions.permissions.splice(permissions.permissions.indexOf("users.get.all"), 1);
    //         ret = await viatransit.API.updatePermissions(logUser.token, logUser.id, permissions);
    //         assert.strictEqual(ret, "Permissions updated");
    //         ret = await viatransit.API.getProfile(logUser.token, logAdmin.id);
    //         assert.strictEqual(ret, "Wrong permissions.");
    //         permissions = await viatransit.API.getPermissions(logUser.token, logUser.id);
    //         assert.isFalse((permissions.permissions.indexOf("users.get.all") > -1));
    //     });
    //     it('should update another permissions, with permission', async () => {
    //         let logUser = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
    //         let logAdmin = await viatransit.API.login('admin-test@viatransit.fr', 'Test12345');
    //         let permissions = await viatransit.API.getPermissions(logUser.token, logUser.id);
    //
    //         permissions.permissions.push("permission.test");
    //         permissions.attributes = {};
    //         let ret = await viatransit.API.updatePermissions(logAdmin.token, logUser.id, permissions);
    //         assert.strictEqual(ret, "Permissions updated");
    //         permissions = await viatransit.API.getPermissions(logUser.token, logUser.id);
    //         assert.isTrue((permissions.permissions.indexOf("permission.test") > -1));
    //         permissions.permissions.splice(permissions.permissions.indexOf("permission.test"), 1);
    //         ret = await viatransit.API.updatePermissions(logAdmin.token, logUser.id, permissions);
    //         assert.strictEqual(ret, "Permissions updated");
    //         permissions = await viatransit.API.getPermissions(logUser.token, logUser.id);
    //         assert.isFalse((permissions.permissions.indexOf("permission.test") > -1));
    //     });
    //     it('should not updater another permissions, bad permission', async () => {
    //         const logAdmin = await viatransit.API.login('admin-test@viatransit.fr', 'Test12345');
    //         const logUser = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
    //         let permissions = await viatransit.API.getPermissions(logAdmin.token, logAdmin.id);
    //         let ret = await viatransit.API.updatePermissions(logUser.token, logAdmin.id, permissions);
    //         assert.strictEqual(ret, "Wrong permissions.");
    //     });
    //     it('should not update permissions, wrong token', async () => {
    //         const log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
    //         let permissions = await viatransit.API.getPermissions(log.token, log.id);
    //         permissions.permissions.push("bad permission");
    //         let ret = await viatransit.API.updatePermissions("Wrong token", log.id, permissions);
    //         assert.strictEqual(ret, "Bad token.");
    //     });
    //     it('should not update permissions, changing permission id', async () => {
    //         const log = await viatransit.API.login('user-test@viatransit.fr', 'Test12345');
    //         let permissions = await viatransit.API.getPermissions(log.token, log.id);
    //         permissions.permissions.push("bad permission");
    //         permissions.id = "cannotDoThat";
    //         let ret = await viatransit.API.updatePermissions(log.token, log.id, permissions);
    //         assert.strictEqual(ret, "Wrong parameters.");
    //     });
    });

    describe('Model', () => {
        it('should be properly filled from Database', () => {
            let permission = new viatransit.Permission();

            permission.fillFromDatabase(permissionAssets.dbFormat);
            assert.typeOf(permission.id, 'string');
            assert.strictEqual(permission.id, "2684335908");
            assert.isArray(permission.permissions);
            for (let perm of permission.permissions) {
                assert.typeOf(perm, 'string');
            }
            assert.isObject(permission.attributes);
        });

        it('should be properly filled from API', () => {
            let permission = new viatransit.Permission();

            permission.fillFromAPI(permissionAssets.apiFormat);
            assert.typeOf(permission.id, 'string');
            assert.strictEqual(permission.id, "342684335908");
            for (let perm of permission.permissions) {
                assert.typeOf(perm, 'string');
            }
            assert.isObject(permission.attributes);
        });

        it('should return false because of user does\'nt have permission', () => {
            let permission = new viatransit.Permission();

            permission.fillFromAPI(permissionAssets.dbFormat);
            assert.strictEqual(permission.hasPermission("user.remove.all"), false);
        });

        it('should return true because of user have permission', () => {
            let permission = new viatransit.Permission();

            permission.fillFromAPI(permissionAssets.dbFormat);
            assert.strictEqual(permission.hasPermission("user.remove.self"), true);
        });
    });
});