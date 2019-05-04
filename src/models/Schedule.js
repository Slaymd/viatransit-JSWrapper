//Models
const DayDate = require('./DayDate');

/**
 * @class Schedule
 * @classdesc All properties of one schedule
 */
class Schedule {

    constructor()
    {
        this.id = "";
        this.lineId = "";
        this.stopId = "";
        this.destinationId = "";
        this.directionId = 0;
        this.headsign = "";
        this.waitingTime = 0;
        this.departureTime = new DayDate();
        this.theorical = true;
        this.isLast = false;
        this.delayTime = 0;
        this.network = "";
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
        if (this.waitingTime < 86300 && this.waitingTime > 7200)
            return false;
        else if (this.waitingTime >= 86300)
            this.waitingTime = 0;
        this.theorical = theorical === 1;
        return true;
    }

    /**
     * Get attribute value from key
     * @param key
     * @returns {String}
     */
    getAttribute(/*String*/key) {
        if (this.attributes === null || this.attributes === undefined)
            return null;

        let attr = this.attributes[key];

        return attr === undefined ? null : attr;
    }

}

module.exports = Schedule;