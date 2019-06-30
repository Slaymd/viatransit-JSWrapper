//Imports
const axios = require('axios');

//Models
const { User } = require('../models/User');

//Utils
const apiRoot = require('./utils').getAPIRoot();

/**
 * viaTransit users
 * @module viatransit
 */

/**
 *
 * @param token
 * @returns {Promise<*>}
 */
export async function getUser(/*String*/token)
{
    const url = apiRoot + "/users/profile/";

    return await axios.get(url, { headers: { Authorization: 'Bearer '.concat(token)}})
        .then((res) => {
            return res.data;
        }).catch((error) => {
                return null;
            }
        );
}