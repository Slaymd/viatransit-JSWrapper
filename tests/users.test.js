//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const userAssets = require('./assets/users.js');

describe('Users', () => {

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