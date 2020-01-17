/**
 * @class Schedule
 * @classdesc All properties of one schedule
 */
class Schedule {

    /**
     * Create an instance of Schedule
     */
    constructor(/*({id: String, networkKey: String, lineId: String, stopId: String, destinationId: String, directionId: Number, headsign: String, arrivalDate: String, departureDate: String, theorical: Boolean, attributes: Object|null}|null)*/object = null)
    {
        /**
         * Id
         * @type {string}
         */
        this.id = "";
        /**
         * Network
         * @type {string}
         */
        this.networkKey = "";
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
         * Arrival date
         * @type {string}
         */
        this.arrivalDate = "";
        /**
         * Departure date
         * @type {string}
         */
        this.departureDate = "";
        /**
         * Is theorical
         * @type {boolean}
         */
        this.theorical = true;
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
    fill(/*{id: String, networkKey: String, lineId: String, stopId: String, destinationId: String, directionId: Number, headsign: String, arrivalDate: String, departureDate: String, theorical: Boolean, attributes: Object|null}*/object) {
        this.id = object.id;
        this.networkKey = object.networkKey;
        this.lineId = object.lineId;
        this.stopId = object.stopId;
        this.destinationId = object.destinationId;
        this.directionId = object.directionId;
        this.headsign = object.headsign;
        this.arrivalDate = object.arrivalDate;
        this.departureDate = object.departureDate;
        this.theorical = object.theorical;
        this.attributes = object.attributes;
    }

    /**
     * Get decomposed date
     * @param dateString
     * @return {{hours: number, seconds: number, minutes: number}|null}
     */
    getDecomposedTime(/*String|null*/dateString= null)
    {
        let date = new Date(!dateString ? this.departureDate : dateString);

        if (isNaN(date.getTime()))
            return null;
        return {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
        };
    }

    /**
     * Get waiting time in seconds
     * @param of departure or arrival
     * @param fromDate
     * @return {number}
     */
    getWaitingTime(/*('departure'|'arrival')*/of = 'departure', /*Date|null*/fromDate = null)
    {
        let now = !fromDate ? new Date() : fromDate;
        let futureDate = new Date(of === 'departure' ? this.departureDate : this.arrivalDate);

        return Math.round((futureDate - now) / 1000) + this.getDelayTime();
    }

    /**
     * Get delay time
     * @param fromDate
     * @return {number}
     */
    getDelayTime(/*Date|null*/fromDate = null)
    {
        let realtimeDate = this.departureDate ? new Date(this.departureDate) : this.arrivalDate ? new Date(this.arrivalDate) : null;
        let baseDate = this.departureDate && this.getAttribute('baseDepartureDate') ? new Date(this.getAttribute('baseDepartureDate')) : this.arrivalDate && this.getAttribute('baseArrivalDate') ? new Date(this.getAttribute('baseArrivalDate')) : null;

        if (!realtimeDate || !baseDate)
            return 0;
        return Math.round((realtimeDate - baseDate) / 1000);
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