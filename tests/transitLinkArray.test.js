//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const transitLinkArraysAssets = require('./assets/transitLinkArrays.js');
let array1 = new viatransit.TransitLinkArray(transitLinkArraysAssets.array1);
let array2 = new viatransit.TransitLinkArray();
array2.fillArray(transitLinkArraysAssets.array2);

describe('TransitLinkArrays', () => {

    describe('Linking', () => {

        it('should works with networks', () => {
            assert.isTrue(array1.isLinkedToNetwork('tam'));
            assert.isTrue(array1.isLinkedToNetwork('all'));
            assert.isTrue(array1.isLinkedToNetwork('transpor'));
            assert.isFalse(array2.isLinkedToNetwork('sncf'));
        });

        it('should works with lines', () => {
            assert.isTrue(array1.isLinkedToLine('tam', '7'));
            assert.isTrue(array2.isLinkedToLine('transpor', 'all'));
            assert.isTrue(array2.isLinkedToLine('tam', '12'));
            assert.isFalse(array1.isLinkedToLine('tam', '9'));
        });

        it('should works with stations', () => {
            assert.isTrue(array1.isLinkedToStation('tam', 'all', 'S5572'));
            assert.isTrue(array1.isLinkedToStation('tam', '8', 'S5572'));
            assert.isTrue(array2.isLinkedToStation('transpor', 'all', 'S5689'));
            assert.isFalse(array1.isLinkedToStation('tam', '7', 'S4235'));
            assert.isTrue(array2.isLinkedToStation('transpor', 'all', 'all'));
            assert.isTrue(array1.isLinkedToStation('tam', '7', 'all'));
        });

        it('should works with stops', () => {
            assert.isFalse(array1.isLinkedToStop('tam', '7', 'S5572', '54'));
            assert.isTrue(array1.isLinkedToStop('tam', '7', 'S5571', '53'));
            assert.isTrue(array1.isLinkedToStop('tam', '8', 'S5571', '53'));
            assert.isTrue(array1.isLinkedToStop('tam', '7', 'S5571', 'all'));
        });

        it('should works with trips', () => {
            assert.isTrue(array1.isLinkedToTrip('tam', 'S5571', '53', 'TRIP1'));
            assert.isFalse(array1.isLinkedToTrip('sncf', 'S5571', '53', 'TRIP1'));
            assert.isTrue(array1.isLinkedToTrip('transpor', 'S5689', '53', 'TRIP1'));
            assert.isFalse(array1.isLinkedToTrip('transpor', 'S55341', '13', 'TRIP1'));
        });

    });

});