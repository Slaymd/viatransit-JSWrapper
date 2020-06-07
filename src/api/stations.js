//Imports
const axios = require('axios');

//Models
const Station = require('../models/Station');

/**
 * viaTransit stations
 * @module viatransit
 */

/**
 * Get station full model from API
 * @async
 * @exports viatransit.API.getStation
 * @param networkKey
 * @param stationId
 * @param apiUrl
 * @return {Promise<Station>}
 */
async function getStation(/*String*/networkKey, /*String*/stationId, /*String*/apiUrl)
{
    const url = apiUrl + '/stations/details?network=' + networkKey + '&id=' + stationId;

    return axios.get(url, {timeout: 15000}).then(res => {
        return new Station(res.data);
    });
}

/**
 * Get API coordinates' nearby stations in a Zone
 * @async
 * @exports viatransit.API.getNearbyStations
 * @param coordinates
 * @param radius
 * @param apiUrl
 * @return {Promise<Array<Station>>}
 */
async function getNearbyStations(/*[Float, Float*/coordinates, /*Number*/radius = 1000, /*String*/apiUrl)
{
    const url = apiUrl + '/stations/nearby?lon=' + coordinates[0] + '&lat=' + coordinates[1] + '&r=' + radius;

    return axios.get(url, {timeout: 15000}).then(res => {
        let stations = [];

        for (let stationApiObj of res.data) {
            stations.push(new Station(stationApiObj));
        }
        return stations;
    });
}

/**
 * Get API coordinates' nearby stations in a Zone by station type
 * @async
 * @exports viatransit.API.getNearbyStations
 * @param coordinates
 * @param radius
 * @param apiUrl
 * @return {Promise<{public_transit?: Array<Station>, trains?: Array<Station>}>}
 */
async function getNearbyStationsByType(/*[Float, Float*/coordinates, /*Number*/radius = 1000, /*String*/apiUrl)
{
    const url = apiUrl + '/stations/nearby?lon=' + coordinates[0] + '&lat=' + coordinates[1] + '&r=' + radius + '&format=by-type';

    return axios.get(url, {timeout: 15000}).then(res => {
        let result = {};

        for (let type of Object.keys(res.data)) {
            result[type] = res.data[type].map(apiStationObject => {
                return new Station(apiStationObject);
            })
        }
        return result;
    });
}

module.exports = { getStation, getNearbyStations, getNearbyStationsByType };