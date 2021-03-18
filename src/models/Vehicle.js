//Imports
const AbstractAttributes = require('./abstracts/AbstractAttributes');
const Utils = require("../controllers/utils").Utils;

/**
 * @class Vehicle
 * @property {string} id
 * @property {string} networkKey
 * @property {string} lineId
 * @property {string} tripId
 * @property {number} sequenceId
 * @property {string} lastUpdateDate
 * @property {[number]} currentLocation
 * @property {string} routeEncoded
 * @property {number} routeDuration
 */
class Vehicle extends AbstractAttributes {

    /**
     * Create an instance of Vehicle
     */
    constructor(/*({id: string, networkKey: string, lineId: string, tripId: string, sequenceId: number, lastUpdateDate: string, currentLocation: [number], routeEncoded: string, routeDuration: number, attributes: (Object|null)}|null)*/object = null)
    {
        super(object instanceof Object ? object.attributes : null);
        this.id = "";
        this.networkKey = "";
        this.lineId = "";
        this.tripId = "";
        this.sequenceId = -1;
        this.lastUpdateDate = "";
        this.currentLocation = [0, 0];
        this.routeEncoded = ""
        this.routeDuration = -1;
        //Optional constructor fill
        if (object !== null)
            this.fill(object);
    }

    /**
     * Fill from viaTransit API return format
     * @param object
     */
    fill(/*{id: string, networkKey: string, lineId: string, tripId: string, sequenceId: number, lastUpdateDate: string, currentLocation: [number], routeEncoded: string, routeDuration: number, attributes: (Object|null)}*/object) {
        this.id = object.id;
        this.networkKey = object.networkKey;
        this.lineId = object.lineId;
        this.tripId = object.tripId;
        this.sequenceId = object.sequenceId;
        this.lastUpdateDate = object.lastUpdateDate;
        this.currentLocation = object.currentLocation;
        this.routeEncoded = object.routeEncoded;
        this.routeDuration = object.routeDuration;
        this.attributes = object.attributes;
    }

    /**
     * Get decoded route line string
     * @return {[[number]]}
     */
    getRoute() {
        return Utils.decodeLineString(this.routeEncoded);
    }

    /**
     * Set encoded route line array
     * @param lineString
     */
    setRoute(/*[[number]]*/lineString) {
        this.routeEncoded = Utils.encodeLineString(lineString);
    }

}

module.exports = Vehicle;