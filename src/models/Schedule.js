//Models
const DayDate = require('./DayDate');

/**
 * @class Schedule
 * @classdesc All properties of one schedule
 */
class Schedule {

    /**
     * Create an instance of Schedule
     */
    constructor()
    {
        /**
         * Id
         * @type {string}
         */
        this.id = "";
        /**
         * Line id
         * @type {string}
         */
        this.lineId = "";
        /**
         * Stop id
         * @type {string}
         */
        this.stopId = "";
        /**
         * Destination stop id
         * @type {string}
         */
        this.destinationId = "";
        /**
         * Line direction id
         * @type {number}
         */
        this.directionId = 0;
        /**
         * Headsign (generally the destination displayed on vehicle)
         * @type {string}
         */
        this.headsign = "";
        /**
         * Waiting time in seconds
         * @type {number}
         */
        this.waitingTime = 0;
        /**
         * Departure time
         * @type {DayDate}
         */
        this.departureTime = new DayDate();
        /**
         * Is theorical
         * @type {boolean}
         */
        this.theorical = true;
        /**
         * Is day last schedule
         * @type {boolean}
         */
        this.isLast = false;
        /**
         * Delay time in seconds (compared to the theorical schedule)
         * @type {number}
         */
        this.delayTime = 0;
        /**
         * Network
         * @type {string}
         */
        this.network = "";
        /**
         * Attributes
         * @type {Object|null}
         */
        this.attributes = null;
    }

    /**
     * Fill properties
     * @param network
     * @param id
     * @param lineId
     * @param stopId
     * @param destinationId
     * @param directionId
     * @param headsign
     * @param departureTime
     * @param waitingTime
     * @param theorical
     * @param delayTime
     */
    fill(/*String*/network, /*String*/id, /*String*/lineId, /*String*/stopId,
         /*String*/destinationId, /*Number*/directionId, /*String*/headsign,
         /*DayDate*/departureTime, /*Number*/waitingTime, /*boolean*/theorical,
         /*Number*/delayTime)
    {
        this.network = network;
        this.id = id;
        this.lineId = lineId;
        this.stopId = stopId;
        this.destinationId = destinationId;
        this.directionId = directionId;
        this.headsign = headsign;
        this.departureTime = departureTime;
        this.waitingTime = waitingTime;
        this.theorical = theorical;
        this.delayTime = delayTime;
    }

    /**
     * Fill properties from viaTransit API return format
     * @param apiObject
     */
    fillFromAPI(/*Object*/apiObject)
    {
        this.network = apiObject.network;
        this.departureTime.fill(apiObject.departureTime.hour, apiObject.departureTime.min, apiObject.departureTime.sec);
        this.isLast = apiObject.isLast;
        this.waitingTime = apiObject.waitingTime;
        this.lineId = apiObject.lineId;
        this.network = apiObject.network;
        this.delayTime = apiObject.delayTime;
        this.stopId = apiObject.stopId;
        this.id = apiObject.id;
        this.theorical = apiObject.theorical;
        this.directionId = apiObject.directionId;
        this.headsign = apiObject.headsign;
        this.destinationId = apiObject.destinationId;
        this.attributes = apiObject.attributes;
        if (apiObject.theoricalDepartureTime !== undefined)
            this.attributes = {...this.attributes, ...{theoricalDepartureTime: apiObject.theoricalDepartureTime}};
    }

    /**
     * Fill from TaM CSV format array
     * @param tamArray
     * @return {boolean}
     */
    fillFromTaMArray(/*[String]*/tamArray)
    {
        if (tamArray.length !== 11)
            return false;
        let tripId = tamArray[0];
        let lineId = tamArray[4];
        let stopId = tamArray[2];
        let directionId = parseInt(tamArray[6]);
        let destinationId = tamArray[10];
        let tripHeadsign = tamArray[5];
        let departureTime = tamArray[7];
        let theorical = parseInt(tamArray[8]);

        if (Number.isNaN(directionId) || Number.isNaN(theorical))
            return false;
        this.id = tripId;
        this.lineId = lineId;
        this.stopId = stopId;
        this.destinationId = destinationId;
        this.directionId = directionId;
        this.headsign = tripHeadsign;
        this.departureTime.fillFromColonString(departureTime);
        this.waitingTime = this.departureTime.getWaitingTime();
        this.theorical = theorical === 1;
        if (this.waitingTime < 86300 && this.waitingTime > 7200)
            return false;
        else if (this.waitingTime >= 86300)
            this.waitingTime = 0;
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

module.exports = Schedule;