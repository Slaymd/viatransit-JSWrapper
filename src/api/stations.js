//Imports
const axios = require('axios');

//Models
const Station = require('../models/Station');

//Utils
const apiRoot = require('./utils').getAPIRoot();

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
 * @return {Promise<Station>}
 */
async function getStation(/*String*/networkKey, /*String*/stationId)
{
    const url = apiRoot + '/stations/details?network=' + networkKey + '&id=' + stationId;

    return axios.get(url).then(res => {
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
 * @param query
 * @return {Promise<Array<Station>>}
 */
async function autocompleteStationName(/*String*/networkKey, /*String*/query)
{
    const url = apiRoot + '/stations/autocomplete?network=' + networkKey + '&str=' + query;

    return axios.get(url).then(res => {
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
 * @param query
 * @return {Promise<Array<Station>>}
 */
async function autocompleteStationNameInZone(/*String*/zoneKey, /*String*/query)
{
    const url = apiRoot + '/stations/autocomplete?networkZone=' + zoneKey + '&str=' + query;

    return axios.get(url).then(res => {
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
 * @param zoneKey
 * @param coordinates
 * @param radius
 * @return {Promise<Array<Station>>}
 */
async function getNearbyStations(/*String*/zoneKey, /*[Float, Float*/coordinates, /*Number*/radius = 1000)
{
    const url = apiRoot + '/stations/nearby?networkZone=' + zoneKey + '&lon=' + coordinates[0] + '&lat=' + coordinates[1] + '&r=' + radius;

    return axios.get(url).then(res => {
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

module.exports = { getStation, autocompleteStationName, autocompleteStationNameInZone, getNearbyStations };