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
        if (!(res.data instanceof Object))
            return null;
        let station = new Station();

        station.fillFromAPI(res.data);
        return station;
    });
}

/**
 * Get API autocomplete result from a string
 * @async
 * @exports viatransit.API.autocompleteStationName
 * @param networkKey
 * @param query
 * @param apiUrl
 * @return {Promise<Array<Station>>}
 */
async function autocompleteStationName(/*String*/networkKey, /*String*/query, /*String*/apiUrl)
{
    const url = apiUrl + '/stations/autocomplete?network=' + networkKey + '&str=' + query;

    return axios.get(url, {timeout: 15000}).then(res => {
        if (!(res.data instanceof Array))
            return [];
        let stations = [];

        for (let stationApiObj of res.data) {
            let station = new Station();
            station.fillFromAPI(stationApiObj);
            stations.push(station);
        }
        return stations;
    });
}

/**
 * Get API autocomplete result from a string
 * @async
 * @exports viatransit.API.autocompleteStationNameInZone
 * @param zoneKey
 * @param query
 * @param apiUrl
 * @return {Promise<Array<Station>>}
 */
async function autocompleteStationNameInZone(/*String*/zoneKey, /*String*/query, /*String*/apiUrl)
{
    const url = apiUrl + '/stations/autocomplete?networkZone=' + zoneKey + '&str=' + query;

    return axios.get(url, {timeout: 15000}).then(res => {
        if (!(res.data instanceof Array))
            return [];
        let stations = [];

        for (let stationApiObj of res.data) {
            let station = new Station();
            station.fillFromAPI(stationApiObj);
            stations.push(station);
        }
        return stations;
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
            let station = new Station();
            station.fillFromAPI(stationApiObj);
            stations.push(station);
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
                let station = new Station();
                station.fillFromAPI(apiStationObject);
                return station;
            })
        }
        return result;
    });
}

module.exports = { getStation, autocompleteStationName, autocompleteStationNameInZone, getNearbyStations, getNearbyStationsByType };