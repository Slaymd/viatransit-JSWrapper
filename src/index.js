/**
 * viaTransit API wrapper and tools
 * @module viatransit
 */

//Models
module.exports.Schedule = require('./models/Schedule');
module.exports.DayDate = require('./models/DayDate');
module.exports.Disruption = require('./models/Disruption');
module.exports.User = require('./models/Users');
module.exports.Token = require('./models/Tokens');
module.exports.Permission = require('./models/Permissions');
module.exports.Station = require('./models/Station');
module.exports.Zone = require('./models/Zone');
module.exports.Network = require('./models/Network');

//API namespace
module.exports.API = {
    ...require('./api/auth'),
    ...require('./api/stations'),
    ...require('./api/schedules'),
    ...require('./api/disruptions'),
    ...require('./api/zones'),
    ...require('./api/networks'),
};