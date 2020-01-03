//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets

describe('Versions', () => {

    describe('API', () => {

        it('should require update', async () => {
            assert.isTrue(await viatransit.API.isDataRequiringUpdate('networks', new Date('2019-01-03T03:00:14.131Z')));
        });

        it('shouldn\'t require update', async () => {
            const dataUpdateDate = await viatransit.API.getDataVersionDate('networks');
            assert.isFalse(await viatransit.API.isDataRequiringUpdate('networks', dataUpdateDate));
        });

        it('shouldn\'t get data date for unknown data key', async () => {
            assert.isNull(await viatransit.API.getDataVersionDate('network'));
        });

    });

});