//Imports

/**
 * @class StopSequence
 * @classdesc All properties of one stop sequence
 */
class StopSequence {

    /**
     * Create an instance of StopSequence
     */
    constructor(/*({sequence: Array<{stopId: String, stationId: String}>, direction: number, main: boolean, attributes: Object|null}|null)*/object = null)
    {
        /**
         * Sequence
         * @type {Array<{stopId: String, stationId: String}>}
         */
        this.sequence = [];
        /**
         * Direction
         * @type {number}
         */
        this.direction = 0;
        /**
         * Main direction sequence
         * @type {boolean}
         */
        this.main = false;
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
    fill(/*{sequence: Array<{stopId: String, stationId: String}>, direction: number, main: boolean, attributes: Object|null}*/object)
    {
        this.sequence = object.sequence;
        this.direction = object.direction;
        this.main = object.main;
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

module.exports = StopSequence;