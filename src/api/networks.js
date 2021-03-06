//Imports
const axios = require('axios');

//Models
const Network = require('../models/Network');

/**
 * viaTransit zones
 * @module viatransit
 */

/**
 * Get networks from API
 * @async
 * @exports viatransit.API.getNetworks
 * @param apiUrl
 * @param token
 * @return {Promise<{dataUpdateDate: String, networks: Array<Network>}>}
 */
async function getNetworks(/*String*/apiUrl, token)
{
    const url = apiUrl + '/networks/';

    return axios.get(url, { headers: { Authorization: 'Bearer '.concat(token)}, timeout: 15000})
    .then(res => {
        let networks = [];

        for (let networkApiObj of res.data.networks) {
            networks.push(new Network(networkApiObj));
        }
        return {dataUpdateDate: res.data.dataUpdateDate, networks};
    });
}

/**
 * Create network from API
 * @async
 * @exports viatransit.API.createNetwork
 * @param apiUrl
 * @param token
 * @param network
 * @return {Promise<{id: String}>}
 */
async function createNetwork(/*String*/apiUrl, /*String*/token, /*Network*/network)
{
    const url = apiUrl + '/networks/';
    const data = {network};

    return axios.post(url, data, { headers: { Authorization: 'Bearer '.concat(token)}, timeout: 15000})
    .then((res) => {
        return res.data;
    }).catch((e) => {
        return e.response.data;
    });
}

/**
 * Update network from API
 * @async
 * @exports viatransit.API.updateNetwork
 * @param apiUrl
 * @param token
 * @param key
 * @param network
 * @return {Promise<{String: String}>}
 */
async function updateNetwork(/*String*/apiUrl, /*String*/token, /*String*/key, /*Network*/network)
{
    const url = apiUrl + "/networks?key=" + key;

    return await axios.put(url, { network }, { headers: { Authorization: 'Bearer '.concat(token)}, timeout: 15000})
        .then((res) => {
            return res.data;
        }).catch((e) => {
            return e.response.data;
        });
}

/**
 * Delete network from API
 * @async
 * @exports viatransit.API.deleteNetwork
 * @param apiUrl
 * @param token
 * @param key
 * @return {Promise<{String: String}>}
 */
async function deleteNetwork(/*String*/apiUrl, /*String*/token, /*String*/key)
{
    const url = apiUrl + "/networks/";
    const data = {key};

    return await axios.delete(url, { headers: { Authorization: 'Bearer '.concat(token)}, data, timeout: 15000})
        .then((res) => {
            return res.data;
        }).catch((e) => {
            return e.response.data;
        });
}

module.exports = { getNetworks, createNetwork, updateNetwork, deleteNetwork };