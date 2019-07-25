const dataUtils = require("../api/utils");

/**
 * @class Permissions
 * @classdesc All properties of one permissions
 */
class Permission {

    /**
     * Create an instance of Permission
     */
    constructor()
    {
        /**
         * Id
         * @type {string}
         */
        this.id = "";
        /**
         * Permissions
         * @type {Array<String>}
         */
        this.permissions = [];
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
        this.permissions = obj.permissions;
        this.attributes = obj.attributes;
    }

    /**
     * Fill properties from database
     * @param obj
     */
    fillFromDatabase(/*Object*/obj)
    {
        this.id = String(obj._id);
        this.permissions = obj.permissions;
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

module.exports = Permission;