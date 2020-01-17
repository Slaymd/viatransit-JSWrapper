//Imports
const TransitLinkArray = require("./TransitLinkArray");
const Announcement = require('./Announcement');

/**
 * @class Disruption
 */
class Disruption {

    /**
     * Create an instance of Disruption
     */
    constructor(/*({id: String, links: Array<{network: string, lines: [string], stations: [{stationId: string, stopId: string}], trips: [string], attributes: Object|null}>, type: String, status: String, startDate: String, endDate: String, attributes: (Object|null), announcements: Array<{id: String, links: Array<{network: string, lines: [string], stations: [{stationId: string, stopId: string}], trips: [string], attributes: Object|null}>, authorId: String, startDate: Date, endDate: Date, priority: Number, lang: String, type: String, title: String, description: String, attributes: (Object|null)}>}|null)*/object = null)
    {
        /**
         * Id
         * @type {string}
         */
        this.id = "";
        /**
         * Links
         * @type {TransitLinkArray}
         */
        this.links = new TransitLinkArray();
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
         * @type {Array<Announcement>}
         */
        this.announcements = [];
        //Constructor optional fill
        if (object !== null)
            this.fill(object);
    }

    /**
     * Fill properties from viaTransit API return format
     * @param object
     */
    fill(/*{id: String, links: Array<{network: string, lines: [string], stations: [{stationId: string, stopId: string}], trips: [string], attributes: Object|null}>, type: String, status: String, startDate: String, endDate: String, attributes: (Object|null), announcements: Array<{id: String, links: Array<{network: string, lines: [string], stations: [{stationId: string, stopId: string}], trips: [string], attributes: Object|null}>, authorId: String, startDate: Date, endDate: Date, priority: Number, lang: String, type: String, title: String, description: String, attributes: (Object|null)}>}*/object)
    {
        this.id = object.id;
        this.links = new TransitLinkArray(object.links);
        this.type = object.type;
        this.status = object.status;
        this.startDate = new Date(object.startDate);
        this.endDate = new Date(object.endDate);
        this.attributes = object.attributes;
        this.announcements = object.announcements.map(objectAnnouncement => new Announcement(objectAnnouncement));
    }

    /**
     * Verifying data completion of disruption
     */
    isComplete()
    {
        return this.links instanceof TransitLinkArray && this.links.length >= 1 && this.startDate instanceof Date
            && this.endDate instanceof Date && this.announcements instanceof Array;
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
            if (this.announcements.flatMap(announcement => announcement.links).map(links => links.isLinkedToNetwork(networkKey)).filter(el => el === true).length >= 1)
                isLinked = true;
        }
        if (config.checkDisruption) {
            if (this.links.isLinkedToNetwork(networkKey))
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
            if (this.announcements.flatMap(announcement => announcement.links).map(links => links.isLinkedToLine(networkKey, lineId)).filter(el => el === true).length >= 1)
                isLinked = true;
        }
        if (config.checkDisruption) {
            if (this.links.isLinkedToLine(networkKey, lineId))
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
            if (this.announcements.flatMap(announcement => announcement.links).map(links => links.isLinkedToStation(networkKey, lineId, stationId)).filter(el => el === true).length >= 1)
                isLinked = true;
        }
        if (config.checkDisruption) {
            if (this.links.isLinkedToStation(networkKey, lineId, stationId))
                isLinked = true;
        }
        return isLinked;
    }

    /**
     * Check if stop is linked to this disruption
     * @param networkKey The station network key
     * @param lineId The line id (can also be 'all' to be line independent)
     * @param stationId The station id
     * @param stopId The stop id
     * @param config Configure what you want to check (by default: disruption and announcements)
     * @return {boolean} is linked or not
     */
    isLinkedToStop(/*String*/networkKey, /*String*/lineId, /*String*/stationId, /*String*/stopId, /*{checkDisruption: Boolean, checkAnnouncements: Boolean}*/config = {checkAnnouncements: true, checkDisruption: true})
    {
        let isLinked = false;

        if (config.checkAnnouncements) {
            if (this.announcements.flatMap(announcement => announcement.links).map(links => links.isLinkedToStop(networkKey, lineId, stationId, stopId)).filter(el => el === true).length >= 1)
                isLinked = true;
        }
        if (config.checkDisruption) {
            if (this.links.isLinkedToStop(networkKey, lineId, stationId, stopId))
                isLinked = true;
        }
        return isLinked;
    }

    /**
     * Check if trip is linked to this disruption
     * @param networkKey The station network key
     * @param stationId The station id
     * @param stopId The stop id
     * @param tripId The trip id
     * @param config Configure what you want to check (by default: disruption and announcements)
     * @return {boolean} is linked or not
     */
    isLinkedToTrip(/*String*/networkKey, /*String*/stationId, /*String*/stopId, /*String*/tripId, /*{checkDisruption: Boolean, checkAnnouncements: Boolean}*/config = {checkAnnouncements: true, checkDisruption: true})
    {
        let isLinked = false;

        if (config.checkAnnouncements) {
            if (this.announcements.flatMap(announcement => announcement.links).map(links => links.isLinkedToTrip(networkKey, stationId, stopId, tripId)).filter(el => el === true).length >= 1)
                isLinked = true;
        }
        if (config.checkDisruption) {
            if (this.links.isLinkedToTrip(networkKey, stationId, stopId, tripId))
                isLinked = true;
        }
        return isLinked;
    }

    /**
     * Get linked announcements
     * @param networkKey
     * @param lineId
     * @param stationId
     * @param stopId
     * @return {Array<Announcement>}
     */
    getLinkedAnnouncements(/*String*/networkKey, /*String*/lineId = 'all', /*String*/stationId = 'all', /*String*/stopId = 'all')
    {
        return this.announcements.filter(announcement => announcement.links.isLinkedToStop(networkKey, lineId, stationId, stopId));
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