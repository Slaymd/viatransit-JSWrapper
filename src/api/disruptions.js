//Imports
const axios = require('axios');

//Models
const Disruption = require('../models/Disruption');

//Utils
const apiRoot = require('./utils').getAPIRoot();

/**
 * viaTransit schedules
 * @module viatransit
 */

/**
 * Get disruptions from API on network
 * @async
 * @exports viatransit.API.getNetworkDisruptions
 * @param networkKey
 * @return {Promise<{dataUpdateDate: String, disruptions: Array<Disruption>}>}
 */
async function getNetworkDisruptions(/*String*/networkKey)
{
    const url = apiRoot + '/disruptions?network=' + networkKey;

    return axios.get(url).then(res => {
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
 * @return {Promise<Array<Disruption>>}
 */
async function getNetworkZoneDisruptions(/*String*/zoneKey) {
    const url = apiRoot + '/disruptions?networkZone=' + zoneKey;

    return axios.get(url).then(res => {
        if (!(res.data instanceof Array))
            return [];
        let disruptions = [];

        for (let disruptionApiObj of res.data) {
            let disruption = new Disruption();
            disruption.fillFromAPI(disruptionApiObj);
            disruptions.push(disruption);
        }
        return disruptions;
    });
}

module.exports = { getNetworkZoneDisruptions, getNetworkDisruptions };
