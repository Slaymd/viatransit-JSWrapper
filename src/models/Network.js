//Imports
const NetworkService = require("./NetworkService");
const Line = require('./Line');
const Station = require('./Station');
const turf = require('@turf/turf');

/**
 * @class Network
 * @classdesc All properties of one network
 */
class Network {

    /**
     * Create an instance of Network
     */
    constructor(/*({key: String, name: String, type: 'public_transit'|'bike_share'|'trains'|'car_park'|'unknown', status: ('enabled'|'disabled'|'hidden'), map: {area: Object|null, center: Object|null}, services: Array<{gtfsId: String, status: ('enabled'|'disabled'|'hidden'), name: String, links: Array<{network: string, lines: [string], stations: [{stationId: string, stopId: string}], trips: [string], attributes: Object|null}>, attributes: Object|null}>, attributes: Object|null}|null)*/object= null)
    {
        /**
         * Key
         * @type {string}
         */
        this.key = "";
        /**
         * Name
         * @type {string}
         */
        this.name = "";
        /**
         * Type
         * @type {('public_transit'|'bike_share'|'trains'|'car_park'|'unknown')}
         */
        this.type = "unknown";
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
    fill(/*{key: String, name: String, type: 'public_transit'|'bike_share'|'trains'|'car_park'|'unknown', status: ('enabled'|'disabled'|'hidden'), map: {area: Object|null, center: Object|null}, services: Array<{gtfsId: String, status: ('enabled'|'disabled'|'hidden'), name: String, links: Array<{network: string, lines: [string], stations: [{stationId: string, stopId: string}], trips: [string], attributes: Object|null}>, attributes: Object|null}>, attributes: Object|null}*/object)
    {
        this.key = object.key;
        this.name = object.name;
        this.type = object.type;
        this.status = object.status;
        this.map = object.map;
        this.services = object.services.map(service => new NetworkService(service));
        this.attributes = object.attributes;
    }

    /**
     * Verifying data completion of network
     */
    isComplete()
    {
        return typeof this.key == "string" && this.key.length > 0 && typeof this.name == "string" && this.name.length > 0 && typeof this.type == "string" && typeof this.status == "string" && 
        this.map instanceof Object && this.services instanceof Array && this.attributes instanceof Object;
    }

    /**
     * Get service by key
     * @param networkObject
     * @return {(NetworkService|null)}
     */
    getService(/*(Station|Line)*/networkObject)
    {
        if (networkObject instanceof Line) {
            return this.services.find(el => el.links.isLinkedToLine(networkObject.networkKey, networkObject.id));
        } else if (networkObject instanceof Station) {
            return this.services.find(el => el.links.isLinkedToLine(networkObject.network, networkObject.id));
        } else
            return null;
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