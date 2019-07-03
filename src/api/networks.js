//Imports
const axios = require('axios');

//Models
const Network = require('../models/Network');

//Utils
const apiRoot = require('./utils').getAPIRoot();

/**
 * viaTransit zones
 * @module viatransit
 */

/**
 * Get networks from API
 * @async
 * @exports viatransit.API.getNetworks
 * @return {Promise<{dataUpdateDate: String, zones: Array<Network>}>}
 */
async function getNetworks()
{
    const url = apiRoot + '/networks/agencies/';

    return axios.get(url).then(res => {
        let networks = [];

        for (let networkApiObj of res.data.networks) {
            let network = new Network();

            network.fillFromAPI(networkApiObj);
            networks.push(network);
        }
        return {dataUpdateDate: res.data.dataUpdateDate, networks};
    });
}

module.exports = { getNetworks };