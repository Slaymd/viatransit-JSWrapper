//Imports
const axios = require('axios');

/**
 * viaTransit Newsletter
 * @module viatransit
 */

/**
 * subscribe to our newsletter
 * @async
 * @exports viatransit.API.subscribeNewsletter
 * @param email
 * @param apiUrl
 * @return {Promise<String>}
 */
async function subscribeNewsletter(/*String*/email, /*String*/apiUrl)
{
    const url = apiUrl + "/newsletter/";
    const data = {email};

    return await axios.post(url, data, {timeout: 15000}).then(res => {
        return res.data;
    }).catch(e => {
        return e.response.data;
    });
}

module.exports = { subscribeNewsletter };