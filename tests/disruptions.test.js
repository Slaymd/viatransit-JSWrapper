//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const disruptionAPIFormatAsset_1 = require('./assets/disruptionAPIFormat_1.json');

describe('Disruptions', () => {

    describe('API', () => {

        it('should receive network disruptions', async () => {
            let disruptions = await viatransit.getNetworkDisruptions('tam');

            assert.isArray(disruptions.disruptions);
            for (let disruption of disruptions.disruptions) {
                assert.instanceOf(disruption, viatransit.models.Disruption);
            }
        });

        it('should receive network zones disruptions', async () => {
            let disruptions = await viatransit.getNetworkZoneDisruptions('mpl');

            assert.isArray(disruptions);
            for (let disruption of disruptions) {
                assert.instanceOf(disruption, viatransit.models.Disruption);
            }
        });

    });

    describe('Model', () => {

        it('should be properly filled from viaTransit API Format', () => {
            let disruption = new viatransit.models.Disruption();
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
            let disruption = new viatransit.models.Disruption();
            disruption.fillFromAPI(disruptionAPIFormatAsset_1);

            assert.isNull(disruption.getAttribute('icon'));
            assert.strictEqual(disruption.getAttribute('tripsVisibility'), true);
        });

    });

});