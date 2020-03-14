//Imports
const axios = require('axios');

/**
 * viaTransit auth
 * @module viatransit
 */

/**
 * Get jwt_token from API
 * @async
 * @exports viatransit.API.login
 * @param email
 * @param password
 * @param apiUrl
 * @return {Promise<String>}
 */
async function login(/*String*/email, /*String*/password, /*String*/apiUrl)
{
    const url = apiUrl + "/users/login/";
    const data = {email, password};

    return await axios.post(url, data, {timeout: 15000}).then(res => {
        return res.data;
    }).catch(e => {
        return e.response;
    });
}

/**
 * Create an user
 * @async
 * @exports viatransit.API.register
 * @param email
 * @param password
 * @param apiUrl
 * @return {Promise<String>}
 */
async function register(/*String*/email, /*String*/password, /*String*/apiUrl)
{
    const url = apiUrl + "/users/register/";
    const data = {email, password};

    return await axios.post(url, data, {timeout: 15000}).then(res => {
        return res.data;
    }).catch(e => {
        return e.response;
    });
}

module.exports = { login, register };