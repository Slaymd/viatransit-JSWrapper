//Imports
const AbstractAttributes = require('./abstracts/AbstractAttributes');

/**
 * @class ItinerarySectionStep
 */
class ItinerarySectionStep extends AbstractAttributes {

    /**
     * Create an instance of ItinerarySectionStep
     */
    constructor(/*({type: ('station'|'coords'|'unknown'), name: string, coordinates: (number[]|null), departureDate: String, arrivalDate: String, attributes: (Object|null)}|null)*/object = null)
    {
        super(typeof object === 'object' ? object.attributes : null);
        /**
         * type
         * @type {('station'|'coords'|'unknown')}
         */
        this.type = "unknown";
        /**
         * name
         * @type {string}
         */
        this.name = "";
        /**
         * coordinates
         * @type {number[]|null}
         */
        this.coordinates = null;
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
        //Optional constructor fill
        if (object !== null)
            this.fill(object);
    }

    /**
     * Fill from viaTransit API return format
     * @param object
     */
    fill(/*{type: ('station'|'coords'|'unknown'), name: string, coordinates: (number[]|null), departureDate: String, arrivalDate: String, attributes: (Object|null)}*/object) {
        this.type = object.type;
        this.name = object.name;
        this.departureDate = object.departureDate;
        this.arrivalDate = object.arrivalDate;
    }

}

module.exports = ItinerarySectionStep;