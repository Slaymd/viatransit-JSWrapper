//Imports
const axios = require('axios');

//Models
const Vehicle = require('../models/Vehicle');

/**
 * viaTransit vehicles
 * @module viatransit
 */

/**
 * Get line vehicle locations
 * @async
 * @exports viatransit.API.getVehicleLocations
 * @param apiUrl
 * @param networkKey
 * @param lineId
 * @return {Promise<Array<Vehicle>>}
 */
async function getVehicleLocations(/*String*/apiUrl, /*String*/networkKey, /*String*/lineId)
{
    const url = apiUrl + '/vehicles?networkKey=' + networkKey + '&lineId=' + lineId;

    return axios.get(url, {timeout: 15000}).then(res => {
        let vehicles = [];

        for (let vehicleApiObj of res.data) {
            let vehicle = new Vehicle();

            vehicle.fill(vehicleApiObj);
            vehicles.push(vehicle);
        }
        return vehicles;
    });
}

module.exports = { getVehicleLocations };