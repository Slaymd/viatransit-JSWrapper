//Imports
const StopSequence = require('./StopSequence');

/**
 * @class Line
 * @classdesc All properties of one line
 */
class Line {

    /**
     * Create an instance of Line
     */
    constructor(/*({id: String, networkId: String, networkServiceKey: String, name: String, shortName: String, type: number, displayOrder: number, style: {backgroundColor: string, foregroundColor: string, attributes: Object|null}, stopSequences: [{sequence: Array<{stopId: String, stationId: String}>, direction: number, main: boolean, attributes: Object|null}], attributes: Object|null}|null)*/object= null)
    {
        /**
         * Id
         * @type {string}
         */
        this.id = "";
        /**
         * Network Id
         * @type {string}
         */
        this.networkId = "";
        /**
         * Network Service Key
         * @type {string}
         */
        this.networkServiceKey = "";
        /**
         * Name
         * @type {string}
         */
        this.name = "";
        /**
         * Short name (acronym)
         * @type {string}
         */
        this.shortName = "";
        /**
         * Type
         * @type {number}
         */
        this.type = -1;
        /**
         * Display Order
         * @type {number}
         */
        this.displayOrder = -1;
        /**
         * Style
         * @type {{backgroundColor: string, foregroundColor: string, attributes: Object|null}}
         */
        this.style = {
            backgroundColor: "000000",
            foregroundColor: "FFFFFF",
            attributes: null
        };
        /**
         * Stop sequences
         * @type {[ StopSequence ]}
         */
        this.stopSequences = [];
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
    fill(/*{id: String, networkId: String, networkServiceKey: String, name: String, shortName: String, type: number, displayOrder: number, style: {backgroundColor: string, foregroundColor: string, attributes: Object|null}, stopSequences: [{sequence: Array<{stopId: String, stationId: String}>, direction: number, main: boolean, attributes: Object|null}], attributes: Object|null}*/object)
    {
        this.id = object.id;
        this.networkId = object.networkId;
        this.networkServiceKey = object.networkServiceKey;
        this.name = object.name;
        this.shortName =  object.shortName;
        this.type = object.type;
        this.displayOrder = object.displayOrder;
        this.style = object.style;
        this.stopSequences = object.stopSequences.map(stopSequence => new StopSequence(stopSequence));
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

    /**
     * Get style attribute value from key
     * @param key
     * @returns {*}
     */
    getStyleAttribute(/*String*/key) {
        if (this.style.attributes === null || this.style.attributes === undefined)
            return null;

        let attr = this.style.attributes[key];

        return attr === undefined ? null : attr;
    }

}

module.exports = Line;