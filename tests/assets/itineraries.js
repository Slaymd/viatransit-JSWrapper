module.exports = {
    itinerary1: {
        departureDate: "2020-04-06T17:30:00.000Z",
        arrivalDate: "2020-04-06T17:41:00.000Z",
        sections: [
            {
                departureDate: "2020-04-06T17:30:00.000Z",
                arrivalDate: "2020-04-06T17:33:30.000Z",
                type: "walking",
                steps: [
                    {
                        type: 'coords',
                        name: '3 Place Paul Bec',
                        coordinates: [3.8863277435302734,43.60788986805745],
                        departureDate: "2020-04-06T17:30:00.000Z",
                        arrivalDate: "2020-04-06T17:30:00.000Z",
                        attributes: null
                    },
                    {
                        type: 'station',
                        name: 'Antigone',
                        coordinates: [3.8866925239562984,43.608645350157644],
                        departureDate: "2020-04-06T17:33:30.000Z",
                        arrivalDate: "2020-04-06T17:33:30.000Z",
                        attributes: {
                            stationId: "S5378",
                            stopId: "1149"
                        }
                    }
                ],
                shape: [
                    [
                        3.8863331079483032,
                        43.607893752308456
                    ],
                    [
                        3.8862177729606624,
                        43.607903462934864
                    ],
                    [
                        3.8862258195877075,
                        43.60798114788973
                    ],
                    [
                        3.88653427362442,
                        43.60829188670587
                    ],
                    [
                        3.8866576552391052,
                        43.60828023402924
                    ],
                    [
                        3.8867086172103877,
                        43.60865117646088
                    ]
                ],
                attributes: null
            },
            {
                departureDate: "2020-04-06T17:33:30.000Z",
                arrivalDate: "2020-04-06T17:36:00.000Z",
                type: "public_transit",
                steps: [
                    {
                        type: "station",
                        name: "Antigone",
                        coordinates: [3.8866925239562984,43.608645350157644],
                        departureDate: "2020-04-06T17:34:00.000Z",
                        arrivalDate: "2020-04-06T17:33:30.000Z",
                        attributes: {
                            stationId: "S5378",
                            stopId: "1149"
                        }
                    },
                    {
                        type: "station",
                        name: "Léon Blum",
                        coordinates: [3.890179395675659,43.60893860671964],
                        departureDate: "2020-04-06T17:34:45.000Z",
                        arrivalDate: "2020-04-06T17:34:30.000Z",
                        attributes: {
                            stationId: "S5379",
                            stopId: "1151"
                        }
                    },
                    {
                        type: "station",
                        name: "Place de l'Europe",
                        coordinates: [3.8939237594604488,43.6073790868652],
                        departureDate: "2020-04-06T17:36:30.000Z",
                        arrivalDate: "2020-04-06T17:36:00.000Z",
                        attributes: {
                            stationId: "S5380",
                            stopId: "1153"
                        }
                    }
                ],
                shape: [
                    [
                        3.8866817951202393,
                        43.608690018468
                    ],
                    [
                        3.8867032527923584,
                        43.6090085219803
                    ],
                    [
                        3.8869822025299077,
                        43.60915612059702
                    ],
                    [
                        3.8938164710998535,
                        43.60868225006858
                    ],
                    [
                        3.8940632343292236,
                        43.60847250290503
                    ],
                    [
                        3.893945217132568,
                        43.60779664595811
                    ],
                    [
                        3.893966674804687,
                        43.607602432787104
                    ],
                    [
                        3.893934488296509,
                        43.607346070441196
                    ]
                ],
                attributes: {
                    networkKey: "tam",
                    tripId: "T1-2583",
                    lineId: "1"
                }
            },
            {
                departureDate: "2020-04-06T17:36:00.000Z",
                arrivalDate: "2020-04-06T17:41:00.000Z",
                type: "walking",
                steps: [
                    {
                        type: "station",
                        name: "Place de l'Europe",
                        coordinates: [3.8939237594604488,43.6073790868652],
                        departureDate: "2020-04-06T17:36:00.000Z",
                        arrivalDate: "2020-04-06T17:36:00.000Z",
                        attributes: {
                            stationId: "S5380",
                            stopId: "1153"
                        }
                    },
                    {
                        type: "coords",
                        name: "6 Esplanade de l'Europe",
                        coordinates: [3.894926905632019,43.60687218565255],
                        departureDate: "2020-04-06T17:41:00.000Z",
                        arrivalDate: "2020-04-06T17:41:00.000Z",
                        attributes: null
                    }
                ],
                shape: [
                    [
                        3.8939049839973445,
                        43.6073596654415
                    ],
                    [
                        3.893931806087494,
                        43.60776557189289
                    ],
                    [
                        3.8945138454437256,
                        43.60772478715791
                    ],
                    [
                        3.8945272564888,
                        43.60739073971643
                    ],
                    [
                        3.8947096467018123,
                        43.60710524421186
                    ],
                    [
                        3.8949751853942867,
                        43.60689743370675
                    ],
                    [
                        3.8948866724967957,
                        43.60683722679077
                    ]
                ],
                attributes: null
            },
        ],
        attributes: {
            tags: [ "fastest", "least_connections" ]
        }
    },
};