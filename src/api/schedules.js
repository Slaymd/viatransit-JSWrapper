//Imports
const axios = require('axios');

//Models
const Schedule = require('../models/Schedule');

//Utils
const apiRoot = require('utils').getAPIRoot();

/**
 * viaTransit schedules
 * @module viatransit
 */

module.exports = {
    /**
     * Get schedules from API
     * @async
     * @exports viatransit.getSchedules
     * @param networkKey
     * @param stationId
     * @param format
     * @return {Promise<Array<Schedule>>}
     */
    getSchedules: async function (/*String*/networkKey, /*String*/stationId, /*String*/format = 'cluster') {
        const url = apiRoot + '/stations/schedules?network=' + networkKey + '&id=' + stationId + '&format=' + format;

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
};
