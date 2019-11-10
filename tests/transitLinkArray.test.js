//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const transitLinkArraysAssets = require('./assets/transitLinkArrays.js');
let array1 = new viatransit.TransitLinkArray();
array1.fillFromAPI(transitLinkArraysAssets.array1);
let array2 = new viatransit.TransitLinkArray();
array2.fillFromAPI(transitLinkArraysAssets.array2);

describe('TransitLinkArrays', () => {

    describe('Linking', () => {

        it('should works with networks', () => {
            assert.isTrue(array1.isLinkedToNetwork('5d8a85de477a0f6728a53b17'));
            assert.isTrue(array1.isLinkedToNetwork('all'));
            assert.isTrue(array1.isLinkedToNetwork('5d8a85de477a0f6728a53b1e'));
            assert.isFalse(array2.isLinkedToNetwork('5d8a8577a0f67253b1A'));
        });

        it('should works with services', () => {
            assert.isTrue(array1.isLinkedToService('5d8a85de477a0f6728a53b17', 'tam'));
            assert.isTrue(array1.isLinkedToService('all', 'transpor'));
            assert.isFalse(array1.isLinkedToService('5d8a85de477a0f6728a53b17', 'velomagg'));
            assert.isTrue(array1.isLinkedToService('5d8a85de477a0f6728a53b17', 'public_transit'));
            assert.isFalse(array1.isLinkedToService('5d8a85de477a0f6728a53b17', 'trains'));
        });

        it('should works with lines', () => {
            assert.isTrue(array1.isLinkedToLine('5d8a85de477a0f6728a53b17', 'tam', '7'));
            assert.isTrue(array2.isLinkedToLine('5d8a85de477a0f6728a53b1e', 'transpor', 'all'));
            assert.isTrue(array2.isLinkedToLine('5d8a85de477a0f6728a53b17', 'tam', '12'));
            assert.isFalse(array1.isLinkedToLine('5d8a85de477a0f6728a53b17', 'tam', '9'));
        });

        it('should works with stations', () => {
            assert.isTrue(array1.isLinkedToStation('5d8a85de477a0f6728a53b17', 'tam', 'all', 'S5572'));
            assert.isTrue(array1.isLinkedToStation('5d8a85de477a0f6728a53b17', 'tam', '8', 'S5572'));
            assert.isTrue(array2.isLinkedToStation('5d8a85de477a0f6728a53b1e', 'transpor', 'all', 'S5689'));
            assert.isFalse(array1.isLinkedToStation('5d8a85de477a0f6728a53b17', 'tam', '7', 'S4235'));
            assert.isTrue(array2.isLinkedToStation('5d8a85de477a0f6728a53b1e', 'transpor', 'all', 'all'));
            assert.isTrue(array1.isLinkedToStation('5d8a85de477a0f6728a53b17', 'tam', '7', 'all'));
        });

        it('should works with stops', () => {
            assert.isFalse(array1.isLinkedToStop('5d8a85de477a0f6728a53b17', 'tam', '7', 'S5572', '54'));
            assert.isTrue(array1.isLinkedToStop('5d8a85de477a0f6728a53b17', 'tam', '7', 'S5571', '53'));
            assert.isTrue(array1.isLinkedToStop('5d8a85de477a0f6728a53b17', 'tam', '8', 'S5571', '53'));
            assert.isTrue(array1.isLinkedToStop('5d8a85de477a0f6728a53b17', 'tam', '7', 'S5571', 'all'));
        });

    });

});