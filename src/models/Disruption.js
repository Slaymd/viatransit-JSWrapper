const dataUtils = require("../api/utils");

/**
 * @class Disruption
 * @classdesc All properties of one disruption
 */
class Disruption {

    /**
     * Create an instance of Disruption
     */
    constructor()
    {
        /**
         * Id
         * @type {string}
         */
        this.id = "";
        /**
         * Links
         * @type {Array<{network: String, lines: Array<String>, stations: Array<String>}>}
         */
        this.links = [];
        /**
         * Type
         * @type {string}
         */
        this.type = "";
        /**
         * Status
         * @type {string}
         */
        this.status =  "";
        /**
         * Start date
         * @type {Date}
         */
        this.startDate = new Date();
        /**
         * End date
         * @type {Date}
         */
        this.endDate = new Date();
        /**
         * Attributes
         * @type {Object|null}
         */
        this.attributes = null;
        /**
         * Announcements
         * @type {Array<{
         *     id: String,
         *     links: Array<{network: String, lines: Array<String>, stations: Array<String>}>,
         *     authorId: String,
         *     startDate: Date,
         *     endDate: Date,
         *     priority: Number,
         *     lang: String,
         *     type: String,
         *     title: String,
         *     description: String,
         * }>}
         */
        this.announcements = [];
    }

    /**
     * Fill properties from viaTransit API return format
     * @param apiObject
     */
    fillFromAPI(/*Object*/apiObject)
    {
        this.id = apiObject.id;
        this.links = apiObject.links;
        this.type = apiObject.type;
        this.status = apiObject.status;
        this.startDate = new Date(apiObject.startDate);
        this.endDate = new Date(apiObject.endDate);
        this.attributes = apiObject.attributes;
        this.announcements = apiObject.announcements;
        this.announcements.forEach(announcement => {
            announcement.startDate = new Date(announcement.startDate);
            announcement.endDate = new Date(announcement.endDate);
        });
    }

    /**
     * Fill properties from database
     * @param obj Disruption database object
     */
    fillFromDatabase(/*Object*/obj)
    {
        this.id = obj._id;
        this.links = dataUtils.reformatNetworkLinks(obj.links);
        this.type = obj.type;
        this.status = obj.status;
        this.startDate = new Date(obj.start_date);
        this.endDate = new Date(obj.end_date);
        this.attributes = obj.attributes;
        this.announcements = dataUtils.reformatDisruptionAnnouncements(obj.announcements);
    }

    /**
     * Verifying data completion of disruption
     */
    isComplete()
    {
        if (this.links instanceof Array && this.links.length > 0 && this.startDate instanceof Date && this.endDate instanceof Date)
            return true;
        return false;
    }

    /**
     * Check if network is linked to this disruption
     * @param networkKey The network key
     * @param config Configure what you want to check (by default: disruption and announcements)
     * @return {boolean} is linked or not
     */
    isLinkedToNetwork(/*String*/networkKey, /*{checkDisruption: Boolean, checkAnnouncements: Boolean}*/config = {checkAnnouncements: true, checkDisruption: true})
    {
        let isLinked = false;

        if (config.checkAnnouncements) {
            for (let announcement of this.announcements) {
                if (dataUtils.isNetworkLinked(announcement.links, networkKey)) {
                    isLinked = true;
                    break;
                }
            }
        }
        if (config.checkDisruption) {
            if (dataUtils.isNetworkLinked(this.links, networkKey))
                isLinked = true;
        }
        return isLinked;
    }

    /**
     * Check if line is linked to this disruption
     * @param networkKey The line network key
     * @param lineId The line id
     * @param config Configure what you want to check (by default: disruption and announcements)
     * @return {boolean} is linked or not
     */
    isLinkedToLine(/*String*/networkKey, /*String*/lineId, /*{checkDisruption: Boolean, checkAnnouncements: Boolean}*/config = {checkAnnouncements: true, checkDisruption: true})
    {
        let isLinked = false;

        if (config.checkAnnouncements) {
            for (let announcement of this.announcements) {
                if (dataUtils.isNetworkLinked(announcement.links, networkKey) && dataUtils.isLineLinked(announcement.links, lineId)) {
                    isLinked = true;
                    break;
                }
            }
        }
        if (config.checkDisruption) {
            if (dataUtils.isNetworkLinked(this.links, networkKey) && dataUtils.isLineLinked(this.links, lineId))
                isLinked = true;
        }
        return isLinked;
    }

    /**
     * Check if station is linked to this disruption
     * @param networkKey The station network key
     * @param lineId The line id (can also be 'all' to be line independent)
     * @param stationId The station id
     * @param config Configure what you want to check (by default: disruption and announcements)
     * @return {boolean} is linked or not
     */
    isLinkedToStation(/*String*/networkKey, /*String*/lineId, /*String*/stationId, /*{checkDisruption: Boolean, checkAnnouncements: Boolean}*/config = {checkAnnouncements: true, checkDisruption: true})
    {
        let isLinked = false;

        if (config.checkAnnouncements) {
            for (let announcement of this.announcements) {
                if (dataUtils.isNetworkLinked(announcement.links, networkKey) && (lineId === 'all' || dataUtils.isLineLinked(announcement.links, lineId)) && dataUtils.isStationLinked(announcement.links, stationId)) {
                    isLinked = true;
                    break;
                }
            }
        }
        if (config.checkDisruption) {
            if (dataUtils.isNetworkLinked(this.links, networkKey) &&
                (lineId === 'all' || dataUtils.isLineLinked(this.links, lineId)) &&
                dataUtils.isStationLinked(this.links, stationId))
                isLinked = true;
        }
        return isLinked;
    }

    /**
     * Get linked announcements
     * @param networkKey
     * @param lineId
     * @param stationId
     * @return {Array<{
     *     id: String,
     *     links: Array<{network: String, lines: Array<String>, stations: Array<String>}>,
     *     authorId: String,
     *     startDate: Date,
     *     endDate: Date,
     *     priority: Number,
     *     lang: String,
     *     type: String,
     *     title: String,
     *     description: String,
     * }>}
     */
    getLinkedAnnouncements(/*String*/networkKey, /*String*/lineId = 'all', /*String*/stationId = 'all')
    {
        let linkedAnnouncements = [];

        for (let announcement of this.announcements) {
            if ((networkKey === 'all' || dataUtils.isNetworkLinked(announcement.links, networkKey)) &&
                (lineId === 'all' || dataUtils.isLineLinked(announcement.links, lineId)) &&
                (stationId === 'all' || dataUtils.isStationLinked(announcement.links, stationId)))
                linkedAnnouncements.push(announcement);
        }
        return linkedAnnouncements;
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

module.exports = Disruption;