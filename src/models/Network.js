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
         * Services
         * @type {Array<{key: String, type: 'public_transit'|'bike_share'|'trains'|'car_park'|'unknown', name: String, attributes: Object|null}>}
         */
        this.services = [];
        /**
         * Status
         * @type {'enabled'|'disabled'}
         */
        this.status = "enabled";
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
        this.services = obj.services;
        this.status = obj.status;
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
        this.services = apiObject.services;
        this.status = apiObject.status;
        this.attributes = apiObject.attributes;
    }

    /**
     * Check if network service key exist.
     * @param key
     * @return {boolean}
     */
    hasServiceKey(/*String*/key)
    {
        for (let service of this.services) {
            if (service.key === key)
                return true;
        }
        return false;
    }

    /**
     * Get service by key
     * @param key
     * @return {{key: String, type: ("public_transit"|"bike_share"|"trains"|"car_park"|"unknown"), name: String, attributes: (Object|null)}|null}
     */
    getService(/*String*/key)
    {
        if (!this.hasServiceKey(key))
            return null;
        return this.services.find(el => el.key === key);
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