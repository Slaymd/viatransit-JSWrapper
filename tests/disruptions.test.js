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

        it('should receive network disruptions'/*, async () => {*/
            // let disruptions = await viatransit.API.getNetworkDisruptions('tam');
            //
            // assert.isArray(disruptions.disruptions);
            // for (let disruption of disruptions.disruptions) {
            //     assert.instanceOf(disruption, viatransit.Disruption);
            // }
        /*}*/);

        it('should receive network zones disruptions'/*, async () => {*/
            // let disruptions = await viatransit.API.getNetworkZoneDisruptions('mpl');
            //
            // assert.isArray(disruptions);
            // for (let disruption of disruptions) {
            //     assert.instanceOf(disruption, viatransit.Disruption);
            // }
        /*}*/);

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
            assert.deepStrictEqual(announcement.endDate, new Date('2019-05-06T20:39:38.285Z'));
            assert.deepStrictEqual(announcement.startDate, new Date('2019-05-06T20:39:38.285Z'));
            assert.strictEqual(announcement.priority, 1);
            assert.strictEqual(announcement.type, "warning");
            assert.strictEqual(announcement.lang, "fr");
            assert.strictEqual(announcement.title, "Titre d'une annonce");
            assert.strictEqual(announcement.description, "Description d'une **annonce**");
            assert.isNull(announcement.getAttribute('icon'));
            assert.strictEqual(announcement.getAttribute('textColor'), '#000000');
            announcement = disruption2.announcements[0];
            assert.isNull(announcement.getAttribute('viatransit'));
        });

        it('should be complete', () => {
            assert.isTrue(disruption1.isComplete());
            assert.isFalse(disruption2.isComplete());
        });

    });

    describe('Links', () => {

        it('should be linked to a network', () => {
            assert.isTrue(disruption1.isLinkedToNetwork('5d8a85de477a0f6728a53b17'));
            assert.isTrue(disruption1.isLinkedToNetwork('5d8a85de477a0f6728a53b17', {checkDisruption: false, checkAnnouncements: true}));
            assert.isTrue(disruption1.isLinkedToNetwork('5d8a85de477a0f6728a53b17', {checkDisruption: true, checkAnnouncements: false}));
            assert.isFalse(disruption1.isLinkedToNetwork('5d8a85de477a028a53b214'));
            assert.isFalse(disruption3.isLinkedToNetwork('5d8a85de477a028a53b214', {checkDisruption: true, checkAnnouncements: false}));
            assert.isTrue(disruption3.isLinkedToNetwork('5d8a85de477a028a53b214', {checkDisruption: false, checkAnnouncements: true}));
        });

        it('should be linked to a service', () => {
            assert.isTrue(disruption1.isLinkedToService('5d8a85de477a0f6728a53b17', 'tam'));
            assert.isTrue(disruption1.isLinkedToService('5d8a85de477a0f6728a53b17', 'public_transit'));
            assert.isTrue(disruption1.isLinkedToService('5d8a85de477a0f6728a53b17', 'tam', {checkDisruption: false, checkAnnouncements: true}));
            assert.isTrue(disruption1.isLinkedToService('5d8a85de477a0f6728a53b17','tam', {checkDisruption: true, checkAnnouncements: false}));
            assert.isFalse(disruption1.isLinkedToService('5d8a85de477a0f6728a53b17', 'transpor'));
            assert.isFalse(disruption3.isLinkedToService('5d8a85de477a0f6728a53b17', 'transpor', {checkDisruption: true, checkAnnouncements: false}));
            assert.isTrue(disruption3.isLinkedToService('5d8a85de477a028a53b214', 'transpor', {checkDisruption: false, checkAnnouncements: true}));
        });

        it('should be linked to a line', () => {
            assert.isTrue(disruption1.isLinkedToLine('5d8a85de477a0f6728a53b17', 'tam', '7'));
            assert.isTrue(disruption1.isLinkedToLine('5d8a85de477a0f6728a53b17', 'public_transit', '6'));
            assert.isTrue(disruption1.isLinkedToLine('5d8a85de477a0f6728a53b17', 'tam', '8', {checkDisruption: false, checkAnnouncements: true}));
            assert.isTrue(disruption1.isLinkedToLine('5d8a85de477a0f6728a53b17','tam', '7', {checkDisruption: true, checkAnnouncements: false}));
            assert.isFalse(disruption1.isLinkedToLine('5d8a85de477a0f6728a53b17', 'tam', '9'));
            assert.isFalse(disruption3.isLinkedToLine('5d8a85de477a0f6728a53b17', 'tam','8', {checkDisruption: true, checkAnnouncements: false}));
            assert.isTrue(disruption3.isLinkedToLine('5d8a85de477a028a53b214', 'transpor','A', {checkDisruption: false, checkAnnouncements: true}));
            assert.isFalse(disruption3.isLinkedToLine('5d8a85de477a028a53b214', 'transpor','B', {checkDisruption: false, checkAnnouncements: true}));
        });

        it('should be linked to a station', () => {
            assert.isTrue(disruption1.isLinkedToStation('5d8a85de477a0f6728a53b17', 'tam', '7', 'S5570'));
            assert.isFalse(disruption1.isLinkedToStation('5d8a85de477a0f6728a53b17', 'tam', '7', 'S55789', {checkAnnouncements: false, checkDisruption: true}));
            assert.isTrue(disruption1.isLinkedToStation('5d8a85de477a0f6728a53b17', 'tam', '7', 'S55789', {checkAnnouncements: true, checkDisruption: false}));
        });

        it('should be linked to a stop', () => {
            assert.isTrue(disruption1.isLinkedToStop('5d8a85de477a0f6728a53b17', 'tam', '7', 'S5570', '51'));
            assert.isFalse(disruption1.isLinkedToStop('5d8a85de477a0f6728a53b17', 'tam', '7', 'S5570', '53', {checkDisruption: true, checkAnnouncements: false}));
            assert.isTrue(disruption1.isLinkedToStop('5d8a85de477a0f6728a53b17', 'tam', '6', 'S5570', '53', {checkDisruption: true, checkAnnouncements: false}));
            assert.isTrue(disruption1.isLinkedToStop('5d8a85de477a0f6728a53b17', 'tam', '7', 'S55789', '12313', {checkAnnouncements: true, checkDisruption: false}));
        });

        it('should get linked announcements', () => {
            assert.lengthOf(disruption3.getLinkedAnnouncements('5d8a85de477a028a53b214', 'transpor', 'L2', 'S5570', '42'), 1);
        });

    });

});