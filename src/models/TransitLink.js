/**
 * @class TransitLink
 */
class TransitLink {

    /**
     * Create an instance of TransitLink
     */
    constructor(/*({network: String, service: String, type: ("public_transit"|"bike_share"|"trains"|"car_park"|"unknown"), attributes: ?{lines: ([String]|null), stations: ([{stationId: String, stopId: String}]|null)}}|null)*/object = null)
    {
        /**
         * Network
         * @type {string}
         */
        this.network = "";
        /**
         * Service
         * @type {string}
         */
        this.service = "";
        /**
         * Service type
         * @type {("public_transit"|"bike_share"|"trains"|"car_park"|"unknown")}
         */
        this.type = "unknown";
        /**
         * Attributes
         * @type {?{
         *     lines: ?[String],
         *     stations: ?[{stationId: String, stopId: String}]
         * }}
         */
        this.attributes = null;
        //Constructor fill
        if (object !== null)
            this.fill(object);
    }

    /**
     * Fill properties from viaTransit API return format
     * @param apiObject
     */
    fill(/*{network: String, service: String, type: ("public_transit"|"bike_share"|"trains"|"car_park"|"unknown"), attributes: ?{lines: ([String]|null), stations: ([{stationId: String, stopId: String}]|null)}}*/object)
    {
        this.network = object.network;
        this.service = object.service;
        this.type = object.type;
        this.attributes = object.attributes;
    }

    /**
     * Check if network is linked
     * @param networkId The network id
     * @return {boolean} is linked or not
     */
    isLinkedToNetwork(/*String*/networkId)
    {
        return this.network === 'all' || this.network === networkId || networkId === 'all';
    }

    /**
     * Check if service is linked
     * @param networkId The network id
     * @param serviceId The network' service id (can also be a service type)
     * @return {boolean}
     */
    isLinkedToService(/*String*/networkId, /*String*/serviceId)
    {
        if (this.network === 'all' || this.service === 'all')
            return true;
        return this.isLinkedToNetwork(networkId) && (this.service === 'all' || this.service === serviceId || serviceId === 'all' || this.type === serviceId);
    }

    /**
     * Check if line is linked
     * @param networkId The network id
     * @param serviceId The network' service id
     * @param lineId The line id
     * @return {boolean} is linked or not
     */
    isLinkedToLine(/*String*/networkId, /*String*/serviceId, /*String*/lineId)
    {
        if (this.network === 'all' || this.service === 'all' || (lineId === 'all' && this.isLinkedToService(networkId, serviceId)))
            return true;
        return this.isLinkedToService(networkId, serviceId) && (this.attributes !== null && this.attributes !== undefined)
            && this.attributes.lines instanceof Array && (this.attributes.lines.includes('all') || this.attributes.lines.includes(lineId) || lineId === 'all');
    }

    /**
     * Check if station is linked
     * @param networkId The network id
     * @param serviceId The network' service id
     * @param lineId The line id (can also be 'all' to be line independent)
     * @param stationId The station id
     * @return {boolean} is linked or not
     */
    isLinkedToStation(/*String*/networkId, /*String*/serviceId, /*String*/lineId, /*String*/stationId)
    {
        if (this.network === 'all' || this.service === 'all')
            return true;
        return this.isLinkedToLine(networkId, serviceId, lineId) && (this.attributes !== null && this.attributes !== undefined)
            && this.attributes.stations instanceof Array && (!!(this.attributes.stations.find(el => el.stationId === 'all')) ||
            !!(this.attributes.stations.find(el => el.stationId === stationId)) ||
            stationId === 'all')
    }

    /**
     * Check if stop is linked
     * @param networkId The network id
     * @param serviceId The network' service id
     * @param lineId The line id (can also be 'all' to be line independent)
     * @param stationId The station id
     * @param stopId The stop id
     * @return {boolean} is linked or not
     */
    isLinkedToStop(/*String*/networkId, /*String*/serviceId, /*String*/lineId, /*String*/stationId, /*String*/stopId)
    {
        if (this.network === 'all' || this.service === 'all')
            return true;
        return this.isLinkedToStation(networkId, serviceId, lineId, stationId) && (this.attributes !== null && this.attributes !== undefined)
            && this.attributes.stations instanceof Array &&
            !!(stopId === 'all' || this.attributes.stations.filter(el => (el.stationId === stationId || el.stationId === 'all')).find(el => (el.stopId === stopId || el.stopId === 'all')))
    }
}

module.exports = TransitLink;