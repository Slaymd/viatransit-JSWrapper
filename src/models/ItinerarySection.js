//Imports
const AbstractAttributes = require('./abstracts/AbstractAttributes');
const ItinerarySectionStep = require('./ItinerarySectionStep');

/**
 * @class ItinerarySection
 * @property {string} departureDate
 * @property {string} arrivalDate
 * @property {('walking'|'waiting'|'public_transit'|'trains'|'car'|'unknown')} type
 * @property {ItinerarySectionStep[]} steps
 * @property {[[number]]} shape
 */
class ItinerarySection extends AbstractAttributes {

    /**
     * Create an instance of ItinerarySectionStep
     */
    constructor(/*({departureDate: string, arrivalDate: string, type: ('walking'|'waiting'|'public_transit'|'trains'|'car'|'unknown'), steps: [ {type: ('station'|'coords'|'unknown'), name: string, coordinates: (number[]|null), departureDate: String, arrivalDate: String, attributes: (Object|null)} ], shape: [ [ number ] ], attributes: (Object|null)}|null)*/object = null)
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
         * type
         * @type {('walking'|'waiting'|'public_transit'|'trains'|'car'|'unknown')}
         */
        this.type = "unknown";
        /**
         * from
         * @type {[ItinerarySectionStep]}
         */
        this.steps = [];
        /**
         * Shape
         * @type {[[number]]}
         */
        this.shape = [];
        //Optional constructor fill
        if (object !== null)
            this.fill(object);
    }

    /**
     * Fill from viaTransit API return format
     * @param object
     */
    fill(/*{departureDate: string, arrivalDate: string, type: ('walking'|'waiting'|'public_transit'|'trains'|'car'|'unknown'), steps: [ {type: ('station'|'coords'|'unknown'), name: string, coordinates: (number[]|null), departureDate: String, arrivalDate: String, attributes: (Object|null)} ], shape: [ [ number ] ], attributes: (Object|null)}*/object) {
        this.departureDate = object.departureDate;
        this.arrivalDate = object.arrivalDate;
        this.type = object.type;
        this.steps = object.steps.map(objectStep => new ItinerarySectionStep(objectStep));
        this.shape = object.shape;
    }

}

module.exports = ItinerarySection;