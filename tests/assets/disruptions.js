module.exports = {
    disruption1: {
        "id": "5cd09bdc87387472c1fa6198",
        "links": [
            {
                "network": "tam",
                "lines": ["7"],
                "stations": [
                    {"stationId": "S5570", "stopId": "51"},
                    {"stationId": "S5571", "stopId": "53"},
                    {"stationId": "S5572", "stopId": "55"}
                ],
                "trips": ['TRIP1'],
                "attributes": null
            },
            {
                "network": "tam",
                "lines": ["6"],
                "stations": [
                    {"stationId": "all", "stopId": "all"}
                ],
                "trips": ['TRIP1'],
                "attributes": null
            },
        ],
        "type": "works",
        "status": "valid",
        "startDate": "2019-05-05T20:37:00.000Z",
        "endDate": "2019-05-05T21:59:00.000Z",
        "attributes": {
            "tripsVisibility": true,
            "tripsDelayed": false,
            "tripsCancelled": true
        },
        "announcements": [
            {
                "id": "5cd09bdc87387472c1fa6199",
                "links": [
                    {
                        "network": "tam",
                        "lines": ["6", "8", "7"],
                        "stations": [
                            {"stationId": "all", "stopId": "all"}
                        ],
                        "trips": [],
                        "attributes": null
                    },
                ],
                "authorId": "5c61cc3363939c74bdcfde35",
                "startDate": "2019-05-06T20:39:38.285Z",
                "endDate": "2019-05-06T20:39:38.285Z",
                "priority": 1,
                "type": "warning",
                "lang": "fr",
                "title": "Titre d'une annonce",
                "description": "Description d'une **annonce**",
                "attributes": {
                    "textColor": "#000000"
                }
            }
        ]
    },
    disruption2: {
        "id": "5cd09bdc87387472c1fa6198",
        "links": [],
        "type": "works",
        "status": "valid",
        "startDate": "2019-05-05T20:37:00.000Z",
        "endDate": "2019-05-05T21:59:00.000Z",
        "attributes": null,
        "announcements": [
            {
                "id": "5cd09bdc87387472c1fa6199",
                "links": [
                    {
                        "network": "tam",
                        "lines": ["6", "7"],
                        "stations": [
                            {"stationId": "all", "stopId": "all"}
                        ],
                        "trips": [],
                        "attributes": null
                    },
                ],
                "authorId": "5c61cc3363939c74bdcfde35",
                "startDate": "2019-05-06T20:39:38.285Z",
                "endDate": "2019-05-06T20:39:38.285Z",
                "priority": 1,
                "type": "warning",
                "lang": "fr",
                "title": "Titre d'une annonce",
                "description": "Description d'une **annonce**",
                "attributes": null
            }
        ]
    },
    disruption3: {
        "id": "5cd09bdc87387472c1fa6198",
        "links": [
            {
                "network": "tam",
                "lines": ["7"],
                "stations": [
                    {"stationId": "S5570", "stopId": "51"},
                    {"stationId": "S5571", "stopId": "53"},
                    {"stationId": "S5572", "stopId": "55"}
                ],
                "trips": [],
                "attributes": null
            },
        ],
        "type": "works",
        "status": "valid",
        "startDate": "2019-05-05T20:37:00.000Z",
        "endDate": "2019-05-05T21:59:00.000Z",
        "attributes": {
            "tripsVisibility": true,
            "tripsDelayed": false,
            "tripsCancelled": true
        },
        "announcements": [
            {
                "id": "5cd09bdc87387472c1fa6199",
                "links": [
                    {
                        "network": "transpor",
                        "lines": ["L2", "L3", "A"],
                        "stations": [
                            {"stationId": "all", "stopId": "all"}
                        ],
                        "trips": [],
                        "attributes": null
                    },
                ],
                "authorId": "5c61cc3363939c74bdcfde35",
                "startDate": "2019-05-06T20:39:38.285Z",
                "endDate": "2019-05-06T20:39:38.285Z",
                "priority": 1,
                "type": "warning",
                "lang": "fr",
                "title": "Titre d'une annonce",
                "description": "Description d'une **annonce**",
                "attributes": {
                    "textColor": "#000000"
                }
            }
        ]
    },
};