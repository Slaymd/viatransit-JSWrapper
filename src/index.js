/**
 * viaTransit API wrapper and tools
 * @module viatransit
 */

module.exports = {
    ...require('./models/Schedule'),
    ...require('./models/DayDate'),
    ...require('./models/Disruption'),
    ...require('./models/User')
};

module.exports.API = {...require('./api/auth'), ...require('./api/schedules'), ...require('./api/disruptions')};