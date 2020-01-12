//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const transitLinksAssets = require('./assets/transitLinks.js');
let link1 = new viatransit.TransitLink(transitLinksAssets.link1);
let link2 = new viatransit.TransitLink();
link2.fill(transitLinksAssets.link2);
let link3 = new viatransit.TransitLink();
link3.fill(transitLinksAssets.link3);
let link5 = new viatransit.TransitLink();
link5.fill(transitLinksAssets.link5);

describe('TransitLinks', () => {

    describe('Networks', () => {

        it('should be linked to a network', () => {
            assert.isTrue(link1.isLinkedToNetwork('tam'));
            assert.isTrue(link1.isLinkedToNetwork('all'));
            assert.isFalse(link1.isLinkedToNetwork('transpor'));
            assert.isFalse(link2.isLinkedToNetwork('tam'));
        });

        it('should be linked to everything', () => {
            assert.isTrue(link3.isLinkedToNetwork('transpor'));
            assert.isTrue(link3.isLinkedToNetwork('all'));
            assert.isTrue(link2.isLinkedToNetwork('all'));
        });

    });

    describe('Lines', () => {

        it('should be linked to a specific line', () => {
            assert.isTrue(link1.isLinkedToLine('tam', '7'));
            assert.isTrue(link2.isLinkedToLine('transpor', 'L2'));
            assert.isTrue(link3.isLinkedToLine('tam', '7'));
            assert.isTrue(link1.isLinkedToLine('tam', 'all'));
        });

        it('shouldn\'t be linked to a specific line', () => {
            assert.isFalse(link2.isLinkedToLine('tam', '7'));
            assert.isFalse(link1.isLinkedToLine('transpor', '7'));
            assert.isFalse(link5.isLinkedToLine('transp', 'L4'));
        });

    });

    describe('Stations', () => {

        it('should be linked to a specific station', () => {
            assert.isTrue(link1.isLinkedToStation('tam', '7', 'S5570'));
            assert.isTrue(link1.isLinkedToStation('tam', 'all', 'S5570'));
            assert.isTrue(link1.isLinkedToStation('tam', '7', 'all'));
            assert.isTrue(link3.isLinkedToStation('transpor', 'L4', 'SZ213'));
            assert.isTrue(link5.isLinkedToStation('transpor', 'all', 'S5689'));
        });

        it('shouldn\'t be linked to a specific station', () => {
            assert.isFalse(link1.isLinkedToStation('tam', '7', 'S570'));
            assert.isFalse(link1.isLinkedToStation('tam', '8', 'S5570'));
        });

        it('should be linked to a specific stop', () => {
            assert.isTrue(link1.isLinkedToStop('tam', '7', 'S5570', '51'));
            assert.isTrue(link3.isLinkedToStop('tam', '7', 'S5570', '51'));
            assert.isTrue(link5.isLinkedToStop('transpor', 'all', 'S5689', 'all'));
        });

        it('shouldn\'t be linked to a specific stop', () => {
            assert.isFalse(link1.isLinkedToStop('tam', '7', 'S5570', '52'));
        });

    });

    describe('Trips', () => {

        it('should be linked to a specific trip', () => {
            assert.isTrue(link1.isLinkedToTrip('tam', 'S5570', '51', 'TRIP1'));
            assert.isTrue(link5.isLinkedToTrip('transpor', 'S5689', '4324D', 'TRIP23'));
            assert.isTrue(link2.isLinkedToTrip('transpor', 'S5689', '4324D', 'TRIP2'));
        });

        it('shouldn\'t be linked to a specific trip', () => {
            assert.isFalse(link1.isLinkedToTrip('tam', 'S5570', '51', 'TRIP3'));
            assert.isFalse(link1.isLinkedToTrip('tam', 'S5570', '431', 'TRIP1'));
            assert.isFalse(link1.isLinkedToTrip('tam', 'S5689', '51', 'TRIP2'));
        });

    });

});