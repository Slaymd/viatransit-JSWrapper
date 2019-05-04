//Imports
const axios = require('axios');

//Models
const Disruption = require('../models/Disruption');

//Utils
const apiRoot = require('utils').getAPIRoot();

/**
 * viaTransit schedules
 * @module viatransit
 */

module.exports = {
    /**
     * Get disruptions from API on network
     * @async
     * @exports viatransit.getDisruptions
     * @param networkKey
     * @return {Promise<{dataUpdateDate: String, disruptions: Array<Disruption>}>}
     */
    getNetworkDisruptions: async function (/*String*/networkKey) {
        const url = apiRoot + '/disruptions?network=' + networkKey;

        return axios.get(url).then(res => {
            if (!(res.data instanceof Array))
                return [];
            let disruptions = [];

            for (let disruptionApiObj of res.data.disruptions) {
                let disruption = new Disruption();
                disruption.fillFromAPI(disruptionApiObj);
                disruptions.push(disruption);
            }
            return {dataUpdateDate: res.data.dataUpdateDate, disruptions};
        });
    },
    /**
     * Get disruptions from API on network zone
     * @async
     * @exports viatransit.getDisruptions
     * @param zoneKey
     * @return {Promise<{dataUpdateDate: String, disruptions: Array<Disruption>}>}
     */
    getNetworkZoneDisruptions: async function (/*String*/zoneKey) {
        const url = apiRoot + '/disruptions?networkZone=' + zoneKey;

        return axios.get(url).then(res => {
            if (!(res.data instanceof Array))
                return [];
            let disruptions = [];

            for (let disruptionApiObj of res.data.disruptions) {
                let disruption = new Disruption();
                disruption.fillFromAPI(disruptionApiObj);
                disruptions.push(disruption);
            }
            return {dataUpdateDate: res.data.dataUpdateDate, disruptions};
        });
    }
};
