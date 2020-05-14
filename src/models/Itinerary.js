//Imports
const AbstractAttributes = require('./abstracts/AbstractAttributes');
const ItinerarySection = require('./ItinerarySection');

/**
 * @class Itinerary
 * @property {string} departureDate
 * @property {string} arrivalDate
 * @property {ItinerarySection[]} sections
 */
class Itinerary extends AbstractAttributes {

    /**
     * Create an instance of ItinerarySectionStep
     */
    constructor(/*({departureDate: string, arrivalDate: string, sections: [{departureDate: string, arrivalDate: string, type: ('walking'|'waiting'|'public_transit'|'trains'|'car'|'unknown'), steps: [ {type: ('station'|'coords'|'unknown'), name: string, coordinates: (number[]|null), departureDate: String, arrivalDate: String, attributes: (Object|null)} ], shape: [ [ number ] ], attributes: (Object|null)}], attributes: (Object|null)}|null)*/object = null)
    {
        super(object instanceof Object ? object.attributes : null);
        /**
         * departureDate
         * @type {string}
         */
        this.departureDate = "";
        /**
         * arrivalDate
         * @type {string}
         */
        this.arrivalDate = "";
        /**
         *
         * @type {ItinerarySection[]}
         */
        this.sections = [];
        //Optional constructor fill
        if (object !== null)
            this.fill(object);
    }

    /**
     * Fill from viaTransit API return format
     * @param object
     */
    fill(/*{departureDate: string, arrivalDate: string, sections: [{departureDate: string, arrivalDate: string, type: ('walking'|'waiting'|'public_transit'|'trains'|'car'|'unknown'), steps: [ {type: ('station'|'coords'|'unknown'), name: string, coordinates: (number[]|null), departureDate: String, arrivalDate: String, attributes: (Object|null)} ], shape: [ [ number ] ], attributes: (Object|null)}], attributes: (Object|null)}*/object) {
        this.departureDate = object.departureDate;
        this.arrivalDate = object.arrivalDate;
        this.sections = object.sections.map(objectSection => new ItinerarySection(objectSection));
    }

}

module.exports = Itinerary;