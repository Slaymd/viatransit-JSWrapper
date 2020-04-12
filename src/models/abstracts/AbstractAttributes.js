/**
 * @class AbstractAttributes
 */
class AbstractAttributes {

    /**
     * Create an instance of AbstractAttributes
     */
    constructor(/*(Object|null)*/object)
    {
        this.attributes = !object ? null : object;
    }

    /**
     * Get attribute value from key
     * @param key
     * @returns {*|null}
     */
    getAttribute(/*String*/key) {
        if (this.attributes === null || this.attributes === undefined)
            return null;

        let attr = this.attributes[key];

        return attr === undefined ? null : attr;
    }

}

module.exports = AbstractAttributes;