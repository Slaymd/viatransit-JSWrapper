//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');
const Point = require('@turf/turf').point;

//Assets
const stationAssets = require('./assets/stations.js');
const station1 = new viatransit.Station(stationAssets.station1);

describe('Stations', () => {

    describe('API', () => {

        it('should receive station full model (details)', async () => {
            const station = await viatransit.API.getStation('tam', 'S5472');

            assert.instanceOf(station, viatransit.Station);
        });

        it('should receive an array of location\'s nearby stations (nearby)', async () => {
            const stations = await viatransit.API.getNearbyStations([3.903846, 43.597512], 100);

            assert.isArray(stations);
            if (stations.length === 1)
                return;
            for (let station of stations) {
                assert.instanceOf(station, viatransit.Station);
            }
        });

        it('should receive an array of nearby stations sorted by type (nearby)', async () => {
            const res = await viatransit.API.getNearbyStationsByType([3.903846, 43.597512], 100);

            assert.lengthOf(Object.keys(res), 2);
            for (let station of res.public_transit) {
                assert.instanceOf(station, viatransit.Station);
            }
        });

    });

    describe('Model', () => {

        it('should be properly created without constructor', () => {
            assert.instanceOf(new viatransit.Station(), viatransit.Station);
            assert.instanceOf(new viatransit.Stop(), viatransit.Stop);
        });

        it('should be properly filled from viaTransit API format', () => {
            //Generic properties
            assert.strictEqual(station1.name, 'Gare Montpellier Sud de France');
            assert.strictEqual(station1.type, 'public_transit');
            assert.strictEqual(station1.id, 'S5844');
            assert.strictEqual(station1.networkKey, 'tam');
            assert.deepStrictEqual(station1.location, {"type": "Point", "coordinates": [3.92230177, 43.59628404]});
            //Services
            assert.isArray(station1.lines);
            assert.lengthOf(station1.lines, 3);
            assert.deepStrictEqual(station1.lines, [{"networkKey": "heraulttransport", "id": "HT120"},
                {"networkKey": "tam", "id": "50"}, {"networkKey": "sncf", "id": "sncf"}]);
            //Stops
            assert.isArray(station1.stops);
            assert.lengthOf(station1.stops, 2);
            assert.instanceOf(station1.stops[0], viatransit.Stop);
            assert.deepStrictEqual(station1.stops, [{"lines": ["50"], "id": "1461", "location":
                    {"type": "Point", "coordinates": [3.92230177, 43.59628404]}, "attributes": null}, {"lines": ["50"], "id": "1460",
                    "location": {"type": "Point", "coordinates": [3.92230177, 43.59628404]}, "attributes": null}]);
            //Linked stations
            assert.isArray(station1.links);
            assert.instanceOf(station1.links, viatransit.TransitLinkArray);
            assert.lengthOf(station1.links, 1);
            assert.deepStrictEqual(station1.links, [{
                "network": "sncf",
                "lines": ["all"],
                "stations": [
                    {"stationId": "OCE:SA:87688887", "stopId": "all"}
                ],
                "trips": [],
                "attributes": null
            }]);
            //Attributes
            assert.isArray(station1.getAttribute('exits'));
        });

    });

});