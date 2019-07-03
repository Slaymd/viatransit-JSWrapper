//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const networkAssets = require('./assets/networks.js');

describe('Networks', () => {

    describe('API', () => {

        it('should receive all networks', async () => {
            let networks = await viatransit.API.getNetworks();

            assert.isArray(networks.networks);
            for (let network of networks.networks) {
                assert.instanceOf(network, viatransit.Network);
            }
        });

    });

    describe('Model', () => {

        it('should be properly filled from database format', () => {
            let network = new viatransit.Network();
            network.fillFromDatabase(networkAssets.dbFormat);

            //Generic properties
            assert.strictEqual(network.id, '5cc472bfad0bdb2fd679cac8');
            assert.strictEqual(network.name, 'Transports de l\'Agglomération Montpelliéraine');
            assert.strictEqual(network.shortName, 'TaM');
            assert.strictEqual(network.key, 'tam');
            assert.strictEqual(network.description, 'Go Wikipedia');
            assert.strictEqual(network.agencyWebsite, 'https://tam-voyages.com/');
            //Cities
            assert.isArray(network.cities);
            assert.lengthOf(network.cities, 1);
            assert.deepStrictEqual(network.cities, ['Montpellier']);
            //Information types
            assert.isArray(network.informationTypes);
            assert.lengthOf(network.informationTypes, 2);
            assert.deepStrictEqual(network.informationTypes, ["realtime", "theorical"]);
            //Types
            assert.isArray(network.types);
            assert.lengthOf(network.types, 1);
            assert.deepStrictEqual(network.types, [{"modes": ["tramway", "bus"], "type": "public_transit", "attributes": null}]);
        });

        it('should be properly filled from viaTransit API format', () => {
            let network = new viatransit.Network();
            network.fillFromAPI(networkAssets.apiFormat);

            //Generic properties
            assert.strictEqual(network.id, '5cc472bfad0bdb2fd679cac8');
            assert.strictEqual(network.name, 'Transports de l\'Agglomération Montpelliéraine');
            assert.strictEqual(network.shortName, 'TaM');
            assert.strictEqual(network.key, 'tam');
            assert.strictEqual(network.description, 'Go Wikipedia');
            assert.strictEqual(network.agencyWebsite, 'https://tam-voyages.com/');
            //Cities
            assert.isArray(network.cities);
            assert.lengthOf(network.cities, 1);
            assert.deepStrictEqual(network.cities, ['Montpellier']);
            //Information types
            assert.isArray(network.informationTypes);
            assert.lengthOf(network.informationTypes, 2);
            assert.deepStrictEqual(network.informationTypes, ["realtime", "theorical"]);
            //Types
            assert.isArray(network.types);
            assert.lengthOf(network.types, 1);
            assert.deepStrictEqual(network.types, [{"modes": ["tramway", "bus"], "type": "public_transit", "attributes": null}]);
        });

        it('should works with attributes', () => {
            let network = new viatransit.Network();
            let network2 = new viatransit.Network();
            network.fillFromAPI(networkAssets.apiFormat);
            network2.fillFromDatabase(networkAssets.dbFormat);

            assert.isNull(network2.getAttribute('blabla'));
            assert.isNull(network.getAttribute('lang'));
            assert.strictEqual(network.getAttribute('country'), 'fr');
        });

    });

});