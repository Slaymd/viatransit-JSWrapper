//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const datasetsAssets = require('./assets/datasets');
const datasets = require('./assets/datasets');
const datasets1 = new viatransit.Datasets();
const datasets2 = new viatransit.Datasets();

describe('Datasets', () => {

    describe('Model', () => {

        it('should be properly filled from viaTransit API format', () => {
            datasets1.fill(datasetsAssets.datasetsAPI);
            assert.strictEqual(datasets1.id, '2684335908');
            assert.strictEqual(datasets1.uploadedBy, 'userId');
            assert.strictEqual(datasets1.verified, true);
            assert.isObject(datasets1.datasets);
        });

        it('should be properly filled from viaTransit DB format', () => {
            datasets2.fillFromDatabase(datasetsAssets.datasetsDB);
            assert.strictEqual(datasets2.id, '2684335908');
            assert.strictEqual(datasets2.uploadedBy, 'userId');
            assert.strictEqual(datasets2.verified, false);
            assert.isObject(datasets2.datasets);
        });

        it('should be complete', () => {
            assert.isTrue(datasets1.isComplete());
        })

        it('should be verified', () => {
            assert.isTrue(datasets1.isVerified());
        })

        it('datasets should have a valid type', () => {
            assert.isTrue(datasets1.isVerified());
        })

        it('datasets should have coordinates', () => {
            assert.isTrue(datasets1.isVerified());
        })

        it('should not be verified', () => {
            assert.isFalse(datasets2.isVerified());
        })

        it('datasets should not have a valid type', () => {
            assert.isFalse(datasets2.hasValidType());
        })

        it('datasets should not have coordinates', () => {
            assert.isFalse(datasets2.hasCoordinates());
        })

        it('should works with attributes', () => {
            assert.isNull(datasets1.getAttribute('blabla'));
        });

        it('should get differentes datasets types', () => {
            assert.isArray(datasets1.getAvailablesTypes());
            assert.isString(datasets1.getAvailablesTypes()[0]);
        });

        it('should get differentes kinds of datasets', () => {
            assert.isArray(datasets1.getKinds());
            assert.isString(datasets1.getKinds()[0]);
        });

    });

});