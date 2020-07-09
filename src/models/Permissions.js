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
     * Check permissions from string
     * @param permission
     * @returns Boolean
     */
    hasPermission(/*String*/permission) {
        if (this.permissions === null || this.permissions === undefined)
            return false;
        if (this.permissions.includes('*') || this.permissions.includes(permission))
            return true;
        let p = permission.split('.');
    
        for (let i = 0; i < this.permissions.length || i.length; i++) {
            let s = this.permissions[i].split('.');
    
            for (let j = 0; j < s.length; j++) {
                if (s[j] !== p[j]) {
                    if (s[j] === '*')
                        return true;
                    break;
                }
            };
        };
        return false;
    }

    /**
     * Check is permission is master (*)
    * @returns Boolean
     */
    isMaster()
    {
        return this.permissions.includes('*')
    }

    /**
     * Get attribute value from key
     * @param key
     * @returns {Object|null}
     */
    getAttribute(/*String*/key)
    {
        if (this.attributes === null || this.attributes === undefined)
            return null;

        let attr = this.attributes[key];

        return attr === undefined ? null : attr;
    }
}

module.exports = Permission;