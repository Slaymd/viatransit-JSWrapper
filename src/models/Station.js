//Imports
const AbstractAttributes = require('./abstracts/AbstractAttributes');
const Stop = require('./Stop');
const TransitLinkArray = require('./TransitLinkArray');

/**
 * @class Station
 * @property {string} id
 * @property {string} networkKey
 * @property {string} name
 * @property {('public_transit'|'trains'|'unknown')} type
 * @property {({type: string, coordinates: number[]}|null)} location
 * @property {[{networkKey: string, id: string}]} lines
 * @property {Stop} stops
 * @property {TransitLinkArray} links
 */
class Station extends AbstractAttributes {

    /**
     * Create an instance of Station
     */
    constructor(/*({id: string, networkKey: string, name: string, type: ('public_transit'|'trains'|'unknown'), location: ({type: string, coordinates: number[]}|null), lines: [{networkKey: string, id: string}], stops: [{id: string, lines: string[], location: (Object|null), attributes: (Object|null)}], links: [{network: string, lines: [string], stations: [{stationId: string, stopId: string}], trips: [string], attributes: Object|null}], attributes: (Object|null)}|null)*/object = null)
    {
        super(object instanceof Object ? object.attributes : null);
        this.id = "";
        this.networkKey = "";
        this.name = "";
        this.type = 'unknown';
        this.location = null;
        this.lines = [];
        this.stops = [];
        this.links = [];
        //Optional constructor fill
        if (object !== null)
            this.fill(object);
    }

    /**
     * Fill from viaTransit API return format
     * @param object
     */
    fill(/*{id: string, networkKey: string, name: string, type: ('public_transit'|'trains'|'unknown'), location: ({type: string, coordinates: number[]}|null), lines: [{networkKey: string, id: string}], stops: [{id: string, lines: string[], location: (Object|null), attributes: (Object|null)}], links: [{network: string, lines: [string], stations: [{stationId: string, stopId: string}], trips: [string], attributes: Object|null}], attributes: (Object|null)}*/object) {
        this.id = object.id;
        this.networkKey = object.networkKey;
        this.name = object.name;
        this.type = object.type;
        this.lines = object.lines;
        this.location = object.location;
        this.stops = object.stops.map(objectStop => new Stop(objectStop));
        this.links = new TransitLinkArray(object.links);
    }

}

module.exports = Station;