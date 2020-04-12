//Imports
const assert = require('chai').assert;
const AbstractAttributes = require('../src/models/abstracts/AbstractAttributes');

//Assets
const attributesAssets = require('./assets/attributes');
const attributes1 = new AbstractAttributes(attributesAssets.attributes1);
const attributes2 = new AbstractAttributes(attributesAssets.attributes2);

class InheritedAttributes extends AbstractAttributes { constructor(object) { super(object); this.lineId = "test"; } }
const attributes3 = new InheritedAttributes(attributesAssets.attributes1);
const attributes4 = new InheritedAttributes(attributesAssets.attributes2);

describe('Attributes', () => {

    describe('Abstract Class', () => {

        it('should have property', () => {
            assert.instanceOf(attributes1, AbstractAttributes);
            assert.instanceOf(attributes2, AbstractAttributes);
            assert.isNotNull(attributes1.attributes);
            assert.deepStrictEqual(attributes1.getAttribute('lineId'), '1');
            assert.isObject(attributes1.getAttribute('station'));
        });

        it('should\'t have property', () => {
            assert.isNull(attributes2.attributes);
            assert.isNull(attributes1.getAttribute('sequenceId'));
            assert.isNull(attributes2.getAttribute('lineId'));
        });

    });

    describe('Inherited Abstract Class', () => {

        it('should have a working parent class', () => {
           assert.isString(attributes3.lineId);
           assert.instanceOf(attributes3, InheritedAttributes);
        });

        it('should have property', () => {
            assert.instanceOf(attributes3, AbstractAttributes);
            assert.instanceOf(attributes4, AbstractAttributes);
            assert.isNotNull(attributes3.attributes);
            assert.deepStrictEqual(attributes3.getAttribute('lineId'), '1');
            assert.isObject(attributes3.getAttribute('station'));
        });

        it('should\'t have property', () => {
            assert.isNull(attributes4.attributes);
            assert.isNull(attributes3.getAttribute('sequenceId'));
            assert.isNull(attributes4.getAttribute('lineId'));
        });

    });

});