//Imports
const dataUtils = require("../api/utils");

/**
 * @class Zone
 * @classdesc All properties of one zone
 */
class Zone {
    /**
     * Create an instance of Zone
     */
    constructor()
    {
        /**
         * Id
         * @type {string}
         */
        this.id = "";
        /**
         * Key
         * @type {string}
         */
        this.key = "";
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
         * Status
         * @type {'visible'|'hided'}
         */
        this.status = "visible";
        /**
         * Color
         * @type {string}
         */
        this.color = "000000";
        /**
         * Text color
         * @type {string}
         */
        this.textColor = "FFFFFF";
        /**
         * Display order
         * @type {number}
         */
        this.displayOrder = 1;
        /**
         * Links
         * @type {Array<{network: String, lines: Array<String>, stations: Array<String>}>}
         */
        this.links = [];
        /**
         * Attributes
         * @type {Object|null}
         */
        this.attributes = null;
    }

    /**
     * Fill properties from database
     * @param obj Zone database object
     */
    fillFromDatabase(/*Object*/obj)
    {
        this.id = obj._id;
        this.links = dataUtils.reformatNetworkLinks(obj.links);
        this.name = obj.name;
        this.shortName = obj.short_name;
        this.description = obj.description;
        this.color = obj.color;
        this.textColor = obj.text_color;
        this.key = obj.key;
        this.displayOrder = obj.display_order;
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
        this.links = apiObject.links;
        this.name = apiObject.name;
        this.shortName = apiObject.shortName;
        this.description = apiObject.description;
        this.color = apiObject.color;
        this.textColor = apiObject.textColor;
        this.key = apiObject.key;
        this.displayOrder = apiObject.displayOrder;
        this.status = apiObject.status;
        this.attributes = apiObject.attributes;
    }

    /**
     * Check if network is linked to this zone
     * @param networkKey The network key
     * @return {boolean} is linked or not
     */
    isLinkedToNetwork(/*String*/networkKey)
    {
        return dataUtils.isNetworkLinked(this.links, networkKey);
    }

    /**
     * Check if line is linked to this zone
     * @param networkKey The line network key
     * @param lineId The line id
     * @return {boolean} is linked or not
     */
    isLinkedToLine(/*String*/networkKey, /*String*/lineId)
    {
        return dataUtils.isNetworkLinked(this.links, networkKey) && dataUtils.isLineLinked(this.links, networkKey, lineId);
    }

    /**
     * Check if station is linked to this zone
     * @param networkKey The station network key
     * @param lineId The line id (can also be 'all' to be line independent)
     * @param stationId The station id
     * @return {boolean} is linked or not
     */
    isLinkedToStation(/*String*/networkKey, /*String*/lineId, /*String*/stationId) {
        return dataUtils.isNetworkLinked(this.links, networkKey) &&
            (lineId === 'all' || dataUtils.isLineLinked(this.links, networkKey, lineId)) &&
            dataUtils.isStationLinked(this.links, networkKey, lineId, stationId);
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

module.exports = Zone;