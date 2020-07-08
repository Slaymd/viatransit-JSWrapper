//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const disruptionAssets = require('./assets/disruptions');
const disruption1 = new viatransit.Disruption(disruptionAssets.disruption1);
const disruption2 = new viatransit.Disruption(disruptionAssets.disruption2);
const disruption3 = new viatransit.Disruption(disruptionAssets.disruption3);

describe('Disruptions', () => {

    describe('API', () => {

        it('should receive network disruptions', async () => {
            let disruptions = await viatransit.API.getAllDisruptions();

            assert.isArray(disruptions.disruptions);
            for (let disruption of disruptions.disruptions) {
                assert.instanceOf(disruption, viatransit.Disruption);
            }
        });

    });

    describe('Model', () => {

        it('should be properly filled from viaTransit API Format', () => {
            //Base model
            assert.deepStrictEqual(disruption1.endDate, new Date('2019-05-05T21:59:00.000Z'));
            assert.deepStrictEqual(disruption1.startDate, new Date('2019-05-05T20:37:00.000Z'));
            assert.strictEqual(disruption1.status, 'valid');
            assert.strictEqual(disruption1.type, 'works');
            assert.strictEqual(disruption1.id, '5cd09bdc87387472c1fa6198');
            assert.lengthOf(disruption1.links, 2);
            assert.strictEqual(disruption1.attributes.tripsVisibility, true);
            assert.strictEqual(disruption1.attributes.tripsDelayed, false);
            assert.strictEqual(disruption1.attributes.tripsCancelled, true);
            assert.lengthOf(disruption1.announcements, 1);
            assert.lengthOf(disruption2.announcements, 1);
            assert.isNull(disruption1.getAttribute('icon'));
            assert.isFalse(disruption1.getAttribute('tripsDelayed'));
            assert.isNull(disruption2.getAttribute('viatransit'));
            //Announcement model
            let announcement = disruption1.announcements[0];
            assert.lengthOf(announcement.links, 1);
            assert.strictEqual(announcement.id, '5cd09bdc87387472c1fa6199');
            assert.strictEqual(announcement.authorId, '5c61cc3363939c74bdcfde35');
            assert.deepStrictEqual(announcement.startDate, new Date('2019-05-05T20:37:00.000Z'));
            assert.deepStrictEqual(announcement.endDate, new Date('2019-05-05T21:59:00.000Z'));
            assert.strictEqual(announcement.priority, 1);
            assert.strictEqual(announcement.type, "warning");
            assert.strictEqual(announcement.lang, "fr");
            assert.strictEqual(announcement.title, "Titre d'une annonce");
            assert.strictEqual(announcement.description, "Description d'une **annonce**");
            assert.isNull(announcement.getAttribute('icon'));
            assert.strictEqual(announcement.getAttribute('textColor'), '#000000');
            announcement = disruption2.announcements[0];
            assert.isNull(announcement.getAttribute('viatransit'));
            assert.isTrue(announcement.isComplete());
        });

        it('should be complete', () => {
            assert.isTrue(disruption1.isComplete());
            assert.isFalse(disruption2.isComplete());
        });

        it('should be effective', () => {
            assert.isTrue(disruption1.announcements[0].isEffective(new Date('2019-05-05T20:38:00.000Z')))
            assert.isTrue(disruption1.isEffective(new Date('2019-05-05T20:38:00.000Z')))
        });

        it('shouldn\'t be effective', () => {
            assert.isFalse(disruption1.announcements[0].isEffective(new Date('2018-05-05T20:38:00.000Z')))
            assert.isFalse(disruption1.isEffective(new Date('2018-05-05T20:38:00.000Z')))
        });

    });

    describe('Links', () => {

        it('should be linked to a network', () => {
            assert.isTrue(disruption1.isLinkedToNetwork('tam'));
            assert.isTrue(disruption1.isLinkedToNetwork('tam', {checkDisruption: false, checkAnnouncements: true}));
            assert.isTrue(disruption1.isLinkedToNetwork('tam', {checkDisruption: true, checkAnnouncements: false}));
            assert.isFalse(disruption1.isLinkedToNetwork('transpor'));
            assert.isFalse(disruption3.isLinkedToNetwork('transpor', {checkDisruption: true, checkAnnouncements: false}));
            assert.isTrue(disruption3.isLinkedToNetwork('transpor', {checkDisruption: false, checkAnnouncements: true}));
        });

        it('should be linked to a line', () => {
            assert.isTrue(disruption1.isLinkedToLine('tam', '7'));
            assert.isTrue(disruption1.isLinkedToLine('tam', '8', {checkDisruption: false, checkAnnouncements: true}));
            assert.isTrue(disruption1.isLinkedToLine('tam', '7', {checkDisruption: true, checkAnnouncements: false}));
            assert.isFalse(disruption1.isLinkedToLine('tam', '9'));
            assert.isFalse(disruption3.isLinkedToLine('tam','8', {checkDisruption: true, checkAnnouncements: false}));
            assert.isTrue(disruption3.isLinkedToLine('transpor','A', {checkDisruption: false, checkAnnouncements: true}));
            assert.isFalse(disruption3.isLinkedToLine('transpor','B', {checkDisruption: false, checkAnnouncements: true}));
        });

        it('should be linked to a station', () => {
            assert.isTrue(disruption1.isLinkedToStation('tam', '7', 'S5570'));
            assert.isFalse(disruption1.isLinkedToStation('tam', '7', 'S55789', {checkAnnouncements: false, checkDisruption: true}));
            assert.isTrue(disruption1.isLinkedToStation('tam', '7', 'S55789', {checkAnnouncements: true, checkDisruption: false}));
        });

        it('should be linked to a stop', () => {
            assert.isTrue(disruption1.isLinkedToStop('tam', '7', 'S5570', '51'));
            assert.isFalse(disruption1.isLinkedToStop('tam', '7', 'S5570', '53', {checkDisruption: true, checkAnnouncements: false}));
            assert.isTrue(disruption1.isLinkedToStop('tam', '6', 'S5570', '53', {checkDisruption: true, checkAnnouncements: false}));
            assert.isTrue(disruption1.isLinkedToStop('tam', '7', 'S55789', '12313', {checkAnnouncements: true, checkDisruption: false}));
        });

        it('should be linked to a trip', () => {
            assert.isTrue(disruption1.isLinkedToTrip('tam', 'S5570', '51', 'TRIP1'));
            assert.isFalse(disruption1.isLinkedToTrip('tam', 'S5570', '53', 'TRIP2', {checkDisruption: true, checkAnnouncements: false}));
            assert.isTrue(disruption1.isLinkedToTrip('tam', 'S5570', '53', 'TRIP1',{checkDisruption: true, checkAnnouncements: false}));
            assert.isTrue(disruption1.isLinkedToTrip('tam', 'S5570', '53', 'TRIP4543', {checkAnnouncements: true, checkDisruption: false}));
        });

        it('should get linked announcements', () => {
            assert.lengthOf(disruption3.getLinkedAnnouncements('transpor', 'L2', 'S5570', '42'), 1);
        });

    });

});