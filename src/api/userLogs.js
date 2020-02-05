//Imports
const axios = require('axios');

//Models
const userLogs = require('../models/UserLogs');

/**
 * viaTransit userLogs
 * @module viatransit
 */

/**
 *
 * @param token
 * @param userId
 * @param apiUrl
 * @returns {Promise<*>}
 */
async function getUserLogs(/*String*/token, /*String*/userId, /*String*/apiUrl)
{
    const url = apiUrl + "/users/logs?id=" + userId;

    return await axios.get(url, { headers: { Authorization: 'Bearer '.concat(token)}})
        .then((res) => {
            return res.data;
        }).catch((e) => {
                return e.response.data.error;
            }
        );
}

module.exports = { getUserLogs };