//Imports
const axios = require('axios');

//Models
const Permissions = require('../models/Permissions');

/**
 * viaTransit permissions
 * @module viatransit
 */

/**
 *
 * @param token
 * @param userId
 * @param apiUrl
 * @returns {Promise<*>}
 */
async function getPermissions(/*String*/token, /*String*/userId, /*String*/apiUrl)
{
    const url = apiUrl + "/users/permissions/id=" + userId;

    return await axios.get(url, { headers: { Authorization: 'Bearer '.concat(token)}})
        .then((res) => {
            return res.data;
        }).catch((e) => {
                return e.response.data.error;
            }
        );
}

/**
 *
 * @param token
 * @param userId
 * @param permissions
 * @param apiUrl
 * @returns {Promise<*>}
 */
async function updatePermissions(/*String*/token, /*userId*/userId, /*Permissions*/permissions, /*String*/apiUrl)
{
    const url = apiUrl + "/users/permissions/";

    return await axios.put(url, { id : userId, permissions }, { headers: { Authorization: 'Bearer '.concat(token)}})
        .then((res) => {
            return res.data.success;
        }).catch((e) => {
                return e.response.data.error;
            }
        );
}

module.exports = { getPermissions, updatePermissions };