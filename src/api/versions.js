//Imports
const axios = require('axios');

/**
 * viaTransit versions
 * @module viatransit
 */

/**
 * Check data update availability
 * @async
 * @exports viatransit.API.isDataRequiringUpdate
 * @param apiUrl
 * @param dataKey
 * @param actualVersionDate
 * @return {Promise<boolean>}
 */
async function isDataRequiringUpdate(/*String*/apiUrl, /*String*/dataKey, /*Date*/actualVersionDate)
{
    const url = apiUrl + '/versions?key=' + dataKey + "&date=" + actualVersionDate.toISOString();

    return axios.get(url).then(res => {
        return res.data.needsUpdate;
    });
}

/**
 * Get data version date
 * @async
 * @exports viatransit.API.getDataVersionDate
 * @param apiUrl
 * @param dataKey
 * @return {Promise<Date|null>}
 */
async function getDataVersionDate(/*String*/apiUrl, /*String*/dataKey)
{
    const url = apiUrl + '/versions?key=' + dataKey;

    return axios.get(url).then(res => {
        if (!res.data.updateDate)
            return null;
        return new Date(res.data.updateDate);
    });
}

module.exports = { isDataRequiringUpdate, getDataVersionDate };