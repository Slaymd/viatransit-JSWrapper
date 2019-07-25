const dataUtils = require("../api/utils");

/**
 * @class User
 * @classdesc All properties of one user
 */
class User {

    /**
     * Create an instance of User
     */
    constructor()
    {
        /**
         * Id
         * @type {string}
         */
        this.id = "";
        /**
         * Email
         * @type {string}
         */
        this.email = "";
        /**
         * Password
         * @type {string}
         */
        this.password = "";
        /**
         * Username
         * @type {string}
         */
        this.username = "";
        /**
         * Firstname
         * @type {string}
         */
        this.firstname = "";
        /**
         * Lastname
         * @type {string}
         */
        this.lastname = "";
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
        this.email = obj.email;
        this.password = obj.password;
        this.username = obj.username;
        this.firstname = obj.firstname;
        this.lastname = obj.lastname;
        this.permissions = obj.permissions;
        this.attributes = obj.attributes;
    }

    /**
     * Fill properties from database
     * @param obj User database object
     */
    fillFromDatabase(/*Object*/obj)
    {
        this.id = String(obj._id);
        this.email = obj.email;
        this.password = obj.password;
        this.username = obj.username;
        this.firstname = obj.firstname;
        this.lastname = obj.lastname;
        this.permissions = obj.permissions;
        this.attributes = obj.attributes;
    }


    /**
     * Check permissions from string
     * @param permission
     * @returns Boolean
     */
    hasPermission(/*String*/permission) {
        if (this.permissions === null || this.permissions === undefined)
            return false;
        return this.permissions.includes(permission);
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

module.exports = User;