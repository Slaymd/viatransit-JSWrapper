//Imports
const axios = require('axios');

//Models
const Itinerary = require('../models/Itinerary');

/**
 * viaTransit itineraries
 * @module viatransit
 */

/**
 * Get itineraries between two coordinates
 * @async
 * @exports viatransit.API.getItineraries
 * @param apiUrl
 * @param fromCoordinates
 * @param toCoordinates
 * @param fromDate
 * @return {Promise<Itinerary>}
 */
async function getItineraries(/*String*/apiUrl, /*number[]*/fromCoordinates, /*number[]*/toCoordinates, /*(Date|null)*/fromDate)
{
    if (!(fromCoordinates instanceof Array) || !(toCoordinates instanceof Array) || fromCoordinates.length !== 2 || toCoordinates.length !== 2)
        return null;

    const from = fromCoordinates.join(';');
    const to = toCoordinates.join(';');

    const url = apiUrl + '/itineraries?from=' + from + '&to=' + to + '&fromDate=' + (!fromDate ? (new Date()).toISOString() : fromDate.toISOString());

    return axios.get(url, {timeout: 30000}).then(res => {
        if (!(res.data instanceof Array))
            return [];

        let itineraries = [];

        for (let itineraryJson of res.data) {
            itineraries.push(new Itinerary(itineraryJson));
        }

        return itineraries;
    });
}

module.exports = { getItineraries };