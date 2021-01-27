
let authMethods = require('../api/auth');
let disruptionsMethods = require('../api/disruptions');
let networksMethods = require('../api/networks');
let permissionsMethods = require('../api/permissions');
let schedulesMethods = require('../api/schedules');
let searchMethods = require('../api/search');
let stationsMethods = require('../api/stations');
let usersMethods = require('../api/users');
let userLogsMethods = require('../api/userLogs');
let datasetsMethods = require('../api/datasets');
let linesMethods = require('../api/lines');
let versionsMethods = require('../api/versions');
let mapsMethods = require('../api/maps');
let tripsMethods = require('../api/trips');
let itinerariesMethods = require('../api/itineraries');
let newsletterMethods = require('../api/newsletter');

API = (function() {
    let apiRoot = "https://api.viatransit.fr/v1";
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
        /**
         * Send a request for reset password
         * @async
         * @exports viatransit.API.forgotPassword
         * @param email
         * @return {Promise<Object>}
         */
        forgotPassword: function(/*String*/email) {
            return authMethods.forgotPassword(email, this.getAPIRoot());
        },
        /**
         * Reset the forgot password
         * @async
         * @exports viatransit.API.resetPassword
         * @param id
         * @param password
         * @return {Promise<Object>}
         */
        resetPassword: function(/*String*/id, /*String*/password) {
            return authMethods.resetPassword(id, password, this.getAPIRoot());
        },


        //DISRUPTIONS

        /**
         * Post disruptions on API
         * @async
         * @exports viatransit.API.postDisruption
         * @param token
         * @param disruption
         * @return {Promise<{id: String}>}
         */
        postDisruption: function(/*String*/token, /*Disruption*/disruption) {
            return disruptionsMethods.postDisruption(this.getAPIRoot(), token, disruption);
        },
        /**
         * Get all disruptions on API
         * @async
         * @exports viatransit.API.getAllDisruptions
         * @param token
         * @return {Promise<{dataUpdateDate: String, disruptions: Array<Disruption>}>}
         */
        getAllDisruptions: function(/*String*/token) {
            return disruptionsMethods.getAllDisruptions(this.getAPIRoot(), token);
        },
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
         * Delete disruptions on API
         * @async
         * @exports viatransit.API.deleteDisruption
         * @param token
         * @param disruptionId
         * @return {Promise<{String}>}
         */
        deleteDisruption: function(/*String*/token, /*String*/disruptionId) {
            return disruptionsMethods.deleteDisruption(this.getAPIRoot(), token, disruptionId);
        },
        /**
         * Update disruptions on API
         * @async
         * @exports viatransit.API.updateDisruption
         * @param token
         * @param disruptionId
         * @param disruption
         * @return {Promise<{String}>}
         */
        updateDisruption: function(/*String*/token, /*String*/disruptionId, /*Disruption*/disruption) {
            return disruptionsMethods.updateDisruption(this.getAPIRoot(), token, disruptionId, disruption);
        },
        /**
         * Get disruptions from API on network zone
         * @deprecated
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
         * @param dataKey
         * @return {Promise<Date|null>}
         */
        getDataVersionDate: function(/*String*/dataKey)
        {
            return versionsMethods.getDataVersionDate(this.getAPIRoot(), dataKey);
        },

        /**
         * Get all versions
         * @async
         * @exports viatransit.API.getAllVersions
         * @return {Promise<Object|null>}
         */
        getAllVersions: function()
        {
            return versionsMethods.getAllVersions(this.getAPIRoot());
        },

        //MAP

        /**
         * Get line map from API
         * @async
         * @exports viatransit.API.getLines
         * @param networkKey
         * @param lineId
         * @return {Promise<{lineSegments: [{id: String, networkKey: String, lineId: String, fromStopId: String, toStopId: String, directionId: Number, shape: [ [ Number ] ], attributes: Object|null}], stations: [{stopId: String, stationId: String, location: {type: String, coordinates: [ Number ]}, name: String, lines: [ {network: String, id: String} ]}]}>}
         */
        getLineMap: function(/*String*/networkKey, /*String*/lineId)
        {
            return mapsMethods.getLineMap(this.getAPIRoot(), networkKey, lineId);
        },

        //MAPBOX

        /**
         * Get datasets
         * @async
         * @exports viatransit.API.getDatasets
         * @param token
         * @param kind
         * @param ownerType
         * @param ownerName
         * @param datasetsId
         * @return {Promise<{kind: String, FeatureCollection: Array}>}
         */
        getDatasets: function(/*String*/token, /*String*/kind, /*String*/ownerType, /*String*/ownerName, /*String*/datasetsId = null)
        {
            return datasetsMethods.getDatasets(this.getAPIRoot(), token, kind, ownerType, ownerName, datasetsId);
        },

        /**
         * Post datasets
         * @async
         * @exports viatransit.API.postDatasets
         * @param token
         * @param kind
         * @param FeatureCollection
         * @return {Promise<{kind: String, datasets: Array}>}
         */
        postDatasets: function(/*String*/token, /*String*/kind, /*Array*/FeatureCollection)
        {
            return datasetsMethods.postDatasets(this.getAPIRoot(), token, kind, FeatureCollection);
        },

        /**
         * Update datasets
         * @async
         * @exports viatransit.API.updateDatasets
         * @param token
         * @param kind
         * @param FeatureCollection
         * @return {Promise<{kind: String, datasets: Array}>}
         */
        updateDatasets: function(/*String*/token, /*String*/kind, /*Array*/FeatureCollection)
        {
            return datasetsMethods.updateDatasets(this.getAPIRoot(), token, kind, FeatureCollection);
        },

        /**
         * Delete datasets
         * @async
         * @exports viatransit.API.deleteDatasets
         * @param token
         * @param kind
         * @param datasetsId
         * @return {Promise<{Object}>}
         */
        deleteDatasets: function(/*String*/token, /*String*/kind, /*String*/datasetsId)
        {
            return datasetsMethods.deleteDatasets(this.getAPIRoot(), token, kind, datasetsId);
        },

        /**
         * Upload dataset to tileset on Mapbox
         * @async
         * @exports viatransit.API.uploadTileset
         * @param token
         * @param kind
         * @param networkKey
         * @param tilesetName (optional)
         * @return {Promise<{Object}>}
         */
        uploadTileset: function(/*String*/token, /*String*/kind, /*String*/networkKey, /*String*/tilesetName = null)
        {
            return datasetsMethods.uploadTileset(this.getAPIRoot(), token, kind, networkKey, tilesetName);
        },

        //ITINERARIES

        /**
         * Get itineraries between two coordinates
         * @async
         * @exports viatransit.API.getItineraries
         * @param fromCoordinates
         * @param toCoordinates
         * @param fromDate
         * @return {Promise<Itinerary>}
         */
        getItineraries: function(/*number[]*/fromCoordinates, /*number[]*/toCoordinates, /*(Date|null)*/fromDate)
        {
            return itinerariesMethods.getItineraries(this.getAPIRoot(), fromCoordinates, toCoordinates, fromDate);
        },


        //NETWORKS

        /**
         * Get networks from API
         * @async
         * @exports viatransit.API.getNetworks
         * @param token
         * @return {Promise<{dataUpdateDate: String, networks: Array<Network>}>}
         */
        getNetworks: function(/*String*/token = null)
        {
            return networksMethods.getNetworks(this.getAPIRoot(), token);
        },

        /**
         * Create network from API
         * @async
         * @exports viatransit.API.createNetwork
         * @param token
         * @param network
         * @return {Promise<{id: String}>}
         */
        createNetwork: function(/*String*/token, /*Network*/network)
        {
            return networksMethods.createNetwork(this.getAPIRoot(), token, network);
        },

        /**
         * Update network from API
         * @async
         * @exports viatransit.API.updateNetwork
         * @param token
         * @param key
         * @param network
         * @return {Promise<{String: String}>}
         */
        updateNetwork: function(/*String*/token, /*String*/key, /*Network*/network)
        {
            return networksMethods.updateNetwork(this.getAPIRoot(), token, key, network);
        },

        /**
         * Delete network from API
         * @async
         * @exports viatransit.API.deleteNetwork
         * @param token
         * @param key
         * @return {Promise<{String: String}>}
         */
        deleteNetwork: function(/*String*/token, /*String*/key)
        {
            return networksMethods.deleteNetwork(this.getAPIRoot(), token, key);
        },

        //LINES

        /**
         * Get lines from API
         * @async
         * @exports viatransit.API.getLines
         * @param networkKey
         * @return {Promise<{dataUpdateDate: String, lines: Array<Line>}>}
         */
        getLines: function(/*String*/networkKey) {
            return linesMethods.getLines(this.getAPIRoot(), networkKey);
        },

        //TRIPS

        /**
         * Get trip details from API
         * @async
         * @exports viatransit.API.getTrip
         * @param networkKey
         * @param tripId
         * @param theorical
         * @return {Promise<{headsign: String, directionId: number, lineId: string, stationSequence: [{stationId: String, stopId: String, name: String, lines: [ {network: String, id: String} ], travelTime: Number}], tripId: String, sequenceId: number, networkKey: String}>}
         */
        getTrip: function(/*String*/networkKey, /*String*/tripId, /*Boolean*/theorical = true) {
            return tripsMethods.getTrip(this.getAPIRoot(), networkKey, tripId, theorical);
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
         * @returns {Promise<*>}
         */
        getAllPermissions: function(/*String*/token) {
            return permissionsMethods.getAllPermissions(token, this.getAPIRoot())
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

        //USERSLOGS

        /**
         *
         * @param token
         * @param userId
         * @returns {Promise<*>}
         */
        getUserLogs: function(/*String*/token, /*String*/userId) {
            return userLogsMethods.getUserLogs(token, userId, this.getAPIRoot())
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
         * @param fromDate
         * @param depth
         * @return {Promise<Array<Schedule>>}
         */
        getSchedules: function(/*String*/networkKey, /*String*/stationId, /*(Date|null)*/fromDate = null, /*Number*/depth = 4) {
            return schedulesMethods.getSchedules(this.getAPIRoot(), networkKey, stationId, fromDate, depth);
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
        /**
         * Reverse Search
         * @param lon
         * @param lat
         * @return {Promise<{places?: [{id: String, types: [String], name: String, location: [Number], attributes: Object|null}]}>}
         */
        reverseSearch: function(/*Number*/lon, /*Number*/lat) {
            return searchMethods.reverseSearch(lon, lat, this.getAPIRoot());
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
         * @returns {Promise<*>}
         */
        getAllUsers: function(/*String*/token) {
            return usersMethods.getAllUsers(token, this.getAPIRoot())
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

        //NEWSLETTER

         /**
         *
         * @param email
         * @returns {Promise<*>}
         */
        subscribeNewsletter: function(/*String*/email) {
            return newsletterMethods.subscribeNewsletter(email, this.getAPIRoot())
        },
    }
}());

module.exports = { API };