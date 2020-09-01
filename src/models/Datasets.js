/**
 * @class Datasets
 * @classdesc All properties of one Datasets
 */
class Datasets {

    /**
     * Create an instance of Datasets
     */
    constructor(/*({datasets: Object, uploadedBy: String, verified: Boolean, attributes: Object|null}|null)*/object= null)
    {
        /**
         * Datasets
         * @type {object}
         */
        this.datasets = {};
        /**
         * UploadedBy
         * @type {string}
         */
        this.uploadedBy = "";
        /**
         * Verified
         * @type {boolean}
         */
        this.verified = false;
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
     * Fill properties from viaTransit API return format
     * @param object
     */
    fill(/*({datasets: Object, uploadedBy: String, verified: Boolean, attributes: Object|null}|null)*/object)
    {
        this.datasets = object.datasets;
        this.uploadedBy = object.uploadedBy;
        this.verified = object.verified;
        this.attributes = object.attributes;
    }

    /**
     * Verifying data completion of Datasets
     */
    isComplete()
    {
        return this.datasets instanceof Object &&
        this.hasValidType() &&
        this.hasCoordinates() &&
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
     * Verifying if the datasets has a valid type
     */
    hasValidType()
    {
        const types = ["Point", "Polygon", "LineString"];

        return types.includes(this.datasets.type);
    }

    /**
     * Verifying if the datasets has coordinates
     */
    hasCoordinates()
    {
        return this.datasets.coordinates instanceof Array && this.datasets.coordinates.length > 0;
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