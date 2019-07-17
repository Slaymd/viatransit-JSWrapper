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
         * Picture
         * @type {string}
         */
        this.picture = "";
        /**
         * Permissions
         * @type {Array<String>}
         */
        this.roles = [];
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
        this.picture = obj.picture;
        this.roles = obj.roles;
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
        this.picture = obj.picture;
        this.roles = obj.roles;
        this.attributes = obj.attributes;
    }


    /**
     * Check roles from permission string
     * @param role
     * @returns Boolean
     */
    hasPermission(/*String*/role) {
        if (this.roles === null || this.roles === undefined)
            return false;
        return this.roles.includes(role);
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