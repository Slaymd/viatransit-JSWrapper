//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const disruptionDBFormatAsset = require('./assets/disruptionDBFormat.json');
const disruptionAPIFormatAsset_1 = require('./assets/disruptionAPIFormat_1.json');
const disruptionAPIFormatAsset_2 = require('./assets/disruptionAPIFormat_2.json');
const disruptionAPIFormatAsset_3 = require('./assets/disruptionAPIFormat_3.json');

describe('Disruptions', () => {

    describe('API', () => {

        it('should receive network disruptions', async () => {
            let disruptions = await viatransit.API.getNetworkDisruptions('tam');

            assert.isArray(disruptions.disruptions);
            for (let disruption of disruptions.disruptions) {
                assert.instanceOf(disruption, viatransit.Disruption);
            }
        });

        it('should receive network zones disruptions', async () => {
            let disruptions = await viatransit.API.getNetworkZoneDisruptions('mpl');

            assert.isArray(disruptions);
            for (let disruption of disruptions) {
                assert.instanceOf(disruption, viatransit.Disruption);
            }
        });

    });

    describe('Model', () => {

        it('should be properly filled from database Format', () => {
            let disruption = new viatransit.Disruption();
            disruption.fillFromDatabase(disruptionDBFormatAsset);

            assert.deepStrictEqual(disruption.endDate, new Date('2019-05-05T21:59:00.000Z'));
            assert.deepStrictEqual(disruption.startDate, new Date('2019-05-05T20:37:00.000Z'));
            assert.strictEqual(disruption.status, 'valid');
            assert.strictEqual(disruption.type, 'web');
            assert.strictEqual(disruption.id, '5cd09bdc87387472c1fa6198');
            assert.lengthOf(disruption.links, 1);
            assert.strictEqual(disruption.links[0].network, 'capbus');
            assert.lengthOf(disruption.links[0].lines, 1);
            assert.strictEqual(disruption.links[0].lines[0], '3');
            assert.lengthOf(disruption.links[0].stations, 1);
            assert.strictEqual(disruption.links[0].stations[0], 'all');
            assert.strictEqual(disruption.attributes.tripsVisibility, true);
            assert.strictEqual(disruption.attributes.tripsDelayed, false);
            assert.strictEqual(disruption.attributes.tripsCancelled, true);
            assert.lengthOf(disruption.announcements, 1);
            assert.lengthOf(disruption.announcements[0].links, 1);
            assert.strictEqual(disruption.announcements[0].links[0].network, 'capbus');
            assert.lengthOf(disruption.announcements[0].links[0].lines, 1);
            assert.strictEqual(disruption.announcements[0].links[0].lines[0], 'all');
            assert.lengthOf(disruption.announcements[0].links[0].stations, 1);
            assert.strictEqual(disruption.announcements[0].links[0].stations[0], 'all');
            assert.strictEqual(disruption.announcements[0].id, '5cd09bdc87387472c1fa6199');
            assert.strictEqual(disruption.announcements[0].authorId, '5c61cc3363939c74bdcfde35');
            assert.deepStrictEqual(disruption.announcements[0].endDate, new Date('2019-05-06T20:39:38.285Z'));
            assert.deepStrictEqual(disruption.announcements[0].startDate, new Date('2019-05-06T20:39:38.285Z'));
            assert.strictEqual(disruption.announcements[0].priority, 1);
            assert.strictEqual(disruption.announcements[0].type, "warning");
            assert.strictEqual(disruption.announcements[0].lang, "fr");
            assert.strictEqual(disruption.announcements[0].title, "Test d'une annonce étendue au réseau");
            assert.strictEqual(disruption.announcements[0].description, "");
        });

        it('should be properly filled from viaTransit API Format', () => {
            let disruption = new viatransit.Disruption();
            disruption.fillFromAPI(disruptionAPIFormatAsset_1);

            assert.deepStrictEqual(disruption.endDate, new Date('2019-05-05T21:59:00.000Z'));
            assert.deepStrictEqual(disruption.startDate, new Date('2019-05-05T20:37:00.000Z'));
            assert.strictEqual(disruption.status, 'valid');
            assert.strictEqual(disruption.type, 'web');
            assert.strictEqual(disruption.id, '5cd09bdc87387472c1fa6198');
            assert.lengthOf(disruption.links, 1);
            assert.strictEqual(disruption.links[0].network, 'capbus');
            assert.lengthOf(disruption.links[0].lines, 1);
            assert.strictEqual(disruption.links[0].lines[0], '3');
            assert.lengthOf(disruption.links[0].stations, 1);
            assert.strictEqual(disruption.links[0].stations[0], 'all');
            assert.strictEqual(disruption.attributes.tripsVisibility, true);
            assert.strictEqual(disruption.attributes.tripsDelayed, false);
            assert.strictEqual(disruption.attributes.tripsCancelled, true);
            assert.lengthOf(disruption.announcements, 1);
            assert.lengthOf(disruption.announcements[0].links, 1);
            assert.strictEqual(disruption.announcements[0].links[0].network, 'capbus');
            assert.lengthOf(disruption.announcements[0].links[0].lines, 1);
            assert.strictEqual(disruption.announcements[0].links[0].lines[0], 'all');
            assert.lengthOf(disruption.announcements[0].links[0].stations, 1);
            assert.strictEqual(disruption.announcements[0].links[0].stations[0], 'all');
            assert.strictEqual(disruption.announcements[0].id, '5cd09bdc87387472c1fa6199');
            assert.strictEqual(disruption.announcements[0].authorId, '5c61cc3363939c74bdcfde35');
            assert.deepStrictEqual(disruption.announcements[0].endDate, new Date('2019-05-06T20:39:38.285Z'));
            assert.deepStrictEqual(disruption.announcements[0].startDate, new Date('2019-05-06T20:39:38.285Z'));
            assert.strictEqual(disruption.announcements[0].priority, 1);
            assert.strictEqual(disruption.announcements[0].type, "warning");
            assert.strictEqual(disruption.announcements[0].lang, "fr");
            assert.strictEqual(disruption.announcements[0].title, "Test d'une annonce étendue au réseau");
            assert.strictEqual(disruption.announcements[0].description, "");
        });

        it('should works with attributes', () => {
            let disruption = new viatransit.Disruption();
            disruption.fillFromAPI(disruptionAPIFormatAsset_1);

            assert.isNull(disruption.getAttribute('icon'));
            assert.strictEqual(disruption.getAttribute('tripsVisibility'), true);
            disruption.fillFromAPI(disruptionAPIFormatAsset_2);
            assert.isNull(disruption.getAttribute('icon'));
        });

        it('should be complete', () => {
            let disruption = new viatransit.Disruption();
            disruption.fillFromAPI(disruptionAPIFormatAsset_1);

            assert.isTrue(disruption.isComplete());
            disruption.links = [];
            assert.isFalse(disruption.isComplete());
        });

    });

    describe('Links', () => {

        it('should be linked to a network', () => {
            let disruption = new viatransit.Disruption();
            disruption.fillFromAPI(disruptionAPIFormatAsset_1);

            assert.isTrue(disruption.isLinkedToNetwork('capbus'));
            assert.isFalse(disruption.isLinkedToNetwork('all'));
            assert.isFalse(disruption.isLinkedToNetwork('tam'));
            assert.isTrue(disruption.isLinkedToNetwork('capbus', {checkAnnouncements: true, checkDisruption: false}));
            disruption.fillFromAPI(disruptionAPIFormatAsset_2);
            assert.isFalse(disruption.isLinkedToNetwork('tam', {checkAnnouncements: false, checkDisruption: true}));
            assert.isTrue(disruption.isLinkedToNetwork('tam'));
        });

        it('should be linked to a line', () => {
            let disruption = new viatransit.Disruption();
            disruption.fillFromAPI(disruptionAPIFormatAsset_2);

            assert.isTrue(disruption.isLinkedToLine('capbus', '1'));
            assert.isTrue(disruption.isLinkedToLine('capbus', '1', {checkDisruption: false, checkAnnouncements: true}));
            assert.isFalse(disruption.isLinkedToLine('tam', '1', {checkDisruption: true, checkAnnouncements: false}));
            assert.isTrue(disruption.isLinkedToLine('capbus', '2'));
            assert.isFalse(disruption.isLinkedToLine('capbus', '2', {checkDisruption: true, checkAnnouncements: false}));
            assert.isTrue(disruption.isLinkedToLine('all', 'all'));
            assert.isTrue(disruption.isLinkedToLine('capbus', 'all'));
            assert.isFalse(disruption.isLinkedToLine('tam', 'all', {checkDisruption: true, checkAnnouncements: false}));
        });

        it('should be linked to a station', () => {
            let disruption = new viatransit.Disruption();
            disruption.fillFromAPI(disruptionAPIFormatAsset_2);

            assert.isTrue(disruption.isLinkedToStation('capbus', '1', 'SZ01'));
            assert.isTrue(disruption.isLinkedToStation('capbus', '1', 'SZ01', {checkDisruption: true, checkAnnouncements: false}));
            assert.isFalse(disruption.isLinkedToStation('capbus', '2', 'SZ01', {checkDisruption: true, checkAnnouncements: false}));
            assert.isTrue(disruption.isLinkedToStation('capbus', '2', 'SZ01'));
            disruption.fillFromAPI(disruptionAPIFormatAsset_1);
            assert.isTrue(disruption.isLinkedToStation('capbus', '3', 'all', {checkDisruption: true, checkAnnouncements: false}));
            assert.isFalse(disruption.isLinkedToStation('capbus', '2', 'all', {checkDisruption: true, checkAnnouncements: false}));
            assert.isTrue(disruption.isLinkedToStation('capbus', '2', 'all'));
        });

        it('should get linked announcements', () => {
            let disruption = new viatransit.Disruption();
            disruption.fillFromAPI(disruptionAPIFormatAsset_3);

            assert.lengthOf(disruption.getLinkedAnnouncements('capbus', '2', 'SZ01'), 1);
            assert.lengthOf(disruption.getLinkedAnnouncements('capbus', 'all', 'SZ01'), 2);
            assert.lengthOf(disruption.getLinkedAnnouncements('capbus', '1', 'SZ01'), 0);
            assert.lengthOf(disruption.getLinkedAnnouncements('all', '2', 'SZ01'), 1);
            assert.lengthOf(disruption.getLinkedAnnouncements('tam', '1', 'SZ01'), 0);
            assert.lengthOf(disruption.getLinkedAnnouncements('all', 'all', 'SZ01'), 2);
            assert.lengthOf(disruption.getLinkedAnnouncements('all', 'all', 'all'), 2);
            assert.lengthOf(disruption.getLinkedAnnouncements('all', '2', 'all'), 1);
        });

    });

});