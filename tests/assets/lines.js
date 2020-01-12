module.exports = {
    line1: {
        "id": "1",
        "networkKey": "tam",
        "name": "T1 Mosson <> Odysseum",
        "shortName": "1",
        "type": 0,
        "displayOrder": 1,
        "style": {
            "backgroundColor": "0055A0",
            "foregroundColor": "FFFFFF",
            "attributes": {
                "lametric_icon_id": "i24032",
                "displayed_on_map": true,
                "style_CSS": {
                    "borderRadius": "8px 0 8px 8px"
                }, "style_RN": {
                    "container": {
                        "borderTopLeftRadius": 8,
                        "borderBottomLeftRadius": 8,
                        "borderBottomRightRadius": 8
                    }
                }
            }
        },
        "stopSequences": [
            {
                "sequence": [
                    {
                        "stopId": "1133",
                        "stationId": "S1133"
                    },
                    {
                        "stopId": "1135",
                        "stationId": "S1135"
                    },
                    {
                        "stopId": "1137",
                        "stationId": "S1137"
                    }
                ],
                "direction": 0,
                "main": true,
                "attributes": null
            },
            {
                "sequence": [
                    {
                        "stopId": "1133",
                        "stationId": "S1133"
                    },
                    {
                        "stopId": "1135",
                        "stationId": "S1135"
                    }
                ],
                "direction": 0,
                "main": false,
                "attributes": {
                    "directionHeadsign": "Port Marianne"
                }
            },
            {
                "sequence": [
                    {
                        "stopId": "2117",
                        "stationId": "S2117"
                    },
                    {
                        "stopId": "2115",
                        "stationId": "S2115"
                    },
                    {
                        "stopId": "2113",
                        "stationId": "S2113"
                    }
                ],
                "direction": 1,
                "main": true,
                "attributes": null
            }
        ],
        "attributes": null
    },
    line2: {
        "id": "1",
        "networkKey": "tam",
        "name": "T1 Mosson <> Odysseum",
        "shortName": "1",
        "type": 0,
        "displayOrder": 1,
        "style": {
            "backgroundColor": "0055A0",
            "foregroundColor": "FFFFFF",
            "attributes": null
        },
        "stopSequences": [
            {
                "sequence": [
                    {
                        "stopId": "1133",
                        "stationId": "S1133"
                    },
                    {
                        "stopId": "1135",
                        "stationId": "S1135"
                    },
                    {
                        "stopId": "1137",
                        "stationId": "S1137"
                    }
                ],
                "direction": 0,
                "main": true,
                "attributes": null
            },
            {
                "sequence": [
                    {
                        "stopId": "1133",
                        "stationId": "S1133"
                    },
                    {
                        "stopId": "1135",
                        "stationId": "S1135"
                    }
                ],
                "direction": 0,
                "main": false,
                "attributes": null
            },
            {
                "sequence": [
                    {
                        "stopId": "2117",
                        "stationId": "S2117"
                    },
                    {
                        "stopId": "2115",
                        "stationId": "S2115"
                    },
                    {
                        "stopId": "2113",
                        "stationId": "S2113"
                    }
                ],
                "direction": 1,
                "main": true,
                "attributes": null
            }
        ],
        "attributes": {
            "showTypeBefore": true
        }
    },
};