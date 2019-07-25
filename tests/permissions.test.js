//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const permissionAssets = require('./assets/permissions.js');

describe('Permissions', () => {

    describe('API', () => {

    });

    describe('Model', () => {
        it('should be properly filled from Database', () => {
            let permission = new viatransit.Permissions();

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
            let permission = new viatransit.Permissions();

            permission.fillFromAPI(permissionAssets.apiFormat);
            assert.typeOf(permission.id, 'string');
            assert.strictEqual(permission.id, "342684335908");
            for (let perm of permission.permissions) {
                assert.typeOf(perm, 'string');
            }
            assert.isObject(permission.attributes);
        });
    });
});