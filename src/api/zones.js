//Imports
const axios = require('axios');

//Models
const Zone = require('../models/Zone');

//Utils
const apiRoot = require('./utils').getAPIRoot();

/**
 * viaTransit zones
 * @module viatransit
 */

/**
 * Get zones from API
 * @async
 * @exports viatransit.API.getZones
 * @return {Promise<{dataUpdateDate: String, zones: Array<Zone>}>}
 */
async function getZones()
{
    const url = apiRoot + '/networks/zones/';

    return axios.get(url).then(res => {
        let zones = [];

        for (let zoneApiObj of res.data.networkZones) {
            let zone = new Zone();

            zone.fillFromAPI(zoneApiObj);
            zones.push(zone);
        }
        return {dataUpdateDate: res.data.dataUpdateDate, zones};
    });
}

module.exports = { getZones };