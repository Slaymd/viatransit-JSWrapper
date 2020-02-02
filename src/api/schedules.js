//Imports
const axios = require('axios');

//Models
const Schedule = require('../models/Schedule');

/**
 * viaTransit schedules
 * @module viatransit
 */

/**
 * Get schedules from API with by-line format
 * @description Get schedules by line. All station's lines are present even no schedules are found.
 * @async
 * @exports viatransit.API.getByLineSchedules
 * @param networkKey
 * @param stationId
 * @param apiUrl
 * @return {Promise<Array<{line: {id: String, network: String}, schedules: Array<Schedule>}>>}
 */
async function getByLineSchedules(/*String*/networkKey, /*String*/stationId, /*String*/apiUrl)
{
    const url = apiUrl + '/stations/schedules?network=' + networkKey + '&id=' + stationId + '&format=by-line';

    return axios.get(url, {timeout: 15000}).then(res => {
        if (!(res.data instanceof Array))
            return [];
        let clusters = [];

        for (let cluster of res.data) {
            let schedules = [];

            if (!(cluster.schedules instanceof Array))
                continue;
            for (let scheduleApiObj of cluster.schedules) {
                let schedule = new Schedule();
                schedule.fill(scheduleApiObj);
                schedules.push(schedule);
            }
            cluster.schedules = schedules;
            clusters.push(cluster);
        }
        return clusters;
    });
}

/**
 * Get schedules from API with clusterized format
 * @async
 * @exports viatransit.API.getClusterizedSchedules
 * @param networkKey
 * @param stationId
 * @param apiUrl
 * @return {Promise<Array<{line: {id: String, network: String}, headsign: String, schedules: Array<Schedule>}>>}
 */
async function getClusterizedSchedules(/*String*/networkKey, /*String*/stationId, /*String*/apiUrl)
{
    const url = apiUrl + '/stations/schedules?network=' + networkKey + '&id=' + stationId + '&format=cluster';

    return axios.get(url, {timeout: 15000}).then(res => {
        if (!(res.data instanceof Array))
            return [];
        let clusters = [];

        for (let cluster of res.data) {
            let schedules = [];

            if (!(cluster.schedules instanceof Array))
                continue;
            for (let scheduleApiObj of cluster.schedules) {
                let schedule = new Schedule();
                schedule.fill(scheduleApiObj);
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
 * @param apiUrl
 * @param networkKey
 * @param stationId
 * @param fromDate
 * @param depth
 * @return {Promise<Array<Schedule>>}
 */
async function getSchedules(/*String*/apiUrl, /*String*/networkKey, /*String*/stationId, /*(Date|null)*/fromDate = null, /*Number*/depth = 4)
{
    const url = apiUrl + '/stations/schedules?network=' + networkKey + '&id=' + stationId + (fromDate ? '&fromDate=' + fromDate.toISOString() : '') + (depth !== 4 ? '&depth=' + depth : '');

    return axios.get(url, {timeout: 15000}).then(res => {
        if (!(res.data instanceof Array))
            return [];
        let schedules = [];

        for (let scheduleApiObj of res.data) {
            let schedule = new Schedule();
            schedule.fill(scheduleApiObj);
            schedules.push(schedule);
        }
        return schedules;
    });
}

module.exports = { getSchedules, getClusterizedSchedules, getByLineSchedules };