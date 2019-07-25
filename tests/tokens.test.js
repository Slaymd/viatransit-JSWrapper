//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const tokenAssets = require('./assets/tokens.js');

describe('Tokens', () => {

    describe('API', () => {

    });

    describe('Model', () => {
        it('should be properly filled from Database', () => {
            let token = new viatransit.Token();

            token.fillFromDatabase(tokenAssets.dbFormat);
            assert.typeOf(token.id, 'string');
            assert.strictEqual(token.id, "2684335908");
            assert.typeOf(token.token, 'string');
            assert.strictEqual(token.token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzk2MTlhNWI5NGUxNGNjNDZiMGFjMCIsImlhdCI6MTU2NDA0MTYyOCwiZXhwIjoxNTY0OTA1NjI4fQ.hzVFy_FAhCkT5uuUTnj3BSMzMe3_75MBU61V_53eisE");
            assert.typeOf(token.type, 'string');
            assert.strictEqual(token.type, "auth");
            assert.typeOf(token.userId, 'string');
            assert.strictEqual(token.userId, "2684335908678");
            assert.typeOf(token.permissionId, 'string');
            assert.strictEqual(token.permissionId, "2684845767");
            assert.isObject(token.attributes);
        });

        it('should be properly filled from API', () => {
            let token = new viatransit.Token();

            token.fillFromAPI(tokenAssets.apiFormat);
            assert.typeOf(token.id, 'string');
            assert.strictEqual(token.id, "342684335908");
            assert.typeOf(token.token, 'string');
            assert.strictEqual(token.token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzk2MTlhNWI5NGUxNGNjNDZiMGFjMCIsImlhdCI6MTU2NDA0MjgyMywiZXhwIjoxNTY0OTA2ODIzfQ.pGKqQUOJ1dVOZFPcLi9n78AD_z3XcY8mVmLGyJ1iVNg");
            assert.typeOf(token.type, 'string');
            assert.strictEqual(token.type, "invoice");
            assert.typeOf(token.userId, 'string');
            assert.strictEqual(token.userId, "7872684335908678");
            assert.typeOf(token.permissionId, 'string');
            assert.strictEqual(token.permissionId, "26848767");
            assert.isObject(token.attributes);
        });
    });
});