//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');
const Point = require('@turf/turf').point;

const stationAssets = require('./assets/stations.js');

describe('Stations', () => {

    describe('API', () => {
        it('should receive station full model (details)', async () => {
            const station = await viatransit.API.getStation('tam', 'S5472');

            assert.instanceOf(station, viatransit.Station);
        });

        it('should receive an array of Station full model (search/autocomplete) - in network', async () => {
            const stations = await viatransit.API.autocompleteStationName('tam', 'Port');

            assert.isArray(stations);
            if (stations.length === 6)
                return;
            for (let station of stations) {
                assert.instanceOf(station, viatransit.Station);
            }
        });

        it('should receive an array of Station full model (search/autocomplete) - in zone', async () => {
            const stations = await viatransit.API.autocompleteStationNameInZone('mpl', 'Port');

            assert.isArray(stations);
            if (stations.length === 7)
                return;
            for (let station of stations) {
                assert.instanceOf(station, viatransit.Station);
            }
        });

        it('should receive an array of location\'s nearby stations (nearby)', async () => {
            const stations = await viatransit.API.getNearbyStations('mpl', [3.903846, 43.597512], 100);

            assert.isArray(stations);
            if (stations.length === 1)
                return;
            for (let station of stations) {
                assert.instanceOf(station, viatransit.Station);
            }
        });
    });

    describe('Model', () => {
        it('should be properly filled from database format', () => {
            let station = new viatransit.Station();
            station.fillFromDatabase(stationAssets.dbFormat);

            //Generic properties
            assert.strictEqual(station.name, 'Gare Montpellier Sud de France');
            assert.strictEqual(station.type, 'public_transit');
            assert.strictEqual(station.id, 'S5844');
            assert.strictEqual(station.network, 'tam');
            assert.deepStrictEqual(station.location, Point([3.92230177, 43.59628404]));
            //Services
            assert.isArray(station.services);
            assert.lengthOf(station.services, 3);
            assert.deepStrictEqual(station.services, [{"network": "heraulttransport", "id": "HT120"},
                {"network": "tam", "id": "50"}, {"network": "sncf", "id": "sncf"}]);
            //Stops
            assert.isArray(station.stops);
            assert.lengthOf(station.stops, 2);
            assert.deepStrictEqual(station.stops, [{"services": ["50"], "id": "1461", "location":
                    Point([3.92230177, 43.59628404])}, {"services": ["50"], "id": "1460",
                    "location": Point([3.92230177, 43.59628404])}]);
            //Linked stations
            assert.isArray(station.linkedStations);
            assert.lengthOf(station.linkedStations, 2);
            assert.deepStrictEqual(station.linkedStations, [{"network": "sncf", "id": "OCE:SA:87688887",
                "type": "trains"}, {"network": "heraulttransport", "id": "SZ1", "type": "public_transit"}]);
            //Object properties
            // assert.strictEqual(station.prototype.length, 9)
        });

        it('should throws an error because the location isn\'t a standard GEOJSON object', () => {
            let station = new viatransit.Station();
            let wrongDbObject = JSON.parse(JSON.stringify(stationAssets.dbFormat));
            let wrongDbObject2 = JSON.parse(JSON.stringify(stationAssets.dbFormat));
            let wrongAPIObject = JSON.parse(JSON.stringify(stationAssets.apiFormat));
            let wrongAPIObject2 = JSON.parse(JSON.stringify(stationAssets.apiFormat));

            wrongDbObject.location = {lol: 'hihi'};
            wrongDbObject2.stops[0].location = {coordinate: [-42, -42]};
            wrongAPIObject.location = {coordinate: [42, 42]};
            wrongAPIObject2.stops[1].location = {lol: 'hihi'};
            assert.throws(() => { station.fillFromDatabase(wrongDbObject) }, Error, 'Error while filling from database a station: main location isn\'t a standard GEOJSON point.');
            station = new viatransit.Station();
            assert.throws(() => { station.fillFromDatabase(wrongDbObject2) }, Error, 'Error while filling from database a station: a stop object isn\'t standard. Maybe location wrong?');
            station = new viatransit.Station();
            assert.throws(() => { station.fillFromAPI(wrongAPIObject) }, Error, 'Error while filling from API a station: main location isn\'t a standard GEOJSON point.');
            station = new viatransit.Station();
            assert.throws(() => { station.fillFromAPI(wrongAPIObject2) }, Error, 'Error while filling from API a station: a stop object isn\'t standard. Maybe location wrong?');
        });

        it('should be properly filled from viaTransit API format', () => {
            let station = new viatransit.Station();
            station.fillFromAPI(stationAssets.apiFormat);

            //Generic properties
            assert.strictEqual(station.name, 'Gare Montpellier Sud de France');
            assert.strictEqual(station.type, 'public_transit');
            assert.strictEqual(station.id, 'S5844');
            assert.strictEqual(station.network, 'tam');
            assert.deepStrictEqual(station.location, Point([3.92230177, 43.59628404]));
            //Services
            assert.isArray(station.services);
            assert.lengthOf(station.services, 3);
            assert.deepStrictEqual(station.services, [{"network": "heraulttransport", "id": "HT120"},
                {"network": "tam", "id": "50"}, {"network": "sncf", "id": "sncf"}]);
            //Stops
            assert.isArray(station.stops);
            assert.lengthOf(station.stops, 2);
            assert.deepStrictEqual(station.stops, [{"services": ["50"], "id": "1461", "location":
                    Point([3.92230177, 43.59628404])}, {"services": ["50"], "id": "1460",
                "location": Point([3.92230177, 43.59628404])}]);
            //Linked stations
            assert.isArray(station.linkedStations);
            assert.lengthOf(station.linkedStations, 2);
            assert.deepStrictEqual(station.linkedStations, [{"network": "sncf", "id": "OCE:SA:87688887",
                "type": "trains"}, {"network": "heraulttransport", "id": "SZ1", "type": "public_transit"}]);
            //Object properties
            // assert.strictEqual(station.prototype.length, 9)
        });

        it('should works with attributes', () => {
            let station = new viatransit.Station();
            let station2 = new viatransit.Station();
            station.fillFromAPI(stationAssets.apiFormat);
            station2.fillFromDatabase(stationAssets.dbFormat);

            assert.isNull(station2.getAttribute('blabla'));
            assert.isNull(station.getAttribute('icon'));
            assert.strictEqual(station.getAttribute('lastEdit'), '3243596244014');
        });

    });

});