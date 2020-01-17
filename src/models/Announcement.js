//Imports
const TransitLinkArray = require("./TransitLinkArray");

/**
 * @class Announcement
 */
class Announcement {

    /**
     * Create an instance of Announcement
     */
    constructor(/*({id: String, links: Array<{network: string, lines: [string], stations: [{stationId: string, stopId: string}], trips: [string], attributes: Object|null}>, authorId: String, startDate: Date, endDate: Date, priority: Number, lang: String, type: String, title: String, description: String, attributes: (Object|null)}|null)*/object = null)
    {
        /**
         * Id
         * @type {string}
         */
        this.id = "";
        /**
         * Links
         * @type {TransitLinkArray}
         */
        this.links = new TransitLinkArray();
        /**
         * Author ID
         * @type {string}
         */
        this.authorId = "";
        /**
         * Start date
         * @type {Date}
         */
        this.startDate = new Date();
        /**
         * End date
         * @type {Date}
         */
        this.endDate = new Date();
        /**
         * Priority
         * @type {number}
         */
        this.priority = 1;
        /**
         * Lang
         * @type {string}
         */
        this.lang = "";
        /**
         * Type
         * @type {string}
         */
        this.type = "";
        /**
         * Title
         * @type {string}
         */
        this.title =  "";
        /**
         * Description
         * @type {string}
         */
        this.description =  "";
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
     * Fill from viaTransit API return format
     * @param object
     */
    fill(/*{id: String, links: Array<{network: string, lines: [string], stations: [{stationId: string, stopId: string}], trips: [string], attributes: Object|null}>, authorId: String, startDate: Date, endDate: Date, priority: Number, lang: String, type: String, title: String, description: String, attributes: (Object|null)}*/object) {
        this.id = object.id;
        this.links = new TransitLinkArray(object.links);
        this.authorId = object.authorId;
        this.startDate = new Date(object.startDate);
        this.endDate = new Date(object.endDate);
        this.priority = object.priority;
        this.lang = object.lang;
        this.type = object.type;
        this.title = object.title;
        this.description = object.description;
        this.attributes = object.attributes;
    }

    /**
     * Get attribute value from key
     * @param key
     * @returns {Object|null}
     */
    getAttribute(/*String*/key) {
        if (this.attributes === null || this.attributes === undefined)
            return null;

        let attr = this.attributes[key];

        return attr === undefined ? null : attr;
    }

}

module.exports = Announcement;