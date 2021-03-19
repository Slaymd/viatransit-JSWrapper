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
 * @property {[{encodedSegment: string, duration: number, nextStation: {id: string, stopId: string, name string}}]} routeSegments
 */
class Vehicle extends AbstractAttributes {

    /**
     * Create an instance of Vehicle
     */
    constructor(/*({id: string, networkKey: string, lineId: string, tripId: string, sequenceId: number, lastUpdateDate: string, currentLocation: [number], routeSegments: [{encodedSegment: string, duration: number, nextStation: {id: string, stopId: string, name string}}], attributes: (Object|null)}|null)*/object = null)
    {
        super(object instanceof Object ? object.attributes : null);
        this.id = "";
        this.networkKey = "";
        this.lineId = "";
        this.tripId = "";
        this.sequenceId = -1;
        this.lastUpdateDate = "";
        this.currentLocation = [0, 0];
        this.routeSegments = [];
        //Optional constructor fill
        if (object !== null)
            this.fill(object);
    }

    /**
     * Fill from viaTransit API return format
     * @param object
     */
    fill(/*{id: string, networkKey: string, lineId: string, tripId: string, sequenceId: number, lastUpdateDate: string, currentLocation: [number], routeSegments: [{encodedSegment: string, duration: number, nextStation: {id: string, stopId: string, name string}}], attributes: (Object|null)}*/object) {
        this.id = object.id;
        this.networkKey = object.networkKey;
        this.lineId = object.lineId;
        this.tripId = object.tripId;
        this.sequenceId = object.sequenceId;
        this.lastUpdateDate = object.lastUpdateDate;
        this.currentLocation = object.currentLocation;
        this.routeSegments = object.routeSegments;
        this.attributes = object.attributes;
    }

    /**
     * Get decoded route line string
     * @return {[{segment: [[number]], duration: number, nextStation: {id: string, stopId: string, name string}}]}
     */
    getRoute() {
        return this.routeSegments.map(segment => { return {segment: Utils.decodeLineString(segment.encodedSegment), duration: segment.duration, nextStation: segment.nextStation}});
    }

    /**
     * Set encoded route line array
     * @param routeSegments
     */
    setRoute(/*[{segment: [[number]], duration: number, nextStation: {id: string, stopId: string, name string}}]*/routeSegments) {
        this.routeSegments = routeSegments.map(segment => { return {encodedSegment: Utils.encodeLineString(segment.segment), duration: segment.duration, nextStation: segment.nextStation}})
    }

}

module.exports = Vehicle;