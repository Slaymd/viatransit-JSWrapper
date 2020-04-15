//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const itineraryAssets = require('./assets/itineraries');
const itinerary1 = new viatransit.Itinerary(itineraryAssets.itinerary1);

describe('Itineraries', () => {

    describe('API', () => {

        // it('should receive all networks', async () => {
        //     let networks = await viatransit.API.getNetworks();
        //
        //     assert.isArray(networks.networks);
        //     for (let network of networks.networks) {
        //         assert.instanceOf(network, viatransit.Network);
        //     }
        // });

    });

    describe('Model', () => {

        it('should be properly filled from viaTransit API format', () => {
            //Generic properties
            assert.strictEqual(itinerary1.arrivalDate, "2020-04-06T17:41:00.000Z");
            assert.strictEqual(itinerary1.departureDate, "2020-04-06T17:30:00.000Z");
            assert.lengthOf(itinerary1.getAttribute('tags'), 2);
            assert.strictEqual(itinerary1.getAttribute('tags')[1], "least_connections");
            //Sections
            assert.lengthOf(itinerary1.sections, 3);
            assert.instanceOf(itinerary1.sections[1], viatransit.ItinerarySection);
            assert.strictEqual(itinerary1.sections[0].type, 'walking');
            assert.strictEqual(itinerary1.sections[1].type, "public_transit");
            assert.lengthOf(itinerary1.sections[0].shape, 6);
            assert.strictEqual(itinerary1.sections[2].departureDate, "2020-04-06T17:36:00.000Z");
            assert.strictEqual(itinerary1.sections[2].arrivalDate, "2020-04-06T17:41:00.000Z");
            //Steps
            assert.lengthOf(itinerary1.sections[1].steps, 3);
            assert.instanceOf(itinerary1.sections[1].steps[0], viatransit.ItinerarySectionStep);
            assert.strictEqual(itinerary1.sections[1].steps[1].departureDate, "2020-04-06T17:34:45.000Z");
            assert.strictEqual(itinerary1.sections[1].steps[1].arrivalDate, "2020-04-06T17:34:30.000Z");
            assert.deepStrictEqual(itinerary1.sections[1].steps[1].coordinates, [3.890179395675659,43.60893860671964]);
            assert.strictEqual(itinerary1.sections[1].steps[1].name, "Léon Blum");
            assert.strictEqual(itinerary1.sections[1].steps[1].type, "station");
            assert.strictEqual(itinerary1.sections[0].steps[0].type, "coords");
            assert.strictEqual(itinerary1.sections[1].steps[1].getAttribute('stationId'), "S5379");
        });

    });

});