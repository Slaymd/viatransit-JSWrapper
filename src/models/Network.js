//Imports
const dataUtils = require("../api/utils");

/**
 * @class Network
 * @classdesc All properties of one network
 */
class Network {

    /**
     * Create an instance of Network
     */
    constructor()
    {
        /**
         * Id
         * @type {string}
         */
        this.id = "";
        /**
         * Key
         * @type {string}
         */
        this.key = "";
        /**
         * Name
         * @type {string}
         */
        this.name = "";
        /**
         * Short name
         * @type {string}
         */
        this.shortName = "";
        /**
         * Description
         * @type {string}
         */
        this.description = "";
        /**
         * Cities
         * @deprecated Subject to change
         * @type {Array<String>}
         */
        this.cities = [];
        /**
         * Types
         * @deprecated Will be removed or moved
         * @type {{modes: string[], attributes: null, type: string}[]}
         */
        this.types = [];
        /**
         * Agency website
         * @deprecated Will be moved to attributes
         * @type {string}
         */
        this.agencyWebsite = "";
        /**
         * Information types
         * @deprecated Subject to change
         * @type {Array<String>}
         */
        this.informationTypes = [];
        /**
         * Attributes
         * @type {Object|null}
         */
        this.attributes = null;
    }

    /**
     * Fill properties from database
     * @param obj Network database object
     */
    fillFromDatabase(/*Object*/obj)
    {
        this.id = obj._id;
        this.name = obj.name;
        this.shortName = obj.short_name;
        this.description = obj.description;
        this.cities = obj.cities;
        this.key = obj.key;
        this.types = obj.types;
        this.agencyWebsite = obj.agency_website;
        this.informationTypes = obj.information_types;
        this.attributes = obj.attributes;
    }

    /**
     * Fill properties from viaTransit API return format
     * @param apiObject
     */
    fillFromAPI(/*Object*/apiObject)
    {
        this.id = apiObject.id;
        this.name = apiObject.name;
        this.shortName = apiObject.shortName;
        this.description = apiObject.description;
        this.cities = apiObject.cities;
        this.key = apiObject.key;
        this.types = apiObject.types;
        this.agencyWebsite = apiObject.agencyWebsite;
        this.informationTypes = apiObject.informationTypes;
        this.attributes = apiObject.attributes;
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

module.exports = Network;