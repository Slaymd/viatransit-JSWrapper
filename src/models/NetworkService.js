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
    constructor(/*({gtfsId: String, status: ('enabled'|'disabled'|'hidden'), name: String, links: Array<{network: string, lines: [string], stations: [{stationId: string, stopId: string}], trips: [string], attributes: Object|null}>, attributes: Object|null}|null)*/object= null)
    {
        /**
         * GTFS Id
         * @type {string}
         */
        this.gtfsId = "";
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
    fill(/*{gtfsId: String, status: ('enabled'|'disabled'|'hidden'), name: String, links: Array<{network: string, lines: [string], stations: [{stationId: string, stopId: string}], trips: [string], attributes: Object|null}>, attributes: Object|null}*/object)
    {
        this.gtfsId = object.gtfsId;
        this.name = object.name;
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