//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const vehicleAssets = require('./assets/vehicles.js');
const vehicle1 = new viatransit.Vehicle(vehicleAssets.vehicle1);

describe('Vehicles', () => {

    describe('API', () => {

        it('should receive line vehicles', async () => {
            viatransit.API.setAPIRoot('https://beta.api.viatransit.fr/v1');
            const vehicles = await viatransit.API.getVehicleLocations('transpor', 'L1');
            viatransit.API.setAPIRoot('https://api.viatransit.fr/v1');

            assert.isArray(vehicles);
        }).timeout(4000);

    });

    describe('Model', () => {

        it('should be properly created without constructor', () => {
            assert.instanceOf(new viatransit.Vehicle(), viatransit.Vehicle);
        });

        it('should be properly filled from viaTransit API format', () => {
            //Generic properties
            assert.strictEqual(vehicle1.id, '25');
            assert.strictEqual(vehicle1.networkKey, 'transpor');
            assert.strictEqual(vehicle1.tripId, '4a1c3696-0290-403c-b2dd-8031b7834702');
            assert.strictEqual(vehicle1.lineId, 'L1');
            assert.strictEqual(vehicle1.sequenceId, 1);
            //Current location
            assert.isArray(vehicle1.currentLocation);
            assert.lengthOf(vehicle1.currentLocation, 2);
            assert.deepStrictEqual(vehicle1.currentLocation, [3.9802157878875732, 43.54865697708563]);
            //Vehicle route
            assert.strictEqual(vehicle1.routeSegments[0].encodedSegment, "kkhWcrxhGeFx@cEt@q@Lw@E_AOu@o@y@q@_Ak@{@[_Du@gE{@oFuAqAOyMqCy@LiB`DBnAoCtE");
            assert.deepStrictEqual(vehicle1.getRoute()[0].segment, [[3.98022, 43.54866], [3.98137, 43.54837], [3.98235, 43.5481], [3.9826, 43.54803], [3.98288, 43.54806], [3.9832, 43.54814], [3.98347, 43.54838], [3.98376, 43.54863], [3.98408, 43.54885], [3.98438, 43.54899], [3.98518, 43.54926], [3.98618, 43.54956], [3.98738, 43.54999], [3.98779, 43.55007], [3.99016, 43.5508], [3.99045, 43.55073], [3.99098, 43.54992], [3.99096, 43.54952], [3.99168, 43.54845]]);
            assert.strictEqual(vehicle1.routeSegments[0].duration, 865);
            //Attributes
            assert.strictEqual(vehicle1.getAttribute('licencePlate'), 'DY-704-HK');
        });

        it('should encode and set route line string', () => {
            const newLineString = [[3.98022,43.54866],[3.98262,43.54803],[3.98285,43.54801],[3.98299,43.54797],[3.98304,43.54788],[3.98302,43.54774],[3.98316,43.54753],[3.9836,43.54681],[3.98312,43.54667],[3.98299,43.54644],[3.98261,43.54633],[3.98251,43.54626],[3.98276,43.54578],[3.98267,43.54541],[3.98267,43.54519],[3.98272,43.54519],[3.98289,43.54516],[3.98301,43.54505],[3.98321,43.54514],[3.98324,43.54514]] ;

            let vehicleTmp = new viatransit.Vehicle(vehicleAssets.vehicle1);

            assert.strictEqual(vehicleTmp.routeSegments[0].encodedSegment, "kkhWcrxhGeFx@cEt@q@Lw@E_AOu@o@y@q@_Ak@{@[_Du@gE{@oFuAqAOyMqCy@LiB`DBnAoCtE");

            vehicleTmp.setRoute([{segment: newLineString, duration: 500, nextStation: {id: "1", stopId: "1-1", name: "Test"}}]);

            assert.lengthOf(vehicleTmp.routeSegments, 1);
            assert.strictEqual(vehicleTmp.routeSegments[0].encodedSegment, "kkhWcrxhG_N|Bm@B[FIPBZ[h@wAnC~AZXl@jATRLq@~APhA?j@I?a@DWTg@QE?");
            assert.strictEqual(vehicleTmp.routeSegments[0].duration, 500);
            assert.deepStrictEqual(vehicleTmp.routeSegments[0].nextStation, {id: "1", stopId: "1-1", name: "Test"});
            assert.deepStrictEqual(vehicleTmp.getRoute()[0].segment, newLineString);
        });

    });

});