/**
 * @module viatransit
 */

/**
 * USER
 */

/**
 * AUTH
 */

/**
 * Get jwt_token from API
 * @async
 * @exports viatransit.login
 * @param email
 * @param password
 * @return {Promise<String>}
 */
module.exports.login = require('./api/auth').login;

/**
 * Create new account
 * @async
 * @exports viatransit.register
 * @param email
 * @param password
 * @return {Promise<String>}
 */
module.exports.register = require('./api/auth').register;

/**
 * Get schedules from API
 * @async
 * @exports viatransit.getSchedules
 * @param networkKey
 * @param stationId
 * @return {Promise<Array<Schedule>>}
 */
module.exports.getSchedules = require('./api/schedules').getSchedules;

/**
 * Get schedules from API with clusterized format
 * @async
 * @exports viatransit.getClusterizedSchedules
 * @param networkKey
 * @param stationId
 * @return {Promise<Array<{line: {id: String, network: String}, headsign: String, schedules: Array<Schedule>}>>}
 */
module.exports.getClusterizedSchedules = require('./api/schedules').getClusterizedSchedules;

/**
 * Get disruptions from API on network
 * @async
 * @exports viatransit.getNetworkDisruptions
 * @param networkKey
 * @return {Promise<{dataUpdateDate: String, disruptions: Array<Disruption>}>}
 */
module.exports.getNetworkDisruptions = require('./api/disruptions').getNetworkDisruptions;

/**
 * Get disruptions from API on network zone
 * @async
 * @exports viatransit.getNetworkZoneDisruptions
 * @param zoneKey
 * @return {Promise<{dataUpdateDate: String, disruptions: Array<Disruption>}>}
 */
module.exports.getNetworkZoneDisruptions = require('./api/disruptions').getNetworkZoneDisruptions;

module.exports.models = {
    Schedule: require('./models/Schedule'),
    DayDate: require('./models/DayDate'),
    Disruption: require('./models/Disruption'),
    User: require('./models/User'),
};