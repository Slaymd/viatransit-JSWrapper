//Imports
const axios = require('axios');

//Models
const Line = require('../models/Line');

/**
 * viaTransit lines
 * @module viatransit
 */

/**
 * Get lines from API
 * @async
 * @exports viatransit.API.getLines
 * @param apiUrl
 * @param networkKey
 * @return {Promise<{dataUpdateDate: String, lines: Array<Line>}>}
 */
async function getLines(/*String*/apiUrl, /*String*/networkKey)
{
    const url = apiUrl + '/lines?networkKey=' + networkKey;

    return axios.get(url).then(res => {
        let lines = [];

        for (let lineApiObj of res.data.lines) {
            let line = new Line();

            line.fill(lineApiObj);
            lines.push(line);
        }
        return {dataUpdateDate: res.data.dataUpdateDate, lines};
    });
}

module.exports = { getLines };