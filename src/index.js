/**
 * @module viatransit
 */

require('api/schedules').getSchedules;
require('api/disruptions').getNetworkDisruptions;
require('api/disruptions').getNetworkZoneDisruptions;
module.exports.models = {
    Schedule: require('models/Schedule'),
    DayDate: require('models/DayDate'),
    Disruption: require('models/Disruption'),
};