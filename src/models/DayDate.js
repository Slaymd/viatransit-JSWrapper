/**
 * @class DayDate
 * @classdesc 24h time, calendar date independant.
 */
class DayDate {

    /**
     * Create an instance of DayDate
     * @param hour
     * @param min
     * @param sec
     */
    constructor(/*Number*/hour = 0, /*Number*/min = 0, /*Number*/sec = 0)
    {
        /**
         * Hour
         * @type {Number}
         */
        this.hour = hour;
        /**
         * Minute
         * @type {Number}
         */
        this.min = min;
        /**
         * Second
         * @type {Number}
         */
        this.sec = sec;
    }

    /**
     * Fill properties
     * @param hour
     * @param min
     * @param sec
     */
    fill(/*Number*/hour, /*Number*/min, /*Number*/sec = 0)
    {
        this.hour = hour;
        this.min = min;
        this.sec = sec;
    }

    /**
     * Fill from colon string format (hh:mm:ss)
     * @param time
     */
    fillFromColonString(/*String*/time)
    {
        let smColSplit = time.split(':');

        if (smColSplit.length !== 3)
            return;

        let _hour = parseInt(smColSplit[0]);
        let _min = parseInt(smColSplit[1]);
        let _sec = parseInt(smColSplit[2]);

        if (Number.isNaN(_hour) || Number.isNaN(_min) || Number.isNaN(_sec))
            return;

        this.hour = _hour;
        this.min = _min;
        this.sec = _sec;
    }

    /**
     * Get HH:mm format string
     * @return {string}
     */
    getHourMinFormatString()
    {
        return ((this.hour <= 9 ? '0' + this.hour : this.hour) + ':' + (this.min <= 9 ? '0' + this.min : this.min))
    }

    /**
     * Get waiting time from now in seconds
     * @return {number}
     */
    getWaitingTime(/*Boolean*/asMinutes = false)
    {
        let now = new Date();

        //Calculing date components difference
        let hourDiff = (now.getHours() - this.hour) * 60 * 60;
        let minDiff = (now.getMinutes() - this.min) * 60;
        let secondDiff = now.getSeconds() - this.sec;

        //Global time difference
        let diff = hourDiff + minDiff + secondDiff;

        let waitingTime = diff <= 0 ? -diff : 1440*60-diff;

        return asMinutes ? Math.trunc(waitingTime / 60) : waitingTime;
    }

    /**
     * Get waiting time from a date in seconds
     * @param date
     * @return {number}
     */
    getWaitingTimeUntil(/*DayDate*/date)
    {
        //Calculing date components difference
        let hourDiff = (date.hour - this.hour) * 60 * 60;
        let minDiff = (date.min - this.min) * 60;
        let secondDiff = date.sec - this.sec;

        //Global time difference
        let diff = hourDiff + minDiff + secondDiff;

        return diff <= 0 ? -diff : 1440*60-diff;
    }

    toString() {
        return ('[DayDate ' + this.getHourMinFormatString() + ' (in ' + this.getWaitingTime(true) + ' mins)]');
    };

}

module.exports = DayDate;