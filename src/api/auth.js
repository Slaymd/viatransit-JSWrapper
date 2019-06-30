//Imports
const axios = require('axios');

//Models
const User = require('../models/User');

//Utils
const apiRoot = require('./utils').getAPIRoot();

/**
 * viaTransit auth
 * @module viatransit
 */

/**
 * Get jwt_token from API
 * @async
 * @exports viatransit.login
 * @param email
 * @param password
 * @return {Promise<String>}
 */
async function login(/*String*/email, /*String*/password)
{
    const url = apiRoot + "/users/login/";
    const data = {email, password};

    return await axios.post(url, data).then(res => {
        return res.data.token;
    }).catch(e => {
        return e.response.data.error;
    });
}

/**
 * Create new account
 * @async
 * @exports viatransit.register
 * @param email
 * @param password
 * @return {Promise<String>}
 */
async function register(/*String*/email, /*String*/password)
{
    const url = apiRoot + "/users/register/";
    const data = {email, password};

    return await axios.post(url, data).then(res => {
        return res;
    }).catch(e => {
        return e.response.data.error;
    });
}

module.exports = { login, register };