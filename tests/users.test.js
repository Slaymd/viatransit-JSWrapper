//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const userAssets = require('./assets/users.js');

describe('Users', () => {

    describe('API', () => {

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
            assert.isArray(user.permissions);
            for (let perm of user.permissions) {
                assert.typeOf(perm, 'string');
            }
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
            assert.isArray(user.permissions);
            for (let perm of user.permissions) {
                assert.typeOf(perm, 'string');
            }
            assert.isObject(user.attributes);
        });

        it('should return false because of user does\'nt have permission', () => {
            let user = new viatransit.User();

            user.fillFromAPI(userAssets.apiFormat);
            assert.strictEqual(user.hasPermission("user.remove.all"), false);
        });

        it('should return true because of user have permission', () => {
            let user = new viatransit.User();

            user.fillFromAPI(userAssets.apiFormat);
            assert.strictEqual(user.hasPermission("user.remove.self"), true);
        });
    });
});