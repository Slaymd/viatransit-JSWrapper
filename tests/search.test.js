//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');
const Point = require('@turf/turf').point;

describe('Search', () => {

    describe('API', () => {

        it('should receive search results (search)', async () => {
            const searchResults = await viatransit.API.search('Gare', [3.880261, 43.605133]);

            assert.isObject(searchResults);
        });

        it('should receive reverse search results', async () => {
            const searchResults = await viatransit.API.reverseSearch(3.880261, 43.605133);

            assert.isObject(searchResults);
        });

    });

});