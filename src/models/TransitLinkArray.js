const TransitLink = require('./TransitLink');

/**
 * @class TransitLinkArray
 */
class TransitLinkArray extends Array {

    constructor(/*(Array<{network: String, service: String, type: ("public_transit"|"bike_share"|"trains"|"car_park"|"unknown"), attributes: ?{lines: ([String]|null), stations: ([{stationId: String, stopId: String}]|null)}}>|null)*/objects = null) {
        super();
        //Optional constructor fill
        if (objects instanceof Array)
            this.fillArray(objects);
    }

    /**
     * Fill properties from viaTransit API return format
     * @param objects
     */
    fillArray(/*Array<{network: String, service: String, type: ("public_transit"|"bike_share"|"trains"|"car_park"|"unknown"), attributes: ?{lines: ([String]|null), stations: ([{stationId: String, stopId: String}]|null)}}>*/objects)
    {
        for (let apiObject of objects) {
            let link = new TransitLink();
            link.fill(apiObject);
            this.push(link);
        }
    }

    /**
     * Check if network is linked
     * @param networkId The network id
     * @return {boolean} is linked or not
     */
    isLinkedToNetwork(/*String*/networkId)
    {
        return this.filter(el => (el instanceof TransitLink && el.isLinkedToNetwork(networkId))).length > 0;
    }

    /**
     * Check if service is linked
     * @param networkId The network id
     * @param serviceId The network' service id (can also be a service type)
     * @return {boolean}
     */
    isLinkedToService(/*String*/networkId, /*String*/serviceId)
    {
        return this.filter(el => (el instanceof TransitLink && el.isLinkedToService(networkId, serviceId))).length > 0;
    }

    /**
     * Check if line is linked
     * @param networkId The network id
     * @param serviceId The network' service id
     * @param lineId The line id
     * @return {boolean} is linked or not
     */
    isLinkedToLine(/*String*/networkId, /*String*/serviceId, /*String*/lineId)
    {
        return this.filter(el => (el instanceof TransitLink && el.isLinkedToLine(networkId, serviceId, lineId))).length > 0;
    }

    /**
     * Check if station is linked
     * @param networkId The network id
     * @param serviceId The network' service id
     * @param lineId The line id (can also be 'all' to be line independent)
     * @param stationId The station id
     * @return {boolean} is linked or not
     */
    isLinkedToStation(/*String*/networkId, /*String*/serviceId, /*String*/lineId, /*String*/stationId)
    {
        return this.filter(el => (el instanceof TransitLink && el.isLinkedToStation(networkId, serviceId, lineId, stationId))).length > 0;
    }

    /**
     * Check if stop is linked
     * @param networkId The network id
     * @param serviceId The network' service id
     * @param lineId The line id (can also be 'all' to be line independent)
     * @param stationId The station id
     * @param stopId The stop id
     * @return {boolean} is linked or not
     */
    isLinkedToStop(/*String*/networkId, /*String*/serviceId, /*String*/lineId, /*String*/stationId, /*String*/stopId)
    {
        return this.filter(el => (el instanceof TransitLink && el.isLinkedToStop(networkId, serviceId, lineId, stationId, stopId))).length > 0;
    }
}

module.exports = TransitLinkArray;