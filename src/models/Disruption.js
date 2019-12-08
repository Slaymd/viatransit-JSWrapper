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
    constructor(/*({id: String, links: Array<{network: String, service: String, type: ("public_transit"|"bike_share"|"trains"|"car_park"|"unknown"), attributes: ?{lines: ([String]|null), stations: ([{stationId: String, stopId: String}]|null)}}>, type: String, status: String, startDate: String, endDate: String, attributes: (Object|null), announcements: Array<{id: String, links: Array<{network: String, service: String, type: ("public_transit"|"bike_share"|"trains"|"car_park"|"unknown"), attributes: ?{lines: ([String]|null), stations: ([{stationId: String, stopId: String}]|null)}}>, authorId: String, startDate: Date, endDate: Date, priority: Number, lang: String, type: String, title: String, description: String, attributes: (Object|null)}>}|null)*/object = null)
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
    fill(/*{id: String, links: Array<{network: String, service: String, type: ("public_transit"|"bike_share"|"trains"|"car_park"|"unknown"), attributes: ?{lines: ([String]|null), stations: ([{stationId: String, stopId: String}]|null)}}>, type: String, status: String, startDate: String, endDate: String, attributes: (Object|null), announcements: Array<{id: String, links: Array<{network: String, service: String, type: ("public_transit"|"bike_share"|"trains"|"car_park"|"unknown"), attributes: ?{lines: ([String]|null), stations: ([{stationId: String, stopId: String}]|null)}}>, authorId: String, startDate: Date, endDate: Date, priority: Number, lang: String, type: String, title: String, description: String, attributes: (Object|null)}>}*/object)
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
     * @param networkId The network id
     * @param config Configure what you want to check (by default: disruption and announcements)
     * @return {boolean} is linked or not
     */
    isLinkedToNetwork(/*String*/networkId, /*{checkDisruption: Boolean, checkAnnouncements: Boolean}*/config = {checkAnnouncements: true, checkDisruption: true})
    {
        let isLinked = false;

        if (config.checkAnnouncements) {
            if (this.announcements.flatMap(announcement => announcement.links).map(links => links.isLinkedToNetwork(networkId)).filter(el => el === true).length >= 1)
                isLinked = true;
        }
        if (config.checkDisruption) {
            if (this.links.isLinkedToNetwork(networkId))
                isLinked = true;
        }
        return isLinked;
    }

    /**
     * Check if network' service is linked to this disruption
     * @param networkId The network id
     * @param serviceId The network' service id
     * @param config Configure what you want to check (by default: disruption and announcements)
     * @return {boolean} is linked or not
     */
    isLinkedToService(/*String*/networkId, /*String*/serviceId, /*{checkDisruption: Boolean, checkAnnouncements: Boolean}*/config = {checkAnnouncements: true, checkDisruption: true})
    {
        let isLinked = false;

        if (config.checkAnnouncements) {
            if (this.announcements.flatMap(announcement => announcement.links).map(links => links.isLinkedToService(networkId, serviceId)).filter(el => el === true).length >= 1)
                isLinked = true;
        }
        if (config.checkDisruption) {
            if (this.links.isLinkedToService(networkId, serviceId))
                isLinked = true;
        }
        return isLinked;
    }

    /**
     * Check if line is linked to this disruption
     * @param networkId The line network id
     * @param serviceId The network' service id
     * @param lineId The line id
     * @param config Configure what you want to check (by default: disruption and announcements)
     * @return {boolean} is linked or not
     */
    isLinkedToLine(/*String*/networkId, /*String*/serviceId, /*String*/lineId, /*{checkDisruption: Boolean, checkAnnouncements: Boolean}*/config = {checkAnnouncements: true, checkDisruption: true})
    {
        let isLinked = false;

        if (config.checkAnnouncements) {
            if (this.announcements.flatMap(announcement => announcement.links).map(links => links.isLinkedToLine(networkId, serviceId, lineId)).filter(el => el === true).length >= 1)
                isLinked = true;
        }
        if (config.checkDisruption) {
            if (this.links.isLinkedToLine(networkId, serviceId, lineId))
                isLinked = true;
        }
        return isLinked;
    }

    /**
     * Check if station is linked to this disruption
     * @param networkId The station network id
     * @param serviceId The network' service id
     * @param lineId The line id (can also be 'all' to be line independent)
     * @param stationId The station id
     * @param config Configure what you want to check (by default: disruption and announcements)
     * @return {boolean} is linked or not
     */
    isLinkedToStation(/*String*/networkId, /*String*/serviceId, /*String*/lineId, /*String*/stationId, /*{checkDisruption: Boolean, checkAnnouncements: Boolean}*/config = {checkAnnouncements: true, checkDisruption: true})
    {
        let isLinked = false;

        if (config.checkAnnouncements) {
            if (this.announcements.flatMap(announcement => announcement.links).map(links => links.isLinkedToStation(networkId, serviceId, lineId, stationId)).filter(el => el === true).length >= 1)
                isLinked = true;
        }
        if (config.checkDisruption) {
            if (this.links.isLinkedToStation(networkId, serviceId, lineId, stationId))
                isLinked = true;
        }
        return isLinked;
    }

    /**
     * Check if station is linked to this disruption
     * @param networkId The station network id
     * @param serviceId The network' service id
     * @param lineId The line id (can also be 'all' to be line independent)
     * @param stationId The station id
     * @param stopId The stop id
     * @param config Configure what you want to check (by default: disruption and announcements)
     * @return {boolean} is linked or not
     */
    isLinkedToStop(/*String*/networkId, /*String*/serviceId, /*String*/lineId, /*String*/stationId, /*String*/stopId, /*{checkDisruption: Boolean, checkAnnouncements: Boolean}*/config = {checkAnnouncements: true, checkDisruption: true})
    {
        let isLinked = false;

        if (config.checkAnnouncements) {
            if (this.announcements.flatMap(announcement => announcement.links).map(links => links.isLinkedToStop(networkId, serviceId, lineId, stationId, stopId)).filter(el => el === true).length >= 1)
                isLinked = true;
        }
        if (config.checkDisruption) {
            if (this.links.isLinkedToStop(networkId, serviceId, lineId, stationId, stopId))
                isLinked = true;
        }
        return isLinked;
    }

    /**
     * Get linked announcements
     * @param networkId
     * @param serviceId
     * @param lineId
     * @param stationId
     * @param stopId
     * @return {Array<Announcement>}
     */
    getLinkedAnnouncements(/*String*/networkId, /*String*/serviceId = 'all', /*String*/lineId = 'all', /*String*/stationId = 'all', /*String*/stopId = 'all')
    {
        return this.announcements.filter(announcement => announcement.links.isLinkedToStop(networkId, serviceId, lineId, stationId, stopId));
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