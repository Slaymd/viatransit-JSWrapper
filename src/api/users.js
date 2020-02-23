//Imports
const axios = require('axios');

//Models
const User = require('../models/Users');

/**
 * viaTransit users
 * @module viatransit
 */

/**
 *
 * @param token
 * @param id
 * @param apiUrl
 * @returns {Promise<*>}
 */
async function getProfile(/*String*/token, /*String*/id, /*String*/apiUrl)
{
    const url = apiUrl + "/users/profile?id=" + id;

    return await axios.get(url, { headers: { Authorization: 'Bearer '.concat(token)}, timeout: 15000})
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
async function getAllUsers(/*String*/token, /*String*/apiUrl)
{
    const url = apiUrl + "/users/";

    return await axios.get(url, { headers: { Authorization: 'Bearer '.concat(token)}, timeout: 15000})
        .then((res) => {
            return res.data;
        }).catch((e) => {
                return e.response.data;
        });
}

/**
 *
 * @param token
 * @param user
 * @param apiUrl
 * @returns {Promise<*>}
 */
async function updateProfile(/*String*/token, /*User*/user, /*String*/apiUrl)
{
    const url = apiUrl + "/users/profile/";

    return await axios.put(url, { user }, { headers: { Authorization: 'Bearer '.concat(token)}, timeout: 15000})
        .then((res) => {
            return res.data;
        }).catch((e) => {
                return e.response.data;
        });
}

/**
 *
 * @param token
 * @param id
 * @param apiUrl
 * @returns {Promise<*>}
 */
async function deleteProfile(/*String*/token, /*String*/id, /*String*/apiUrl)
{
    const url = apiUrl + "/users/profile/";
    const data = {id};

    return await axios.delete(url, { headers: { Authorization: 'Bearer '.concat(token)}, data: data, timeout: 15000})
        .then((res) => {
            return res.data;
        }).catch((e) => {
            return e.response.data
        });
}

module.exports = { getProfile, getAllUsers, updateProfile, deleteProfile };