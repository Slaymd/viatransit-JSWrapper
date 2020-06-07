//Imports
const AbstractAttributes = require('./abstracts/AbstractAttributes');

/**
 * @class Stop
 * @property {string} id
 * @property {string[]} lines
 * @property {{type: string, coordinates: number[]}} location
 */
class Stop extends AbstractAttributes {

    /**
     * Create an instance of Stop
     */
    constructor(/*({id: string, lines: string[], location: (Object|null), attributes: (Object|null)}|null)*/object = null)
    {
        super(object instanceof Object ? object.attributes : null);
        /**
         * Id
         * @type {string}
         */
        this.id = "";
        this.lines = [];
        this.location = null;
        //Optional constructor fill
        if (object !== null)
            this.fill(object);
    }

    /**
     * Fill from viaTransit API return format
     * @param object
     */
    fill(/*{id: string, lines: string[], location: (Object|null), attributes: (Object|null)}*/object) {
        this.id = object.id;
        this.lines = object.lines;
        this.location = object.location;
    }

}

module.exports = Stop;