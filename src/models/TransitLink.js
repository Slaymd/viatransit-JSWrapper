//Imports
const AbstractAttributes = require('./abstracts/AbstractAttributes');

/**
 * @class TransitLink
 * @property {string} network
 * @property {string[]} lines
 * @property {{stationId: string, stopId: string}[]} stations
 * @property {string[]} trips
 */
class TransitLink extends AbstractAttributes {

    /**
     * Create an instance of TransitLink
     */
    constructor(/*({network: string, lines: [string], stations: [{stationId: string, stopId: string}], trips: [string], attributes: Object|null}|null)*/object = null)
    {
        super(object instanceof Object ? object.attributes : null);
        /**
         * Network
         * @type {string}
         */
        this.network = "";
        /**
         * Lines
         * @type {[string]}
         */
        this.lines = [];
        /**
         * Stations
         * @type {[{stationId: String, stopId: String}]}
         */
        this.stations = [];
        /**
         * Trips
         * @type {[string]}
         */
        this.trips = [];
        //Constructor fill
        if (object !== null)
            this.fill(object);
    }

    /**
     * Fill properties from viaTransit API return format
     * @param object
     */
    fill(/*{network: string, lines: [string], stations: [{stationId: string, stopId: string}], trips: [string], attributes: Object|null}*/object)
    {
        this.network = object.network;
        this.lines = object.lines;
        this.stations = object.stations;
        this.trips = object.trips;
    }

    /**
     * Check if network is linked
     * @param networkKey The network key
     * @return {boolean} is linked or not
     */
    isLinkedToNetwork(/*String*/networkKey)
    {
        return this.network === 'all' || this.network === networkKey || networkKey === 'all';
    }

    /**
     * Check if line is linked
     * @param networkKey
     * @param lineId The line id
     * @return {boolean} is linked or not
     */
    isLinkedToLine(/*String*/networkKey, /*String*/lineId)
    {
        if (this.network === 'all' || (lineId === 'all' && this.isLinkedToNetwork(networkKey)))
            return true;
        return this.isLinkedToNetwork(networkKey) && (this.lines.includes('all') || this.lines.length === 0 || this.lines.includes(lineId) || lineId === 'all');
    }

    /**
     * Check if station is linked
     * @param networkKey
     * @param lineId The line id (can also be 'all' to be line independent)
     * @param stationId The station id
     * @return {boolean} is linked or not
     */
    isLinkedToStation(/*String*/networkKey, /*String*/lineId, /*String*/stationId)
    {
        if (this.network === 'all')
            return true;
        return this.isLinkedToLine(networkKey, lineId) && (!!(this.stations.find(el => el.stationId === 'all')) ||
            !!(this.stations.find(el => el.stationId === stationId)) || stationId === 'all' || this.stations.length === 0)
    }

    /**
     * Check if stop is linked
     * @param networkKey
     * @param lineId The line id (can also be 'all' to be line independent)
     * @param stationId The station id
     * @param stopId The stop id
     * @return {boolean} is linked or not
     */
    isLinkedToStop(/*String*/networkKey, /*String*/lineId, /*String*/stationId, /*String*/stopId)
    {
        if (this.network === 'all')
            return true;
        return this.isLinkedToStation(networkKey, lineId, stationId) &&
            !!(stopId === 'all' || this.stations.length === 0 || this.stations.filter(el => (el.stationId === stationId || el.stationId === 'all')).find(el => (el.stopId === stopId || el.stopId === 'all')))
    }

    /**
     * Check if trip is linked
     * @param networkKey
     * @param stationId
     * @param stopId
     * @param tripId
     * @return {boolean}
     */
    isLinkedToTrip(/*String*/networkKey, /*String*/stationId, /*String*/stopId, /*String*/tripId)
    {
        return this.network === 'all' ? true : this.isLinkedToStop(networkKey,'all', stationId, stopId) && (this.trips.includes('all') || tripId === 'all' || this.trips.length === 0 || this.trips.includes(tripId));
    }
}

module.exports = TransitLink;