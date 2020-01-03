//Imports
const axios = require('axios');

//Models
const Network = require('../models/Network');

/**
 * viaTransit zones
 * @module viatransit
 */

/**
 * Get networks from API
 * @async
 * @exports viatransit.API.getNetworks
 * @param apiUrl
 * @return {Promise<{dataUpdateDate: String, networks: Array<Network>}>}
 */
async function getNetworks(/*String*/apiUrl)
{
    const url = apiUrl + '/networks/';

    return axios.get(url).then(res => {
        let networks = [];

        for (let networkApiObj of res.data.networks) {
            networks.push(new Network(networkApiObj));
        }
        return {dataUpdateDate: res.data.dataUpdateDate, networks};
    });
}

module.exports = { getNetworks };