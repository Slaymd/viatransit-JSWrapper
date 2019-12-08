//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
//Assets
const networkAssets = require('./assets/networks');
const network1 = new viatransit.Network(networkAssets.network1);
const network2 = new viatransit.Network(networkAssets.network2);

describe('Networks', () => {

    describe('API', () => {

        it('should receive all networks'/*, async () => {
            let networks = await viatransit.API.getNetworks();

            assert.isArray(networks.networks);
            for (let network of networks.networks) {
                assert.instanceOf(network, viatransit.Network);
            }
        }*/);

    });

    describe('Model', () => {

        it('should be properly filled from viaTransit API format', () => {
            //Generic properties
            assert.strictEqual(network1.id, '5cc472bfad0bdb2fd679cac8');
            assert.strictEqual(network1.name, 'TaM');
            assert.strictEqual(network1.status, 'enabled');
            //Map
            assert.strictEqual(network1.map.area.type, 'Polygon');
            assert.deepStrictEqual(network1.map.area.coordinates, [[[3.674240112304687, 43.67085166460574], [3.675613403320312, 43.58635949637695], [3.742218017578125, 43.549045783240295], [3.8383483886718746, 43.51220693236043], [3.9262390136718754, 43.5112109754582], [4.06219482421875, 43.54506428956427], [4.0869140625, 43.60078126848975], [4.0656280517578125, 43.670354999132734], [4.003143310546875, 43.72992550936172], [3.9808273315429688, 43.748157139226024], [3.940830230712891, 43.76291201161052], [3.8596343994140625, 43.72297866632312], [3.674240112304687, 43.67085166460574]]]);
            assert.strictEqual(network1.map.center.type, 'Point');
            assert.deepStrictEqual(network1.map.center.coordinates, [3.880485892295837, 43.60499214691949]);
            //Services
            assert.isArray(network1.services);
            assert.lengthOf(network1.services, 2);
            assert.instanceOf(network1.services[0], viatransit.NetworkService);
            assert.deepStrictEqual(network1.services[0], new viatransit.NetworkService({"key": "tam", "type": "public_transit", "name": "TaM", "links": [{"network": "5cc472bfad0bdb2fd679cac8", "service": "tam", "type": "public_transit", "attributes": {"lines": ["all"]}},], "attributes": {icon: 'tam-mini'}}));
            assert.deepStrictEqual(network1.services[1], new viatransit.NetworkService({"key": "velomagg", "type": "bike_share", "name": "Velomagg", "links": [{"network": "5cc472bfad0bdb2fd679cac8", "service": "velomagg", "type": "bike_share", "attributes": {"lines": ["all"]}},], "attributes": null}));
        });


        it('should check network service key properly', () => {
            assert.isTrue(network1.hasServiceKey('velomagg'));
            assert.isTrue(network1.hasServiceKey('tam'));
            assert.isFalse(network1.hasServiceKey('ratp'));
        });

        it('should get network service properly', () => {
            assert.deepStrictEqual(network1.getService('tam'), new viatransit.NetworkService({"key": "tam", "type": "public_transit", "name": "TaM", "links": [{"network": "5cc472bfad0bdb2fd679cac8", "service": "tam", "type": "public_transit", "attributes": {"lines": ["all"]}},], "attributes": {icon: 'tam-mini'}}));
            assert.isNull(network1.getService('tcra'));
            assert.deepStrictEqual(network1.getService('velomagg'), new viatransit.NetworkService({"key": "velomagg", "type": "bike_share", "name": "Velomagg", "links": [{"network": "5cc472bfad0bdb2fd679cac8", "service": "velomagg", "type": "bike_share", "attributes": {"lines": ["all"]}},], "attributes": null}));
        });

        it('should get line network service properly', () => {
            assert.deepStrictEqual(network1.getLineLinkedServices('tam', '8'), [new viatransit.NetworkService({"key": "tam", "type": "public_transit", "name": "TaM", "links": [{"network": "5cc472bfad0bdb2fd679cac8", "service": "tam", "type": "public_transit", "attributes": {"lines": ["all"]}},], "attributes": {icon: 'tam-mini'}})]);
            assert.isEmpty(network1.getLineLinkedServices('tcra', 'T1'));
        });

        it('should has coordinates contained in network area', () => {
            assert.isTrue(network1.hasPointInArea([3.880485892295837, 43.60499214691949]));
            assert.isFalse(network1.hasPointInArea([54.580485892295837, -43.20499214691949]));
            assert.isTrue(network2.hasPointInArea([54.580485892295837, -43.20499214691949]));
        });

        it('should works with attributes', () => {
            assert.isNull(network1.getAttribute('blabla'));
            assert.strictEqual(network1.getAttribute('website'), 'https://tam-voyages.com/');
            assert.isNull(network1.getService('velomagg').getAttribute('agencyId'));
            assert.strictEqual(network1.getService('tam').getAttribute('icon'), 'tam-mini');
            assert.isNull(network2.getAttribute('website'));
        });

    });

});