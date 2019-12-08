/**
 * @class Token
 * @classdesc All properties of one token
 */
class Token {

    /**
     * Create an instance of Token
     */
    constructor()
    {
        /**
         * Id
         * @type {string}
         */
        this.id = "";
        /**
         * token
         * @type {string}
         */
        this.token = "";
        /**
         * type
         * @type {string}
         */
        this.type = "";
        /**
         * userId
         * @type {string}
         */
        this.userId = "";
        /**
         * PermissionId
         * @type {string}
         */
        this.permissionId = "";
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
        this.token = obj.token;
        this.type = obj.type;
        this.userId = obj.userId;
        this.permissionId = obj.permissionId;
        this.attributes = obj.attributes;
    }

    /**
     * Fill properties from database
     * @param obj
     */
    fillFromDatabase(/*Object*/obj)
    {
        this.id = String(obj._id);
        this.token = obj.token;
        this.type = obj.type;
        this.userId = obj.userId;
        this.permissionId = obj.permissionId;
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

module.exports = Token;