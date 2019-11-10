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
let link4 = new viatransit.TransitLink();
link4.fill(transitLinksAssets.link4);
let link5 = new viatransit.TransitLink();
link5.fill(transitLinksAssets.link5);

describe('TransitLinks', () => {

    describe('Networks', () => {

        it('should be linked to a network', () => {
            assert.isTrue(link1.isLinkedToNetwork('5d8a85de477a0f6728a53b17'));
            assert.isTrue(link1.isLinkedToNetwork('all'));
            assert.isFalse(link1.isLinkedToNetwork('5d8a85de477a0728a53b17'));
            assert.isFalse(link2.isLinkedToNetwork('5d8a85de477a0f6728a53b17'));
        });

        it('should be linked to everything', () => {
            assert.isTrue(link3.isLinkedToNetwork('5d8a85de477a0f6728a53b17'));
            assert.isTrue(link3.isLinkedToNetwork('all'));
            assert.isTrue(link2.isLinkedToNetwork('all'));
        });

    });

    describe('Services', () => {

        it('should be linked to a network service', () => {
            assert.isTrue(link1.isLinkedToService('5d8a85de477a0f6728a53b17', 'tam'));
            assert.isFalse(link1.isLinkedToService('5d8a85de477a0f6728a53b1e', 'tam'));
            assert.isFalse(link1.isLinkedToService('5d8a85de477a0f6728a53b17', 'transpor'));
            assert.isTrue(link2.isLinkedToService('all', 'transpor'));
            assert.isTrue(link4.isLinkedToService('5d8a85de477a0f6728a53b1e', 'all'));
        });

        it('should be linked to a public_transit network service', () => {
            assert.isTrue(link1.isLinkedToService('5d8a85de477a0f6728a53b17', 'public_transit'));
            assert.isTrue(link5.isLinkedToService('5d8a85de477a0f6728a53b1e', 'public_transit'));
        });

    });

    describe('Lines', () => {

        it('should be linked to a specific line', () => {
            assert.isTrue(link1.isLinkedToLine('5d8a85de477a0f6728a53b17', 'tam', '7'));
            assert.isTrue(link2.isLinkedToLine('5d8a85de477a0f6728a53b1e', 'transpor', 'L2'));
            assert.isTrue(link3.isLinkedToLine('5d8a85de477a0f6728a53b17', 'tam', '7'));
            assert.isTrue(link4.isLinkedToLine('5d8a85de477a0f6728a53b17', 'tam', '7'));
            assert.isTrue(link1.isLinkedToLine('5d8a85de477a0f6728a53b17', 'tam', 'all'));
        });

        it('shouldn\'t be linked to a specific line', () => {
            assert.isFalse(link2.isLinkedToLine('5d8a85de477a0f6728a53b17', 'tam', '7'));
            assert.isFalse(link1.isLinkedToLine('5d8a85de477a0f6728a53b17', 'transpor', '7'));
            assert.isFalse(link5.isLinkedToLine('5d8a85de477a0f6728a53b1e', 'transpor', 'L4'));
        });

    });

    describe('Stations', () => {

        it('should be linked to a specific station', () => {
            assert.isTrue(link1.isLinkedToStation('5d8a85de477a0f6728a53b17', 'tam', '7', 'S5570'));
            assert.isTrue(link1.isLinkedToStation('5d8a85de477a0f6728a53b17', 'tam', 'all', 'S5570'));
            assert.isTrue(link1.isLinkedToStation('5d8a85de477a0f6728a53b17', 'tam', '7', 'all'));
            assert.isTrue(link3.isLinkedToStation('5d8a85de477a0f673b17', 'transpor', 'L4', 'SZ213'));
            assert.isTrue(link5.isLinkedToStation('5d8a85de477a0f6728a53b1e', 'transpor', 'all', 'S5689'));
        });

        it('shouldn\'t be linked to a specific station', () => {
            assert.isFalse(link1.isLinkedToStation('5d8a85de477a0f6728a53b17', 'tam', '7', 'S570'));
            assert.isFalse(link1.isLinkedToStation('5d8a85de477a0f6728a53b17', 'tam', '8', 'S5570'));
        });

        it('should be linked to a specific stop', () => {
            assert.isTrue(link1.isLinkedToStop('5d8a85de477a0f6728a53b17', 'tam', '7', 'S5570', '51'));
            assert.isTrue(link3.isLinkedToStop('5d8a85de477a0f6728a53b17', 'tam', '7', 'S5570', '51'));
            assert.isTrue(link5.isLinkedToStop('5d8a85de477a0f6728a53b1e', 'transpor', 'all', 'S5689', 'all'));
        });

        it('shouldn\'t be linked to a specific stop', () => {
            assert.isFalse(link1.isLinkedToStop('5d8a85de477a0f6728a53b17', 'tam', '7', 'S5570', '52'));
        });

    });

});