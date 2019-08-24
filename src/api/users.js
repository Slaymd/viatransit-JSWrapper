//Imports
const axios = require('axios');

//Models
const User = require('../models/Users');

//Utils
const apiRoot = require('./utils').getAPIRoot();

/**
 * viaTransit users
 * @module viatransit
 */

/**
 *
 * @param token
 * @param id
 * @returns {Promise<*>}
 */
async function getProfile(/*String*/token, /*String*/id)
{
    const url = apiRoot + "/users/profile/";
    const data = {id};

    return await axios.get(url, { headers: { Authorization: 'Bearer '.concat(token)}, data: data})
        .then((res) => {
            return res.data.user;
        }).catch((e) => {
                return e.response.data.error;
            }
        );
}

/**
 *
 * @param token
 * @param user
 * @returns {Promise<*>}
 */
async function updateProfile(/*String*/token, /*User*/user)
{
    const url = apiRoot + "/users/profile/";

    return await axios.put(url, { user }, { headers: { Authorization: 'Bearer '.concat(token)}})
        .then((res) => {
            return res.data.success;
        }).catch((e) => {
                return e.response.data.error;
            }
        );
}

/**
 *
 * @param token
 * @param id
 * @returns {Promise<*>}
 */
async function deleteProfile(/*String*/token, /*String*/id)
{
    const url = apiRoot + "/users/profile/";
    const data = {id};

    return await axios.delete(url, { headers: { Authorization: 'Bearer '.concat(token)}, data: data})
        .then((res) => {
            return res.data.success;
        }).catch((e) => {
            return e.response.data.error
            }
        );
}

module.exports = { getProfile, updateProfile, deleteProfile };