
let authMethods = require('../api/auth');
let disruptionsMethods = require('../api/disruptions');
let networksMethods = require('../api/networks');
let permissionsMethods = require('../api/permissions');
let schedulesMethods = require('../api/schedules');
let searchMethods = require('../api/search');
let stationsMethods = require('../api/stations');
let usersMethods = require('../api/users');
let linesMethods = require('../api/lines');
let versionsMethods = require('../api/versions');

API = (function() {
    let apiRoot = "https://viatransit.fr/api/v1";
    return {
        getAPIRoot: function() {
            return apiRoot;
        },
        setAPIRoot: function(/*String*/url) {
            apiRoot = url;
        },

        //AUTH

        /**
         * Get jwt_token from API
         * @async
         * @exports viatransit.API.login
         * @param email
         * @param password
         * @return {Promise<String>}
         */
        login: function(/*String*/email, /*String*/password) {
            return authMethods.login(email, password, this.getAPIRoot());
        },
        /**
         * Create an user
         * @async
         * @exports viatransit.API.register
         * @param email
         * @param password
         * @return {Promise<String>}
         */
        register: function(/*String*/email, /*String*/password) {
            return authMethods.register(email, password, this.getAPIRoot());
        },

        //DISRUPTIONS

        /**
         * Get disruptions from API on network
         * @async
         * @exports viatransit.API.getNetworkDisruptions
         * @param networkKey
         * @return {Promise<{dataUpdateDate: String, disruptions: Array<Disruption>}>}
         */
        getNetworkDisruptions: function(/*String*/networkKey) {
            return disruptionsMethods.getNetworkDisruptions(networkKey, this.getAPIRoot());
        },
        /**
         * Get disruptions from API on network zone
         * @async
         * @exports viatransit.API.getNetworkZoneDisruptions
         * @param zoneKey
         * @return {Promise<Array<Disruption>>}
         */
        getNetworkZoneDisruptions: function(/*String*/zoneKey) {
            return disruptionsMethods.getNetworkZoneDisruptions(zoneKey, this.getAPIRoot());
        },

        //VERSIONS

        /**
         * Check data update availability
         * @async
         * @exports viatransit.API.isDataRequiringUpdate
         * @param dataKey
         * @param actualVersionDate
         * @return {Promise<boolean>}
         */
        isDataRequiringUpdate: function(/*String*/dataKey, /*Date*/actualVersionDate)
        {
            return versionsMethods.isDataRequiringUpdate(this.getAPIRoot(), dataKey, actualVersionDate);
        },

        /**
         * Get data version date
         * @async
         * @exports viatransit.API.getDataVersionDate
         * @param apiUrl
         * @param dataKey
         * @return {Promise<Date|null>}
         */
        getDataVersionDate: function(/*String*/dataKey)
        {
            return versionsMethods.getDataVersionDate(this.getAPIRoot(), dataKey);
        },

        //NETWORKS

        /**
         * Get networks from API
         * @async
         * @exports viatransit.API.getNetworks
         * @return {Promise<{dataUpdateDate: String, zones: Array<Network>}>}
         */
        getNetworks: function()
        {
            return networksMethods.getNetworks(this.getAPIRoot());
        },

        //LINES

        /**
         * Get lines from API
         * @async
         * @exports viatransit.API.getLines
         * @param networkServiceKey
         * @return {Promise<{dataUpdateDate: String, lines: Array<Line>}>}
         */
        getLines: function(/*String*/networkServiceKey) {
            return linesMethods.getLines(this.getAPIRoot(), networkServiceKey);
        },

        //PERMISSIONS

        /**
         *
         * @param token
         * @param userId
         * @returns {Promise<*>}
         */
        getPermissions: function(/*String*/token, /*String*/userId) {
            return permissionsMethods.getPermissions(token, userId, this.getAPIRoot())
        },
        /**
         *
         * @param token
         * @param userId
         * @param permissions
         * @returns {Promise<*>}
         */
        updatePermissions: function(/*String*/token, /*userId*/userId, /*Permissions*/permissions) {
            return permissionsMethods.updatePermissions(token, userId, permissions, this.getAPIRoot())
        },

        //SCHEDULES

        /**
         * Get schedules from API with by-line format
         * @description Get schedules by line. All station's lines are present even no schedules are found.
         * @async
         * @exports viatransit.API.getByLineSchedules
         * @param networkKey
         * @param stationId
         * @return {Promise<Array<{line: {id: String, network: String}, schedules: Array<Schedule>}>>}
         */
        getByLineSchedules: function(/*String*/networkKey, /*String*/stationId) {
            return schedulesMethods.getByLineSchedules(networkKey, stationId, this.getAPIRoot())
        },
        /**
         * Get schedules from API with clusterized format
         * @async
         * @exports viatransit.API.getClusterizedSchedules
         * @param networkKey
         * @param stationId
         * @return {Promise<Array<{line: {id: String, network: String}, headsign: String, schedules: Array<Schedule>}>>}
         */
        getClusterizedSchedules: function(/*String*/networkKey, /*String*/stationId) {
            return schedulesMethods.getClusterizedSchedules(networkKey, stationId, this.getAPIRoot())
        },
        /**
         * Get schedules from API
         * @async
         * @exports viatransit.API.getSchedules
         * @param networkKey
         * @param stationId
         * @return {Promise<Array<Schedule>>}
         */
        getSchedules: function(/*String*/networkKey, /*String*/stationId) {
            return schedulesMethods.getSchedules(networkKey, stationId, this.getAPIRoot())
        },

        //SEARCH

        /**
         * Search in database
         * @param query
         * @param nearbyCoords
         * @return {Promise<{public_transit?: [Station], trains?: [Station], places?: [{id: String, types: [String], name: String, location: [Number], attributes: Object|null}]}>}
         */
        search: function(/*String*/query, /*[Number]*/nearbyCoords = null) {
            return searchMethods.search(query, nearbyCoords, this.getAPIRoot())
        },

        //STATIONS

        /**
         * Get station full model from API
         * @async
         * @exports viatransit.API.getStation
         * @param networkKey
         * @param stationId
         * @return {Promise<Station>}
         */
        getStation: function(/*String*/networkKey, /*String*/stationId) {
            return stationsMethods.getStation(networkKey, stationId, this.getAPIRoot())
        },
        /**
         * Get API autocomplete result from a string
         * @async
         * @exports viatransit.API.autocompleteStationName
         * @param networkKey
         * @param query
         * @return {Promise<Array<Station>>}
         */
        autocompleteStationName: function(/*String*/networkKey, /*String*/query) {
            return stationsMethods.autocompleteStationName(networkKey, query, this.getAPIRoot())
        },
        /**
         * Get API autocomplete result from a string
         * @async
         * @exports viatransit.API.autocompleteStationNameInZone
         * @param zoneKey
         * @param query
         * @return {Promise<Array<Station>>}
         */
        autocompleteStationNameInZone: function(/*String*/zoneKey, /*String*/query) {
            return stationsMethods.autocompleteStationNameInZone(zoneKey, query, this.getAPIRoot())
        },
        /**
         * Get API coordinates' nearby stations in a Zone
         * @async
         * @exports viatransit.API.getNearbyStations
         * @param coordinates
         * @param radius
         * @return {Promise<Array<Station>>}
         */
        getNearbyStations: function(/*[Float, Float*/coordinates, /*Number*/radius = 1000) {
            return stationsMethods.getNearbyStations(coordinates, radius, this.getAPIRoot())
        },
        /**
         * Get API coordinates' nearby stations in a Zone by station type
         * @async
         * @exports viatransit.API.getNearbyStations
         * @param coordinates
         * @param radius
         * @return {Promise<{public_transit?: Array<Station>, trains?: Array<Station>}>}
         */
        getNearbyStationsByType: function(/*[Float, Float*/coordinates, /*Number*/radius = 1000) {
            return stationsMethods.getNearbyStationsByType(coordinates, radius, this.getAPIRoot())
        },

        //USERS

        /**
         *
         * @param token
         * @param id
         * @returns {Promise<*>}
         */
        getProfile: function(/*String*/token, /*String*/id) {
            return usersMethods.getProfile(token, id, this.getAPIRoot())
        },
        /**
         *
         * @param token
         * @param user
         * @returns {Promise<*>}
         */
        updateProfile: function(/*String*/token, /*User*/user) {
            return usersMethods.updateProfile(token, user, this.getAPIRoot())
        },
        /**
         *
         * @param token
         * @param id
         * @returns {Promise<*>}
         */
        deleteProfile: function(/*String*/token, /*String*/id) {
            return usersMethods.deleteProfile(token, id, this.getAPIRoot())
        },
    }
}());

module.exports = { API };