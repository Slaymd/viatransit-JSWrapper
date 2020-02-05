//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const userLogsAssets = require('./assets/userLogs.js');

describe('UserLogs', () => {

    describe('API', () => {
    
    });

    describe('Model', () => {
        it('should be properly filled from Database', () => {
            let userLog = new viatransit.UserLogs();

            userLog.fillFromDatabase(userLogsAssets.dbFormat);
            assert.typeOf(userLog.id, 'string');
            assert.strictEqual(userLog.id, "2684335908");
            assert.isArray(userLog.logs);
            assert.isObject(userLog.attributes);
        });

        it('should be properly filled from API', () => {
            let userLog = new viatransit.UserLogs();

            userLog.fillFromAPI(userLogsAssets.apiFormat);
            assert.typeOf(userLog.id, 'string');
            assert.strictEqual(userLog.id, "2684678335908");
            assert.isArray(userLog.logs);
            assert.isObject(userLog.attributes);
        });
    });
});