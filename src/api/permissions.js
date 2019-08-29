//Imports
const axios = require('axios');

//Models
const Permissions = require('../models/Permissions');

//Utils
const apiRoot = require('./utils').getAPIRoot();

/**
 * viaTransit permissions
 * @module viatransit
 */

/**
 *
 * @param token
 * @param userId
 * @returns {Promise<*>}
 */
async function getPermissions(/*String*/token, /*String*/userId)
{
    const url = apiRoot + "/users/permissions/";
    const data = {id: userId};

    return await axios.get(url, { headers: { Authorization: 'Bearer '.concat(token)}, data: data})
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
 * @returns {Promise<*>}
 */
async function updatePermissions(/*String*/token, /*userId*/userId, /*Permissions*/permissions)
{
    const url = apiRoot + "/users/permissions/";

    return await axios.put(url, { id : userId, permissions }, { headers: { Authorization: 'Bearer '.concat(token)}})
        .then((res) => {
            return res.data.success;
        }).catch((e) => {
                return e.response.data.error;
            }
        );
}

module.exports = { getPermissions, updatePermissions };