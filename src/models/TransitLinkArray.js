const TransitLink = require('./TransitLink');

/**
 * @class TransitLinkArray
 */
class TransitLinkArray extends Array {

    constructor(/*(Array<{network: string, lines: [string], stations: [{stationId: string, stopId: string}], trips: [string], attributes: Object|null}}>|null)*/objects = null) {
        super();
        //Optional constructor fill
        if (objects instanceof Array)
            this.fillArray(objects);
    }

    /**
     * Fill properties from viaTransit API return format
     * @param objects
     */
    fillArray(/*Array<{network: string, lines: [string], stations: [{stationId: string, stopId: string}], trips: [string], attributes: Object|null}}>*/objects)
    {
        for (let apiObject of objects) {
            let link = new TransitLink();
            link.fill(apiObject);
            this.push(link);
        }
    }

    /**
     * Check if network is linked
     * @param networkKey The network key
     * @return {boolean} is linked or not
     */
    isLinkedToNetwork(/*String*/networkKey)
    {
        return this.filter(el => (el instanceof TransitLink && el.isLinkedToNetwork(networkKey))).length > 0;
    }

    /**
     * Check if line is linked
     * @param networkKey
     * @param lineId The line id
     * @return {boolean} is linked or not
     */
    isLinkedToLine(/*String*/networkKey, /*String*/lineId)
    {
        return this.filter(el => (el instanceof TransitLink && el.isLinkedToLine(networkKey, lineId))).length > 0;
    }

    /**
     * Check if station is linked
     * @param networkKey
     * @param lineId The line id (can also be 'all' to be line independent)
     * @param stationId The station id
     * @return {boolean} is linked or not
     */
    isLinkedToStation(/*String*/networkKey, /*String*/lineId, /*String*/stationId)
    {
        return this.filter(el => (el instanceof TransitLink && el.isLinkedToStation(networkKey, lineId, stationId))).length > 0;

    }

    /**
     * Check if stop is linked
     * @param networkKey
     * @param lineId The line id (can also be 'all' to be line independent)
     * @param stationId The station id
     * @param stopId The stop id
     * @return {boolean} is linked or not
     */
    isLinkedToStop(/*String*/networkKey, /*String*/lineId, /*String*/stationId, /*String*/stopId)
    {
        return this.filter(el => (el instanceof TransitLink && el.isLinkedToStop(networkKey, lineId, stationId, stopId))).length > 0;
    }

    /**
     * Check if trip is linked
     * @param networkKey
     * @param stationId
     * @param stopId
     * @param tripId
     * @return {boolean}
     */
    isLinkedToTrip(/*String*/networkKey, /*String*/stationId, /*String*/stopId, /*String*/tripId)
    {
        return this.filter(el => (el instanceof TransitLink && el.isLinkedToTrip(networkKey, stationId, stopId, tripId))).length > 0;
    }
}

module.exports = TransitLinkArray;