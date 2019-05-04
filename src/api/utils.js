/**
 * Get api root link
 * @return {string}
 */
module.exports.getAPIRoot = function() {
    return ('https://viatransit.fr/api/v1');
};

/**
 * Reformatting and verifying announcements array
 * @param oldAnnouncements the announcements to verify
 * @returns Array reformatted announcements.
 */
module.exports.reformatDisruptionAnnouncements = function (/*Array<Object>*/oldAnnouncements) {

    let announcements = [];

    if (!(oldAnnouncements instanceof Array))
        return announcements;

    //Verifying all announcements...
    oldAnnouncements.forEach(announcement => {

        //Base verify
        if (!(announcement instanceof Object))
            return;

        let id = announcement._id;
        let links = reformatNetworkLinks(announcement.links);
        let authorId = announcement.author_id;
        let startDate = new Date(announcement.start_date);
        let endDate = new Date(announcement.end_date);
        let priority = announcement.priority;
        let lang = announcement.lang;
        let type = announcement.type;
        let title = announcement.title;
        let description = announcement.description;

        if (!(links.length > 0 && typeof authorId === 'string' &&
            typeof startDate === 'string' && typeof endDate === 'string' &&
            typeof priority === 'number' && typeof title === 'string' &&
            typeof description === 'string' && typeof lang === 'string' &&
            typeof type === 'string'))
            return;

        announcements.push({id, links, authorId, startDate, endDate, priority, type, lang, title, description});
    });

    return announcements;
};

/**
 * Reformatting and verifying network links
 * @param oldLinks the links to verify
 * @returns Array reformatted links.
 */
module.exports.reformatNetworkLinks = function (/*Array<{network: String, lines: Array<String>, stations: Array<String>}>*/oldLinks) {

    let links = [];

    if (!(oldLinks instanceof Array))
        return links;

    //Verifying all links...
    oldLinks.forEach(link => {

        //Base verify
        if (!(link instanceof Object))
            return;

        let network = link.network;
        let lines = link.lines;
        let stations = link.stations;
        let linesOk = true;
        let stationsOk = true;

        //Verify var types
        if (!(typeof network === 'string' && lines instanceof Array && stations instanceof Array))
            return;

        //Verify lines and stations content
        lines.forEach(line => {
            if (typeof line !== 'string')
                linesOk = false;
        });
        stations.forEach(station => {
            if (typeof station !== 'string')
                stationsOk = false;
        });

        if (!linesOk || !stationsOk)
            return;

        //Prevent void arrays
        if (lines.length === 0)
            lines.push('all');
        if (stations.length === 0)
            stations.push('all');

        //Add formated link
        links.push({network, lines, stations});
    });

    return links;
};

/**
 * Check if network is linked
 * @param links
 * @param networkKey
 * @return {boolean}
 */
module.exports.isNetworkLinked = function(/*Array<{network: String, lines: Array<String>, stations: Array<String>}>*/links, /*String*/networkKey)
{
    let isLinked = false;

    for (let link of links) {
        if (link.network === 'all' || link.network === networkKey) {
            isLinked = true;
            break;
        }
    }
    return isLinked;
};

/**
 * Check if line id is linked
 * @param links
 * @param lineId
 * @return {boolean}
 */
module.exports.isLineLinked = function(/*Array<{network: String, lines: Array<String>, stations: Array<String>}>*/links, /*String*/lineId)
{
    let isLinked = false;

    for (let link of links) {
        if (link.lines.includes('all') || link.lines.includes(lineId)) {
            isLinked = true;
            break;
        }
    }
    return isLinked;
};

/**
 * Check if station is linked
 * @param links
 * @param stationId
 * @return {boolean}
 */
module.exports.isStationLinked = function(/*Array<{network: String, lines: Array<String>, stations: Array<String>}>*/links, /*String*/stationId)
{
    let isLinked = false;

    for (let link of links) {
        if (link.stations.includes('all') || link.stations.includes(stationId)) {
            isLinked = true;
            break;
        }
    }
    return isLinked;
};