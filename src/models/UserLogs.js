const dataUtils = require("../api/utils");

/**
 * @class UserLogs
 * @classdesc All properties of one user
 */
class UserLogs {

    /**
     * Create an instance of UserLogs
     */
    constructor()
    {
        /**
         * Id
         * @type {string}
         */
        this.id = "";
        /**
         * logs
         * @type {Array.<Object>}
         */
        this.logs = [];
        /**
         * Attributes
         * @type {Object|null}
         */
        this.attributes = null;
    }

    /**
     * Fill properties from viaTransit API return format
     * @param obj
     */
    fillFromAPI(/*Object*/obj)
    {
        this.id = String(obj.id);
        this.logs = obj.logs;
        this.attributes = obj.attributes;
    }

    /**
     * Fill properties from database
     * @param obj User database object
     */
    fillFromDatabase(/*Object*/obj)
    {
        this.id = String(obj._id);
        this.logs = obj.logs;
        this.attributes = obj.attributes;
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

module.exports = UserLogs;