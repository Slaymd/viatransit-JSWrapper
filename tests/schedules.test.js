//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const scheduleAssets = require('./assets/schedules');
const schedule1 = new viatransit.Schedule(scheduleAssets.schedule1);
const schedule2 = new viatransit.Schedule(scheduleAssets.schedule2);

describe('Schedules', () => {

    describe('API', () => {
        it('should throw an error because wrong parameters');

        it('should receive schedules on normal format', async () => {
            const schedules = await viatransit.API.getSchedules('tam', 'S5472');

            assert.isArray(schedules);
            if (schedules.length === 0)
                return;
            for (let schedule of schedules) {
                assert.instanceOf(schedule, viatransit.Schedule);
            }
        });

        it('should receive schedules on clusterized format', async () => {
            const clusters = await viatransit.API.getClusterizedSchedules('tam', 'S5472');

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
                    assert.instanceOf(schedule, viatransit.Schedule, 'Cluster schedules should be an Array of Schedule class');
                }
            }
        });

        it('should receive schedules on by-line format', async () => {
            const clusters = await viatransit.API.getByLineSchedules('tam', 'S5472');

            assert.isArray(clusters);
            if (clusters.length === 0)
                return;
            for (let cluster of clusters) {
                assert.nestedProperty(cluster, 'line', 'A cluster should have a line property');
                assert.nestedProperty(cluster, 'line.id', 'A cluster line should have an id property');
                assert.nestedProperty(cluster, 'line.network', 'A cluster line should have a network property');
                assert.nestedProperty(cluster, 'schedules', 'A cluster should have a schedules property');
                assert.isArray(cluster.schedules, 'Cluster schedules should be an Array');
                for (let schedule of cluster.schedules) {
                    assert.instanceOf(schedule, viatransit.Schedule, 'Cluster schedules should be an Array of Schedule class');
                }
            }
        });

    });

    describe('Model', () => {

        it('should be properly filled from viaTransit API format', () => {
            //Generic properties
            assert.strictEqual(schedule1.id, '268435908');
            assert.strictEqual(schedule1.networkKey, 'tam');
            assert.strictEqual(schedule1.lineId, '2');
            assert.strictEqual(schedule1.stopId, '41221');
            assert.strictEqual(schedule1.destinationId, '42169');
            assert.strictEqual(schedule1.directionId, 0);
            assert.strictEqual(schedule1.headsign, 'Jacou');
            assert.strictEqual(schedule1.theorical, false);
            assert.strictEqual(schedule1.departureDate, '2020-01-16T14:24:22.462Z');
            assert.strictEqual(schedule1.arrivalDate, '2020-01-16T14:22:22.462Z');
        });

        it('should get waiting time', () => {
            let tmpDate = schedule1.departureDate;
            let tmpBaseDate = schedule1.attributes.baseDepartureDate;
            let newDate = new Date();

            newDate.setSeconds(newDate.getSeconds() + 45);
            schedule1.departureDate = newDate.toISOString();
            schedule1.attributes.baseDepartureDate = newDate.toISOString();
            assert.strictEqual(schedule1.getWaitingTime(), 45);
            schedule1.attributes.baseDepartureDate = null;
            schedule1.attributes.baseArrivalDate = null;
            assert.strictEqual(schedule1.getWaitingTime(), 45);
            schedule1.departureDate = tmpDate;
            schedule1.attributes.baseDepartureDate = tmpBaseDate;
            schedule1.attributes.baseArrivalDate = schedule1.arrivalDate;
        });

        it('should get decomposed time', () => {
            let decomposedTime = schedule1.getDecomposedTime();

            assert.deepStrictEqual(decomposedTime, {hours: 15, minutes: 24, seconds: 22});
            assert.isNull(schedule2.getDecomposedTime("DAZDAZD21"));
        });

        it('should works with attributes', () => {
            assert.isNull(schedule2.getAttribute('baseArrivalDate'));
            assert.isNull(schedule1.getAttribute('deleted'));
            assert.strictEqual(schedule1.getAttribute('baseDepartureDate'), '2020-01-16T14:24:22.462Z');
        });
    });

});