//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const scheduleAPIFormatAsset = require('./assets/scheduleAPIFormat.json');

describe('Schedules', () => {

    describe('API', () => {
        it('should throw an error because wrong parameters');
        it('should receive schedules on normal format', async () => {
            const schedules = await viatransit.getSchedules('tam', 'S5472');

            assert.isArray(schedules);
            if (schedules.length === 0)
                return;
            for (let schedule of schedules) {
                assert.instanceOf(schedule, viatransit.models.Schedule);
            }
        });
        it('should receive schedules on clusterized format', async () => {
            const clusters = await viatransit.getClusterizedSchedules('tam', 'S5472');

            assert.isArray(clusters);
            if (clusters.length === 0)
                return;
            for (let cluster of clusters) {
                assert.nestedProperty(cluster, 'line', 'A cluster should have a line property');
                assert.nestedProperty(cluster, 'line.id', 'A cluster line should have an id property');
                assert.nestedProperty(cluster, 'line.network', 'A cluster line should have a network property');
                assert.nestedProperty(cluster, 'headsign', 'A cluster should have a headsign property');
                assert.nestedProperty(cluster, 'schedules', 'A cluster should have a schedules property');
                assert.isArray(cluster.schedules, 'Cluster schedules should be an Array');
                for (let schedule of cluster.schedules) {
                    assert.instanceOf(schedule, viatransit.models.Schedule, 'Cluster schedules should be an Array of Schedule class');
                }
            }
        });
    });

    describe('Model', () => {
        it('should be properly filled', () => {
            let schedule = new viatransit.models.Schedule();
            schedule.fill('tam', 'S5472', '1', 'S5472', 'S5472', 0, 'Odysseum', new viatransit.models.DayDate(8, 45, 12), 42, false, 42);
            assert.instanceOf(schedule.departureTime, viatransit.models.DayDate);
            assert.strictEqual(schedule.departureTime.hour, 8);
            assert.strictEqual(schedule.departureTime.min, 45);
            assert.strictEqual(schedule.departureTime.sec, 12);
            assert.typeOf(schedule.destinationId, 'string');
            assert.strictEqual(schedule.destinationId, 'S5472');
            assert.typeOf(schedule.headsign, 'string');
            assert.strictEqual(schedule.headsign, 'Odysseum');
            assert.typeOf(schedule.directionId, 'number');
            assert.strictEqual(schedule.directionId, 0);
            assert.typeOf(schedule.theorical, 'boolean');
            assert.strictEqual(schedule.theorical, false);
            assert.typeOf(schedule.id, 'string');
            assert.strictEqual(schedule.id, 'S5472');
            assert.typeOf(schedule.stopId, 'string');
            assert.strictEqual(schedule.stopId, 'S5472');
            assert.typeOf(schedule.delayTime, 'number');
            assert.strictEqual(schedule.delayTime, 42);
            assert.typeOf(schedule.network, 'string');
            assert.strictEqual(schedule.network, 'tam');
            assert.typeOf(schedule.lineId, 'string');
            assert.strictEqual(schedule.lineId, '1');
            assert.typeOf(schedule.waitingTime, 'number');
            assert.strictEqual(schedule.waitingTime, 42);
            assert.typeOf(schedule.isLast, 'boolean');
            assert.strictEqual(schedule.isLast, false);
            assert.property(schedule, 'attributes');
        });

        it('should be properly filled from viaTransit API Format', () => {
            let schedule = new viatransit.models.Schedule();
            schedule.fillFromAPI(scheduleAPIFormatAsset);
            assert.instanceOf(schedule.departureTime, viatransit.models.DayDate);
            assert.strictEqual(schedule.departureTime.hour, 16);
            assert.strictEqual(schedule.departureTime.min, 46);
            assert.strictEqual(schedule.departureTime.sec, 29);
            assert.typeOf(schedule.destinationId, 'string');
            assert.strictEqual(schedule.destinationId, '42169');
            assert.typeOf(schedule.headsign, 'string');
            assert.strictEqual(schedule.headsign, 'Jacou');
            assert.typeOf(schedule.directionId, 'number');
            assert.strictEqual(schedule.directionId, 0);
            assert.typeOf(schedule.theorical, 'boolean');
            assert.strictEqual(schedule.theorical, false);
            assert.typeOf(schedule.id, 'string');
            assert.strictEqual(schedule.id, '268435908');
            assert.typeOf(schedule.stopId, 'string');
            assert.strictEqual(schedule.stopId, '41221');
            assert.typeOf(schedule.delayTime, 'number');
            assert.strictEqual(schedule.delayTime, 0);
            assert.typeOf(schedule.network, 'string');
            assert.strictEqual(schedule.network, 'tam');
            assert.typeOf(schedule.lineId, 'string');
            assert.strictEqual(schedule.lineId, '2');
            assert.typeOf(schedule.waitingTime, 'number');
            assert.strictEqual(schedule.waitingTime, 0);
            assert.typeOf(schedule.isLast, 'boolean');
            assert.strictEqual(schedule.isLast, false);
            assert.property(schedule, 'attributes');
        });

        it('should be properly filled from TaM array format', () => {
            let schedule = new viatransit.models.Schedule();
            let tamSchedule = ['268435729','ANTIGRTW','41217','ANTIGONE','1','MOSSON','1','17:26:46','0','661','41101'];
            schedule.fillFromTaMArray(tamSchedule);
            assert.instanceOf(schedule.departureTime, viatransit.models.DayDate);
            assert.strictEqual(schedule.departureTime.hour, 17);
            assert.strictEqual(schedule.departureTime.min, 26);
            assert.strictEqual(schedule.departureTime.sec, 46);
            assert.typeOf(schedule.destinationId, 'string');
            assert.strictEqual(schedule.destinationId, '41101');
            assert.typeOf(schedule.headsign, 'string');
            assert.strictEqual(schedule.headsign, 'MOSSON');
            assert.typeOf(schedule.directionId, 'number');
            assert.strictEqual(schedule.directionId, 1);
            assert.typeOf(schedule.theorical, 'boolean');
            assert.strictEqual(schedule.theorical, false);
            assert.typeOf(schedule.id, 'string');
            assert.strictEqual(schedule.id, '268435729');
            assert.typeOf(schedule.stopId, 'string');
            assert.strictEqual(schedule.stopId, '41217');
            assert.typeOf(schedule.delayTime, 'number');
            assert.strictEqual(schedule.delayTime, 0);
            assert.typeOf(schedule.network, 'string');
            assert.typeOf(schedule.lineId, 'string');
            assert.strictEqual(schedule.lineId, '1');
            assert.typeOf(schedule.waitingTime, 'number');
            assert.typeOf(schedule.isLast, 'boolean');
            assert.strictEqual(schedule.isLast, false);
            assert.property(schedule, 'attributes');
        });

        it('should fail because of bad TaM array format', () => {
            let schedule = new viatransit.models.Schedule();
            let tamSchedule = ['268435729','ANTIGRTW','41217','ANTIGONE','1','MOSSON','1','17:26:46','0','661','41101','viatransit'];
            assert.strictEqual(schedule.fillFromTaMArray(tamSchedule), false, 'TaM Array too long');
            tamSchedule = ['268435729','ANTIGRTW','41217','ANTIGONE','1','MOSSON','A','17:26:46','0','661','41101'];
            assert.strictEqual(schedule.fillFromTaMArray(tamSchedule), false, 'TaM Array direction ID is wrong!');
        });

        it('should works with attributes', () => {
           let schedule = new viatransit.models.Schedule();

           assert.isNull(schedule.getAttribute('icon'));
           schedule.attributes = {icon: '42'};
           assert.strictEqual(schedule.getAttribute('icon'), '42');
           schedule.attributes = {style: {padding: 42}};
           assert.deepEqual(schedule.getAttribute('style'), {padding: 42});
           assert.isNull(schedule.getAttribute('icon'));
        });
    });

});