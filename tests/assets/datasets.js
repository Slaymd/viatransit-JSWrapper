module.exports = {
    datasetsAPI: {
        "id": "2684335908",
        "feature": {
            "type": "Feature",
            "properties": {
                "@id": "way/435187420",
                "amenity": "parking",
                "capacity": "2",
                "fee": "no",
                "motorcar": "designated",
                "parking": "surface",
                "surface": "asphalt"
            },
            "geometry": {
                "coordinates": [5.689544677734375, 43.70660077729878],
                "type": "Point"
            },
        },
        "uploadedBy": "userId",
        "verified": true,
        "attributes": {}
    },
    datasetsDB: {
        "_id": "2684335908",
        "feature": {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "coordinates": [],
                "type": "THIS_IS_A_TYPE"
            },
        },
        "uploadedBy": "userId",
        "verified": false,
        "attributes": {}
    },
    badFeature: {
        "id": "id",
        "feature": 'hello',
        "uploadedBy": "userId",
        "verified": true,
        "attributes": {}
    },
    badFeatureType: {
        "id": "id",
        "feature": {
            "type": "BAD_TYPE",
            "properties": {},
            "geometry": {
                "coordinates": [5.689544677734375, 43.70660077729878],
                "type": "Point"
            },
        },
        "uploadedBy": "userId",
        "verified": true,
        "attributes": {}
    },
    badFeatureProperties: {
        "id": "id",
        "feature": {
            "type": "Feature",
            "properties": "THIS_IS_PROPERTIES",
            "geometry": {
                "coordinates": [5.689544677734375, 43.70660077729878],
                "type": "Point"
            },
        },
        "uploadedBy": "userId",
        "verified": true,
        "attributes": {}
    }
};