//Imports
const TransitLinkArray = require("./TransitLinkArray");

/**
 * @class NetworkService
 * @classdesc All properties of one network service
 */
class NetworkService {

    /**
     * Create an instance of NetworkService
     */
    constructor(/*({key: String, status: ('enabled'|'disabled'|'hidden'), type: 'public_transit'|'bike_share'|'trains'|'car_park'|'unknown', name: String, links: Array<{network: String, service: String, type: ("public_transit"|"bike_share"|"trains"|"car_park"|"unknown"), attributes: ?{lines: ([String]|null), stations: ([{stationId: String, stopId: String}]|null)}}>, attributes: Object|null}|null)*/object= null)
    {
        /**
         * Key
         * @type {string}
         */
        this.key = "";
        /**
         * Type
         * @type {('public_transit'|'bike_share'|'trains'|'car_park'|'unknown')}
         */
        this.type = "unknown";
        /**
         * Status
         * @type {('enabled'|'disabled'|'hidden')}
         */
        this.status = "enabled";
        /**
         * Name
         * @type {string}
         */
        this.name = "";
        /**
         * Links
         * @type {TransitLinkArray}
         */
        this.links = new TransitLinkArray();
        /**
         * Attributes
         * @type {Object|null}
         */
        this.attributes = null;
        //Optional constructor fill
        if (object !== null)
            this.fill(object);
    }

    /**
     * Fill properties from viaTransit API return format
     * @param object
     */
    fill(/*{key: String, status: ('enabled'|'disabled'|'hidden'), type: 'public_transit'|'bike_share'|'trains'|'car_park'|'unknown', name: String, links: Array<{network: String, service: String, type: ("public_transit"|"bike_share"|"trains"|"car_park"|"unknown"), attributes: ?{lines: ([String]|null), stations: ([{stationId: String, stopId: String}]|null)}}>, attributes: Object|null}*/object)
    {
        this.key = object.key;
        this.name = object.name;
        this.type = object.type;
        this.status = object.status;
        this.links = new TransitLinkArray(object.links);
        this.attributes = object.attributes;
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

module.exports = NetworkService;