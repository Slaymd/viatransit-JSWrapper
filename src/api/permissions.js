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
    const url = apiUrl + "/users/permissions?id=" + userId;

    return await axios.get(url, { headers: { Authorization: 'Bearer '.concat(token)}, timeout: 15000})
        .then((res) => {
            return res.data;
        }).catch((e) => {
                return e.response.data;
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
    const url = apiUrl + "/users/permissions?id=" + userId;

    return await axios.put(url, { permissions }, { headers: { Authorization: 'Bearer '.concat(token)}, timeout: 15000})
        .then((res) => {
            return res.data;
        }).catch((e) => {
            return e.response.data;
        });
}

/**
 *
 * @param token
 * @param apiUrl
 * @returns {Promise<*>}
 */
async function getAllPermissions(/*String*/token, /*String*/apiUrl)
{
    const url = apiUrl + "/permissions/";

    return await axios.get(url, { headers: { Authorization: 'Bearer '.concat(token)}, timeout: 15000})
        .then((res) => {
            return res.data;
        }).catch((e) => {
                return e.response.data;
            }
        );
}

module.exports = { getPermissions, getAllPermissions, updatePermissions };