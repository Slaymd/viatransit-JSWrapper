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
            assert.typeOf(user.picture, 'string');
            assert.strictEqual(user.picture, "");
            assert.isArray(user.history);
            for (let history of user.history) {
                //TODO Vérifier le nombre d'attributs que l'object a
                assert.isObject(history);
                assert.typeOf(history.status, 'string');
                assert.typeOf(history.type, 'string');
                assert.typeOf(history.message, 'string');
                assert.typeOf(history.date, 'string');
            }
            assert.isArray(user.roles);
            for (let role of user.roles)
                assert.typeOf(role, 'string');
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
            assert.typeOf(user.picture, 'string');
            assert.strictEqual(user.picture, "http://viatransit.fr/img/cmonjo.png");
            assert.isArray(user.history);
            for (let history of user.history) {
                //TODO Vérifier le nombre d'attributs que l'object a
                assert.isObject(history);
                assert.typeOf(history.status, 'string');
                assert.typeOf(history.type, 'string');
                assert.typeOf(history.message, 'string');
                assert.typeOf(history.date, 'string');
            }
            assert.isArray(user.roles);
            for (let role of user.roles)
                assert.typeOf(role, 'string');
            assert.isObject(user.attributes);
        });

        // it('should fail because of bad TaM array format', () => {
        //     let schedule = new viatransit.Schedule();
        //     let tamSchedule = ['268435729','ANTIGRTW','41217','ANTIGONE','1','MOSSON','1','17:26:46','0','661','41101','viatransit'];
        //     assert.strictEqual(schedule.fillFromTaMArray(tamSchedule), false, 'TaM Array too long');
        //     tamSchedule = ['268435729','ANTIGRTW','41217','ANTIGONE','1','MOSSON','A','17:26:46','0','661','41101'];
        //     assert.strictEqual(schedule.fillFromTaMArray(tamSchedule), false, 'TaM Array direction ID is wrong!');
        // });
        //
        // it('should works with attributes', () => {
        //    let schedule = new viatransit.Schedule();
        //
        //    assert.isNull(schedule.getAttribute('icon'));
        //    schedule.attributes = {icon: '42'};
        //    assert.strictEqual(schedule.getAttribute('icon'), '42');
        //    schedule.attributes = {style: {padding: 42}};
        //    assert.deepEqual(schedule.getAttribute('style'), {padding: 42});
        //    assert.isNull(schedule.getAttribute('icon'));
        // });
    });
});