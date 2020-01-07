//Imports
const axios = require('axios');

/**
 * viaTransit maps
 * @module viatransit
 */

/**
 * Get line map from API
 * @async
 * @exports viatransit.API.getLineMap
 * @param apiUrl
 * @param networkServiceKey
 * @param lineId
 * @return {Promise<{lineSegments: [{id: String, networkId: String, networkServiceKey: String, lineId: String, fromStopId: String, toStopId: String, directionId: Number, shape: [ [ Number ] ], attributes: Object|null}], stations: [{stopId: String, stationId: String, location: {type: String, coordinates: [ Number ]}, name: String, lines: [ {network: String, id: String} ]}]}>}
 */
async function getLineMap(/*String*/apiUrl, /*String*/networkServiceKey, /*String*/lineId)
{
    const url = apiUrl + '/map/line?serviceKey=' + networkServiceKey + '&lineId=' + lineId;

    return axios.get(url).then(res => {
        return res.data;
    });
}

module.exports = { getLineMap };