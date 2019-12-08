//Imports
const NetworkService = require("./NetworkService");
const turf = require('@turf/turf');

/**
 * @class Network
 * @classdesc All properties of one network
 */
class Network {

    /**
     * Create an instance of Network
     */
    constructor(/*{id: String, name: String, status: ('enabled'|'disabled'|'hidden'), map: {area: Object|null, center: Object|null}, services: Array<{key: String, status: ('enabled'|'disabled'|'hidden'), type: 'public_transit'|'bike_share'|'trains'|'car_park'|'unknown', name: String, links: Array<{network: String, service: String, type: ("public_transit"|"bike_share"|"trains"|"car_park"|"unknown"), attributes: ?{lines: ([String]|null), stations: ([{stationId: String, stopId: String}]|null)}}>, attributes: Object|null}>, attributes: Object|null}*/object= null)
    {
        /**
         * Id
         * @type {string}
         */
        this.id = "";
        /**
         * Name
         * @type {string}
         */
        this.name = "";
        /**
         * Status
         * @type {'enabled'|'disabled'|'hidden'}
         */
        this.status = "enabled";
        /**
         * Map
         * @type {{area: Object|null, center: Object|null}}
         */
        this.map = {
            area: null,
            center: null
        };
        /**
         * Services
         * @type {Array<NetworkService>}
         */
        this.services = [];
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
    fill(/*{id: String, name: String, status: ('enabled'|'disabled'|'hidden'), map: {area: Object|null, center: Object|null}, services: Array<{key: String, status: ('enabled'|'disabled'|'hidden'), type: 'public_transit'|'bike_share'|'trains'|'car_park'|'unknown', name: String, links: Array<{network: String, service: String, type: ("public_transit"|"bike_share"|"trains"|"car_park"|"unknown"), attributes: ?{lines: ([String]|null), stations: ([{stationId: String, stopId: String}]|null)}}>, attributes: Object|null}>, attributes: Object|null}*/object)
    {
        this.id = object.id;
        this.name = object.name;
        this.status = object.status;
        this.map = object.map;
        this.services = object.services.map(service => new NetworkService(service));
        this.attributes = object.attributes;
    }

    /**
     * Check if network service key exist.
     * @param key
     * @return {boolean}
     */
    hasServiceKey(/*String*/key)
    {
        for (let service of this.services) {
            if (service.key === key)
                return true;
        }
        return false;
    }

    /**
     * Get service by key
     * @param key
     * @return {NetworkService}
     */
    getService(/*String*/key)
    {
        if (!this.hasServiceKey(key))
            return null;
        return this.services.find(el => el.key === key);
    }

    /**
     * Get line's linked services
     * @param serviceId
     * @param lineId
     * @return {[NetworkService]}
     */
    getLineLinkedServices(/*String*/serviceId, /*String*/lineId)
    {
        return this.services.filter(service => {
            return service.links.isLinkedToLine(this.id, serviceId, lineId)
        });
    }

    /**
     * Check if coordinates are contained in the network area
     * @param coordinates
     * @return {boolean}
     */
    hasPointInArea(/*Array*/coordinates)
    {
        if (!this.map.area)
            return true;
        const point = new turf.point(coordinates);
        const area = new turf.polygon(this.map.area.coordinates);

        return turf.booleanContains(area, point);
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

module.exports = Network;