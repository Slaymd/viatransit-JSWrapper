//Imports
const axios = require('axios');

//Models
const Disruption = require('../models/Disruption');

/**
 * viaTransit schedules
 * @module viatransit
 */

/**
 * Get disruptions from API on network
 * @async
 * @exports viatransit.API.getNetworkDisruptions
 * @param networkKey
 * @param apiUrl
 * @return {Promise<{dataUpdateDate: String, disruptions: Array<Disruption>}>}
 */
async function getNetworkDisruptions(/*String*/networkKey, /*String*/apiUrl)
{
    const url = apiUrl + '/disruptions?network=' + networkKey;

    return axios.get(url, {timeout: 15000}).then(res => {
        try {
            let disruptions = [];

            for (let disruptionApiObj of res.data.disruptions) {
                let disruption = new Disruption();
                disruption.fillFromAPI(disruptionApiObj);
                disruptions.push(disruption);
            }
            return {dataUpdateDate: res.data.dataUpdateDate, disruptions};
        } catch {
            return {dataUpdateDate: null, disruptions: []};
        }
    });
}

/**
 * Get disruptions from API on network zone
 * @async
 * @exports viatransit.API.getNetworkZoneDisruptions
 * @param zoneKey
 * @param apiUrl
 * @return {Promise<Array<Disruption>>}
 */
async function getNetworkZoneDisruptions(/*String*/zoneKey, /*String*/apiUrl)
{
    const url = apiUrl + '/disruptions?networkZone=' + zoneKey;

    return axios.get(url, {timeout: 15000}).then(res => {
        try {
            if (!(res.data instanceof Array))
                return [];
            let disruptions = [];

            for (let disruptionApiObj of res.data) {
                let disruption = new Disruption();
                disruption.fillFromAPI(disruptionApiObj);
                disruptions.push(disruption);
            }
            return disruptions;
        } catch {
            return null;
        }
    });
}

module.exports = { getNetworkZoneDisruptions, getNetworkDisruptions };
