//Imports
const Point = require('@turf/turf').point;

/**
 * @class Station
 * @classdesc All properties of one station
 */
class Station {

    /**
     * Create an instance of Station
     */
    constructor()
    {
        /**
         * Id
         * @type {string}
         */
        this.id = "";
        /**
         * Network
         * @type {string}
         */
        this.network = "";
        /**
         * Name
         * @type {string}
         */
        this.name = "";
        /**
         * Type
         * @type {'public_transit'|'bike_share'|'trains'|'car_park'|'unknown'}
         */
        this.type = 'unknown';
        /**
         * Centered/Main location
         * @type {Point|null}
         */
        this.location = null;
        /**
         * Services (transit lines, car park...)
         * @type {Array<{id: String, type: 'public_transit'|'bike_share'|'trains'|'car_park'|'unknown', network: String}>}
         */
        this.services = [];
        /**
         * Stops (other network/type stops are not included here)
         * @type {Array<{id: String, services: Array<String>, location: Point|null}>}
         */
        this.stops = [];
        /**
         * Linked stations (contains other network/type services)
         * @type {Array<{id: String, type: 'public_transit'|'bike_share'|'trains'|'car_park'|'unknown', network: String}>}
         */
        this.linkedStations = [];
        /**
         * Attributes
         * @type {Object|null}
         */
        this.attributes = null;
    }

    /**
     * Fill properties from database
     * @param obj Station database object
     */
    fillFromDatabase(/*Object*/obj)
    {
        this.id = obj.id;
        this.network = obj.network;
        this.type = obj.type;
        this.name = obj.name;
        this.services = obj.services;
        try {
            this.location = obj.location == null ? null : Point(obj.location.coordinates);
        } catch {
            throw new Error("Error while filling from database a station: main location isn't a standard GEOJSON point.")
        }
        for (let stop of obj.stops) {
            try {
                this.stops.push({
                    id: stop.id,
                    services: stop.services,
                    location: stop.location == null ? null : Point(stop.location.coordinates)
                })
            } catch {
                throw new Error("Error while filling from database a station: a stop object isn't standard. Maybe location wrong?")
            }
        }
        for (let linkedStation of obj.linked_stations) {
            this.linkedStations.push({
                id: linkedStation.id,
                network: linkedStation.network,
                type: linkedStation.type
            });
        }
        this.attributes = obj.attributes;
    }

    /**
     * Fill properties from viaTransit API return format
     * @param apiObject
     */
    fillFromAPI(/*Object*/apiObject)
    {
        this.id = apiObject.id;
        this.network = apiObject.network;
        this.type = apiObject.type;
        this.name = apiObject.name;
        this.services = apiObject.services;
        try {
            this.location = apiObject.location == null ? null : Point(apiObject.location.coordinates);
        } catch {
            throw new Error("Error while filling from API a station: main location isn't a standard GEOJSON point.")
        }
        for (let stop of apiObject.stops) {
            try {
                this.stops.push({
                    id: stop.id,
                    services: stop.services,
                    location: stop.location == null ? null : Point(stop.location.coordinates)
                })
            } catch {
                throw new Error("Error while filling from API a station: a stop object isn't standard. Maybe location wrong?")
            }
        }
        for (let linkedStation of apiObject.linkedStations) {
            this.linkedStations.push({
                id: linkedStation.id,
                network: linkedStation.network,
                type: linkedStation.type
            });
        }
        this.attributes = apiObject.attributes;
    }

    /**
     * Get attribute value from key
     * @param key
     * @returns {*}
     */
    getAttribute(/*String*/key) {
        if (this.attributes === null || this.attributes === undefined)
            return null;

        let attr = this.attributes[key];

        return attr === undefined ? null : attr;
    }

}

module.exports = Station;