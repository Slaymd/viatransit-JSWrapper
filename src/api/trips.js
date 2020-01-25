//Imports
const axios = require('axios');

/**
 * viaTransit trips
 * @module viatransit
 */

/**
 * Get trip details from API
 * @async
 * @exports viatransit.API.getTrip
 * @param apiUrl
 * @param networkKey
 * @param tripId
 * @param theorical
 * @return {Promise<{headsign: String, directionId: number, lineId: string, stationSequence: [{stationId: String, stopId: String, name: String, lines: [ {network: String, id: String} ], travelTime: Number}], tripId: String, sequenceId: number, networkKey: String}>}
 */
async function getTrip(/*String*/apiUrl, /*String*/networkKey, /*String*/tripId, /*Boolean*/theorical = true)
{
    const url = apiUrl + '/trips?networkKey=' + networkKey + '&tripId=' + tripId + "&theorical=" + theorical;

    return axios.get(url).then(res => {
        return res.data;
    });
}

module.exports = { getTrip };