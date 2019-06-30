module.exports = {
    dbFormat: {
        "_id": "5ccc17878e60110c59ac2c8d",
        "services": [{"network": "heraulttransport", "id": "HT120"}, {"network": "tam", "id": "50"}, {
            "network": "sncf",
            "id": "sncf"
        }],
        "stops": [{
            "services": ["50"],
            "id": "1461",
            "location": {"type": "Point", "coordinates": [3.92230177, 43.59628404]}
        }, {"services": ["50"], "id": "1460", "location": {"type": "Point", "coordinates": [3.92230177, 43.59628404]}}],
        "linked_stations": [{
            "network": "sncf",
            "id": "OCE:SA:87688887",
            "type": "trains"
        }, {"network": "heraulttransport", "id": "SZ1", "type": "public_transit"}],
        "id": "S5844",
        "network": "tam",
        "name": "Gare Montpellier Sud de France",
        "type": "public_transit",
        "location": {"type": "Point", "coordinates": [3.92230177, 43.59628404]},
        "attributes": null,
        "__v": 0
    },
    apiFormat: {
        "network": "tam",
        "id": "S5844",
        "name": "Gare Montpellier Sud de France",
        "type": "public_transit",
        "services": [{"network": "heraulttransport", "id": "HT120"}, {"network": "tam", "id": "50"}, {
            "network": "sncf",
            "id": "sncf"
        }],
        "location": {"type": "Point", "coordinates": [3.92230177, 43.59628404]},
        "stops": [{
            "id": "1461",
            "services": ["50"],
            "location": {"type": "Point", "coordinates": [3.92230177, 43.59628404]}
        }, {"id": "1460", "services": ["50"], "location": {"type": "Point", "coordinates": [3.92230177, 43.59628404]}}],
        "linkedStations": [{"id": "OCE:SA:87688887", "network": "sncf", "type": "trains"}, {
            "id": "SZ1",
            "network": "heraulttransport",
            "type": "public_transit"
        }],
        "attributes": {
            "lastEdit": "3243596244014"
        }
    }
};