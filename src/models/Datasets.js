let Utils = require('../controllers/utils').Utils;

/**
 * @class Datasets
 * @classdesc All properties of one Datasets
 */
class Datasets {

    /**
     * Create an instance of Datasets
     */
    constructor(/*({id: String, feature: Object, uploadedBy: String, verified: Boolean, attributes: Object|null}|null)*/object= null)
    {
        /**
         * Id
         * @type {string}
         */
        this.id = object && object.id ? object.id : "";
        /**
         * Feature
         * @type {object}
         */
        this.feature = object && object.feature ? object.feature : {};
        /**
         * UploadedBy
         * @type {string}
         */
        this.uploadedBy = object && object.uploadedBy ? object.uploadedBy : "";
        /**
         * Verified
         * @type {boolean}
         */
        this.verified = object && object.verified ? object.verified : false;
        /**
         * Attributes
         * @type {Object|null}
         */
        this.attributes = object && object.attributes ? object.attributes : {};
    }

    /**
     * Fill properties from viaTransit API return format
     * @param object
     */
    fill(/*({id: String, feature: Object, uploadedBy: String, verified: Boolean, attributes: Object|null}|null)*/object)
    {
        this.id = String(object.id);
        this.feature = object.feature;
        this.uploadedBy = object.uploadedBy;
        this.verified = object.verified;
        this.attributes = object.attributes;
    }

    /**
     * Fill properties from viaTransit Database return format
     * @param object
     */
    fillFromDatabase(/*({id: String, feature: Object, uploadedBy: String, verified: Boolean, attributes: Object|null}|null)*/object)
    {
        this.id = String(object._id);
        this.feature = object.feature;
        this.uploadedBy = object.uploadedBy;
        this.verified = object.verified;
        this.attributes = object.attributes;
    }

    /**
     * Verifying data completion of Datasets
     * @param kind
     * @returns {boolean} 
     */
    isComplete(kind)
    {
        return this.feature instanceof Object &&
        this.feature.type === 'Feature' &&
        this.feature.properties instanceof Object &&
        this.feature.geometry instanceof Object &&
        this.hasValidType() &&
        this.hasCoordinates() &&
        this.hasProperties(kind) &&
        typeof this.id == "string" &&
        typeof this.uploadedBy == "string" &&
        typeof this.verified == "boolean" &&
        this.attributes instanceof Object;
    }

    /**
     * Verifying if the datasets is verified by Admin
     */
    isVerified()
    {
        return this.verified;
    }

    /**
     * Return list of differente kind of datasets
     */
    getKinds()
    {
        return Utils.getDatasetsKinds()
    }

    /**
     * Verifying if the feature datasets has a valid geoJSON type
     */
    hasValidType()
    {
        const types = Utils.getDatasetsGeometryTypes();

        return types.includes(this.feature.geometry.type);
    }

    /**
     * Verifying if the feature datasets has coordinates
     */
    hasCoordinates()
    {
        return this.feature.geometry.coordinates instanceof Array
        && this.feature.geometry.coordinates.length > 0;
    }

    /**
     * Verifying if the feature has defaults properties
     * @param kind
     * @returns {boolean}
     */
    hasProperties(kind)
    {
        if (!kind)
            return false;
        const properties = Utils.getDatasetsFeatureProperties(kind);
        if (!properties || !this.feature.properties instanceof Object)
            return false;

        for (const property of properties) {
            if (property.require === true && (this.feature.properties[property.id] === null ||
                this.feature.properties[property.id] === undefined ||
                this.feature.properties[property.id].length < 1))
                return false;
        }
        return true;
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

module.exports = Datasets;