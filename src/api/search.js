//Imports
const axios = require('axios');

//Models
const Station = require('../models/Station');

/**
 * Search in database
 * @param query
 * @param nearbyCoords
 * @param apiUrl
 * @return {Promise<{public_transit?: [Station], trains?: [Station], places?: [{id: String, types: [String], name: String, location: [Number], attributes: Object|null}]}>}
 */
async function search(/*String*/query, /*[Number]*/nearbyCoords = null, /*String*/apiUrl)
{
    const url = apiUrl + '/search?q=' + query + (nearbyCoords === null ? '' : '&lon=' + nearbyCoords[0] + '&lat=' + nearbyCoords[1]);

    return axios.get(url, {timeout: 15000}).then(res => {
        let result = {};

        for (let type of Object.keys(res.data)) {
            result[type] = res.data[type].map(apiObject => {
                if (type === 'public_transit' || type === 'trains') {
                    let station = new Station();
                    station.fillFromAPI(apiObject);
                    return station;
                } else
                    return apiObject;
            })
        }
        return result;
    });
}

module.exports = { search };