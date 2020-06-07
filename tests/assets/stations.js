module.exports = {
    station1: {
        "networkKey": "tam",
        "id": "S5844",
        "name": "Gare Montpellier Sud de France",
        "type": "public_transit",
        "lines": [{"networkKey": "heraulttransport", "id": "HT120"}, {"networkKey": "tam", "id": "50"}, {
            "networkKey": "sncf",
            "id": "sncf"
        }],
        "location": {"type": "Point", "coordinates": [3.92230177, 43.59628404]},
        "stops": [{
            "id": "1461",
            "lines": ["50"],
            "location": {"type": "Point", "coordinates": [3.92230177, 43.59628404]},
            "attributes": null,
        }, {"id": "1460", "lines": ["50"], "location": {"type": "Point", "coordinates": [3.92230177, 43.59628404]}, "attributes": null}],
        "links": [
            {
                "network": "sncf",
                "lines": ["all"],
                "stations": [
                    {"stationId": "OCE:SA:87688887", "stopId": "all"}
                ],
                "trips": [],
                "attributes": null
            }
        ],
        "attributes": {
            "exits": ["EX13324", "EX21342"]
        }
    }
};