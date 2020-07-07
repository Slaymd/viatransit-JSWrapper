//Imports
const axios = require('axios');

//Models
const Disruption = require('../models/Disruption');

/**
 * viaTransit schedules
 * @module viatransit
 */

/**
 * post disruption on API
 * @async
 * @exports viatransit.API.postDisruption
 * @param apiUrl
 * @param token
 * @param disruption
 * @return {Promise<{id: String}>}
 */
async function postDisruption(/*String*/apiUrl, /*String*/token, /*Disruption*/disruption)
{
    const url = apiUrl + '/disruptions/';
    const data = {disruption};

    return axios.post(url, data, { headers: { Authorization: 'Bearer '.concat(token)}, timeout: 15000})
    .then((res) => {
        return res.data;
    }).catch((e) => {
        return e.response.data;
    });
}

/**
 * Delete disruption on API
 * @async
 * @exports viatransit.API.deleteDisruption
 * @param apiUrl
 * @param token
 * @param disruptionId
 * @return {Promise<{String}>}
 */
async function deleteDisruption(/*String*/apiUrl, /*String*/token, /*String*/disruptionId)
{
    const url = apiUrl + '/disruptions?id=' + disruptionId;

    return axios.delete(url, { headers: { Authorization: 'Bearer '.concat(token)}, timeout: 15000})
    .then((res) => {
        return res.data;
    }).catch((e) => {
        return e.response.data;
    });
}

/**
 * Get all disruption from API
 * @async
 * @exports viatransit.API.getAllDisruptions
 * @param apiUrl
 * @param token
 * @return {Promise<{dataUpdateDate: String, disruptions: Array<Disruption>}>}
 */
async function getAllDisruptions(/*String*/apiUrl, /*String*/token)
{
    const url = apiUrl + '/disruptions/';

    return axios.get(url, { headers: { Authorization: 'Bearer '.concat(token)}, timeout: 15000})
    .then(res => {
        try {
            let disruptions = [];

            for (let disruptionApiObj of res.data) {
                let disruption = new Disruption();
                disruption.fill(disruptionApiObj);
                disruptions.push(disruption);
            }
            return {/*dataUpdateDate: res.data.dataUpdateDate, */disruptions};
        } catch {
            return {dataUpdateDate: null, disruptions: []};
        }
    });
}

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
                disruption.fill(disruptionApiObj);
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
 * @deprecated
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
                disruption.fill(disruptionApiObj);
                disruptions.push(disruption);
            }
            return disruptions;
        } catch {
            return null;
        }
    });
}

module.exports = { getNetworkZoneDisruptions, getNetworkDisruptions, getAllDisruptions, postDisruption, deleteDisruption };
