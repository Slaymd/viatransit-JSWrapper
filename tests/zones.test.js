//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const zoneAssets = require('./assets/zones.js');

describe('Zones', () => {

    describe('API', () => {

        it('should receive all zones', async () => {
            let zones = await viatransit.API.getZones();

            assert.isArray(zones.zones);
            for (let zone of zones.zones) {
                assert.instanceOf(zone, viatransit.Zone);
            }
        });

    });

    describe('Model', () => {

        it('should be properly filled from database format', () => {
            let zone = new viatransit.Zone();
            zone.fillFromDatabase(zoneAssets.dbFormat);

            //Generic properties
            assert.strictEqual(zone.id, '5cc472bfad0bdb2fd679cad2');
            assert.strictEqual(zone.status, 'visible');
            assert.strictEqual(zone.displayOrder, 1);
            assert.strictEqual(zone.key, 'mpl');
            assert.strictEqual(zone.color, '1ABAFE');
            assert.strictEqual(zone.textColor, 'ffffff');
            assert.strictEqual(zone.description, 'Ville de Montpellier et ses allentours');
            assert.strictEqual(zone.shortName, 'Mpl');
            assert.strictEqual(zone.name, 'Montpellier');
            //Links
            assert.isArray(zone.links);
            assert.lengthOf(zone.links, 3);
            assert.deepStrictEqual(zone.links, [{"lines": ["all"], "stations": ["all"], "network": "tam"}, {
                "lines": ["all"], "stations": ["all"], "network": "heraulttransport"
            },
                {"lines": ["all"], "stations": ["all"], "network": "transpor"}]);
        });

        it('should be properly filled from viaTransit API format', () => {
            let zone = new viatransit.Zone();
            zone.fillFromAPI(zoneAssets.apiFormat);

            //Generic properties
            assert.strictEqual(zone.id, '5cc472bfad0bdb2fd679cad2');
            assert.strictEqual(zone.status, 'visible');
            assert.strictEqual(zone.displayOrder, 1);
            assert.strictEqual(zone.key, 'mpl');
            assert.strictEqual(zone.color, '1ABAFE');
            assert.strictEqual(zone.textColor, 'ffffff');
            assert.strictEqual(zone.description, 'Ville de Montpellier et ses allentours');
            assert.strictEqual(zone.shortName, 'Mpl');
            assert.strictEqual(zone.name, 'Montpellier');
            //Links
            assert.isArray(zone.links);
            assert.lengthOf(zone.links, 3);
            assert.deepStrictEqual(zone.links, [{"lines": ["all"], "stations": ["all"], "network": "tam"}, {
                "lines": ["all"], "stations": ["all"], "network": "heraulttransport"
            },
                {"lines": ["all"], "stations": ["all"], "network": "transpor"}]);
        });

        it('should works with attributes', () => {
            let zone = new viatransit.Zone();
            let zone2 = new viatransit.Zone();
            zone.fillFromDatabase(zoneAssets.dbFormat);
            zone2.fillFromDatabase(zoneAssets.dbFormat);
            zone2.attributes = null;

            assert.isNull(zone2.getAttribute('blabla'));
            assert.isNull(zone.getAttribute('icon'));
            assert.strictEqual(zone.getAttribute('map_style'), 'mapbox://styles/slaymd/cjs0xthcn05uk1fqqwdc8c6hk');
        });

    });

    describe('Links', () => {

        it('should be linked to a network', () => {
            let zone = new viatransit.Zone();
            zone.fillFromAPI(zoneAssets.apiFormat);

            assert.isTrue(zone.isLinkedToNetwork('tam'));
            assert.isTrue(zone.isLinkedToNetwork('transpor'));
            assert.isFalse(zone.isLinkedToNetwork('ratp'));
        });

        it('should be linked to a line', () => {
            let zone = new viatransit.Zone();
            zone.fillFromAPI(zoneAssets.apiFormat2);

            assert.isTrue(zone.isLinkedToLine('sncf', 'ouigo'));
            assert.isTrue(zone.isLinkedToLine('tam', '50'));
            assert.isTrue(zone.isLinkedToLine('tam', 'all'));
            assert.isFalse(zone.isLinkedToLine('ratp', 'M1'));
            assert.isTrue(zone.isLinkedToLine('heraulttransport', '120'));
            assert.isFalse(zone.isLinkedToLine('heraulttransport', '50'));
        });

        it('should be linked to a station', () => {
            let zone = new viatransit.Zone();
            zone.fillFromAPI(zoneAssets.apiFormat2);

            assert.isTrue(zone.isLinkedToStation('sncf', 'sncf', 'SZ1'));
            assert.isFalse(zone.isLinkedToStation('sncf', 'sncf', 'all'));
            assert.isFalse(zone.isLinkedToStation('ratp', 'M1', 'SZ1'));
            assert.isTrue(zone.isLinkedToStation('tam', '1', 'S5451'));
        });

    });

});