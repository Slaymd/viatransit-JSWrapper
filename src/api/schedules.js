//Imports
const axios = require('axios');

//Models
const Schedule = require('../models/Schedule');

//Utils
const apiRoot = require('./utils').getAPIRoot();

/**
 * viaTransit schedules
 * @module viatransit
 */

/**
 * Get schedules from API with clusterized format
 * @async
 * @exports viatransit.API.getClusterizedSchedules
 * @param networkKey
 * @param stationId
 * @return {Promise<Array<{line: {id: String, network: String}, headsign: String, schedules: Array<Schedule>}>>}
 */
async function getClusterizedSchedules(/*String*/networkKey, /*String*/stationId)
{
    const url = apiRoot + '/stations/schedules?network=' + networkKey + '&id=' + stationId + '&format=cluster';

    return axios.get(url).then(res => {
        if (!(res.data instanceof Array))
            return [];
        let clusters = [];

        for (let cluster of res.data) {
            let schedules = [];

            if (!(cluster.schedules instanceof Array))
                continue;
            for (let scheduleApiObj of cluster.schedules) {
                let schedule = new Schedule();
                schedule.fillFromAPI(scheduleApiObj);
                schedules.push(schedule);
            }
            cluster.schedules = schedules;
            clusters.push(cluster);
        }
        return clusters;
    });
}

/**
 * Get schedules from API
 * @async
 * @exports viatransit.API.getSchedules
 * @param networkKey
 * @param stationId
 * @return {Promise<Array<Schedule>>}
 */
async function getSchedules(/*String*/networkKey, /*String*/stationId)
{
    const url = apiRoot + '/stations/schedules?network=' + networkKey + '&id=' + stationId;

    return axios.get(url).then(res => {
        if (!(res.data instanceof Array))
            return [];
        let schedules = [];

        for (let scheduleApiObj of res.data) {
            let schedule = new Schedule();
            schedule.fillFromAPI(scheduleApiObj);
            schedules.push(schedule);
        }
        return schedules;
    });
}

module.exports = { getSchedules, getClusterizedSchedules };