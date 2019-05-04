/**
 * @module viatransit
 */

require('api/schedules').getSchedules;
module.exports.models = {
    Schedule: require('models/Schedule'),
    DayDate: require('models/DayDate')
};